import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto, UserDto } from './user.dto'
import { hash } from 'argon2'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getProfile(id: string) {
    const profile = await this.getById(id)

    const { password, ...rest } = profile

    return {
      user: rest
    }
  }

  async create(dto: UserDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password)
    }
    return this.prisma.user.create({
      data: user
    })
  }

  async update(id: string, dto: UpdateUserDto) {
    let data = dto

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) }
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data,
      select: {
        name: true,
        email: true
      }
    })
  }
}
