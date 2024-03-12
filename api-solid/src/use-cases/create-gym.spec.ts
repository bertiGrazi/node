import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('it should be able to create gym', async () => {
    const { gym } = await sut.execute({
     title: 'Carter Gym',
     description: null, 
     phone: null, 
     latitude: -23.462341, 
     longitude: -46.5683779
    })

    expect(gym.id ).toEqual(expect.any(String))
  })
})