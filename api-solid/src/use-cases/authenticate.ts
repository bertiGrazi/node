import { UserRepository } from "@/repositories/users-repository";
import { InvalidCredentialErrors } from "./erros/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AutenticateUseCaseRequest {
  email: string
  password: string
}

interface AutenticateUseCaseResponse {
  user: User
}

export class AutenticateUseCase {
  constructor(
    private usersRepository: UserRepository,
  ) {}

  async execute({ 
    email, password 
  }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new InvalidCredentialErrors()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if(!doesPasswordMatches) {
      throw new InvalidCredentialErrors()
    }

    return {
      user,
    }
  }
}