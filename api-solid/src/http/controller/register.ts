import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from "zod"
import { RegisterUserCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlrearyExistsError } from '@/use-cases/erros/user-alreary-exits-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUserRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUserCase(prismaUserRepository)

    await registerUseCase.execute({
      name, 
      email, 
      password
    })
  } catch (err) {
    if( err instanceof UserAlrearyExistsError) {
      return reply.status(409).send({message: err.message})
    }
    
    return reply.status(500).send()
  }

  return reply.status(201).send()
}