import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check-ins-repository";

interface CheckInRequest {
  userId: string, 
  gymId: string
}

interface CheckInResponse {
  checkIn: CheckIn
}

export class GetUserProfileUseCase {
  constructor(
   private checkInsRepository: CheckInRepository
  ) {}

  async execute({ 
    userId,
    gymId
  }: CheckInRequest): Promise<CheckInResponse> {
    const checkIn = await this.checkInsRepository.create({
       gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }
  }
}