import { Prisma, Gym } from "@prisma/client";
import { GymsRepositorys } from "../gyms-repository";

export class InMemoryGymRepository implements GymsRepositorys {
  public itens: Gym[] = []

  async findById(id: string) {
    const gym = this.itens.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}