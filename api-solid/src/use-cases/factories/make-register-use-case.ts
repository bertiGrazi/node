import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserCase } from "../register"

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserCase(prismaUserRepository)

  return registerUseCase
}