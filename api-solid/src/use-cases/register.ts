import { UserRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

import { UserAlrearyExistsError } from "./erros/user-alreary-exits-error"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
  name: string, 
  email: string,
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUserCase {
  constructor(
    private usersRepository: UserRepository
  ) {}

  async execute({
    name, 
    email, 
    password
  }: RegisterUseCaseRequest):Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if (userWithSameEmail) {
      throw new UserAlrearyExistsError()
    }
  
    const user = await this.usersRepository.create({
      name, 
      email, 
      password_hash
    })

    return {
      user
    }
  }
}
