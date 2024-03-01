import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AutenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialErrors } from '@/use-cases/erros/invalid-credentials-error'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const autenticateUseCase = new AutenticateUseCase(prismaUserRepository)

    await autenticateUseCase.execute({
      email, 
      password
    })
  } catch (err) {
    if( err instanceof InvalidCredentialErrors) {
      return reply.status(400).send({message: err.message})
    }
    
    throw err 
  }

  return reply.status(200).send()
}