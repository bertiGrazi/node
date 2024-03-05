import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { date } from "zod";
import { GymsRepositorys } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./erros/resouce-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckInRequest {
  userId: string, 
  gymId: string,
  userLatitude: number, 
  userLongitude: number
}

interface CheckInResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
   private checkInsRepository: CheckInRepository,
   private gymsRepository: GymsRepositorys
  ) {}

  async execute({ 
    userId,
    gymId,
    userLatitude,
    userLongitude
  }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { 
        latitude: gym.latitude.toNumber(), 
        longitude: gym.longitude.toNumber() 
      }
    )
    
    const MAX_DISTANCE_IN_KILOMETEERS = 0.1
    
    if (distance > MAX_DISTANCE_IN_KILOMETEERS) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId, 
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error()
    }
    const checkIn = await this.checkInsRepository.create({
       gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }
  }
}