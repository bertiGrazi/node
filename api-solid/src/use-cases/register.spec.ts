import { expect, test, describe, it } from 'vitest'
import { RegisterUserCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

// test('check if it works', () => {
//   expect(2 * 2).toBe(4)
// })

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUserCase({
      async findByEmail(email) {
        return null 
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date()
        }
      }
    })

    const { user } = await registerUseCase.execute({
      name: 'Grazielli Berti',
      email: 'outroemaildaGrazi@gmail.com',
      password: 'beyonce'
    })

    //console.log(user.password_hash)
    const isPasswordCorrectlyHashed = await compare(
      'beyonce', 
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})