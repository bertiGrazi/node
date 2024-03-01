import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AutenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const autenticateUseCase = new AutenticateUseCase(prismaUserRepository)

  return autenticateUseCase

}