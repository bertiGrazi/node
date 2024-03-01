import { UserRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./erros/resouce-not-found-error";

interface GetUserProfileCaseRequest {
  userId: string
}

interface GetUserProfileCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UserRepository,
  ) {}

  async execute({ 
    userId
  }: GetUserProfileCaseRequest): Promise<GetUserProfileCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if(!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}