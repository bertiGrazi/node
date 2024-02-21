import { expect, test, describe, it } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlrearyExistsError } from './erros/user-alreary-exits-error'

// test('check if it works', () => {
//   expect(2 * 2).toBe(4)
// })

describe('Register Use Case', () => {
  it('it should be able register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Grazielli Berti',
      email: 'outroemaildaGrazi@gmail.com',
      password: 'beyonce'
    })

    expect(user.id ).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

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

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const email = 'outroemaildaGrazi@gmail.com'

    const { user } = await registerUseCase.execute({
      name: 'Grazielli Berti',
      email,
      password: 'beyonce'
    })

    await expect(() => 
      registerUseCase.execute({
        name: 'Grazielli Berti',
        email,
        password: 'beyonce'
      }),
    ).rejects.toBeInstanceOf(UserAlrearyExistsError)
  })
})