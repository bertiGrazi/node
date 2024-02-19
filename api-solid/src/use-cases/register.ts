import { prisma } from "@/lib/prisma"
import { UserRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

import { UserAlrearyExistsError } from "./erros/user-alreary-exits-error"

interface RegisterUseCaseRequest {
  name: string, 
  email: string,
  password: string
}

export class RegisterUserCase {
  constructor(
    private usersRepository: UserRepository
  ) {}

  async execute({
    name, 
    email, 
    password
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if (userWithSameEmail) {
      throw new UserAlrearyExistsError()
    }
  
    await this.usersRepository.create({
      name, 
      email, 
      password_hash
    })
  }
}
