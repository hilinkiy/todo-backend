import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { NotesDto } from './notes.dto'

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) { }

  async getAll(userId: string) {
    return this.prisma.notes.findMany({
      where: {
        userId
      }
    })
  }

  async getById(id: string) {
    return this.prisma.notes.findUnique({
      where: {
        id
      }
    })
  }

  async create(dto: NotesDto, userId: string) {
    return this.prisma.notes.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async update(dto: Partial<NotesDto>, taskId: string, userId: string) {
    return this.prisma.notes.update({
      where: {
        userId,
        id: taskId
      },
      data: dto
    })
  }

  async delete(taskId: string) {
    return this.prisma.notes.delete({
      where: {
        id: taskId
      }
    })
  }
}
