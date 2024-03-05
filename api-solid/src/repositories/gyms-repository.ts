import { Gym, Prisma } from "@prisma/client";

export interface GymsRepositorys {
  findById(id: string): Promise<Gym | null>
}