import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUserCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlrearyExistsError } from './erros/user-alreary-exits-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(usersRepository)
  })

  it('it should be able register', async () => {
    const { user } = await sut.execute({
      name: 'Grazielli Berti',
      email: 'outroemaildaGrazi@gmail.com',
      password: 'beyonce'
    })

    expect(user.id ).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'outroemaildaGrazi@gmail.com'

    const { user } = await sut.execute({
      name: 'Grazielli Berti',
      email,
      password: 'beyonce'
    })

    await expect(() => 
    sut.execute({
        name: 'Grazielli Berti',
        email,
        password: 'beyonce'
      }),
    ).rejects.toBeInstanceOf(UserAlrearyExistsError)
  })
})