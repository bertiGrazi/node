import { prisma } from "@/lib/prisma"
import { UserRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

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
  
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })
  
    if (userWithSameEmail) {
      throw new Error('E-mail alreary exists.')
    }
  
    await this.usersRepository.create({
      name, 
      email, 
      password_hash
    })
  }
}
