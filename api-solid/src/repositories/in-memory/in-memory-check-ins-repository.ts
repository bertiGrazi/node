import { CheckIn, Prisma } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInRepository {
  public itens: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDate = this.itens.find((checkIn) => checkIn.user_id === userId)

    if(!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }

    this.itens.push(checkIn)

    return checkIn
  }
}