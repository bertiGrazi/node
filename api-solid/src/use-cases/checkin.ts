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

    // TODO: calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLatitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )
    
    const MAX_DISTANCE = 0.1
    
    if (distance > 0.1) {
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