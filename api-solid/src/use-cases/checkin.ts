import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";
import { date } from "zod";

interface CheckInRequest {
  userId: string, 
  gymId: string
}

interface CheckInResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
   private checkInsRepository: CheckInRepository
  ) {}

  async execute({ 
    userId,
    gymId
  }: CheckInRequest): Promise<CheckInResponse> {
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