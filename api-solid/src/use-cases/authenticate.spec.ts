import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AutenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialErrors } from './erros/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AutenticateUseCase

describe('Authenticate Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AutenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user.id ).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email.', async () => {

    expect(() => 
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErrors)
  })

  it('should not be able to authenticate with wrong password.', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(() => 
      sut.execute({
        email: 'johndoe@example.com',
        password: '123453'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialErrors)
  })
})