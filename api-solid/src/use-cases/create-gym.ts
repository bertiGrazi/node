import { hash } from "bcryptjs"

import { UserAlrearyExistsError } from "./erros/user-alreary-exits-error"
import { Gym } from "@prisma/client"
import { GymsRepositorys } from "@/repositories/gyms-repository"

interface CreateGymUseCaseRequest {
  title: string, 
  description: string | null,
  phone: string | null,
  latitude: number,
  longitude: number

}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class RegisterUserCase {
  constructor(
    private gymsRepository: GymsRepositorys
  ) {}

  async execute({
    title, 
    description, 
    phone, 
    latitude, 
    longitude
  }: CreateGymUseCaseRequest):Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title, 
      description, 
      phone, 
      latitude, 
      longitude
    })

    return {
      gym
    }
  }
}
