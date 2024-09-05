import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, ValidationPipe, UsePipes } from '@nestjs/common'
import { NotesService } from './notes.service'
import { NotesDto } from './notes.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('user/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return this.notesService.getAll(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: NotesDto, @CurrentUser('id') userId: string) {
    return this.notesService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(
    @Body() dto: NotesDto,
    @CurrentUser('id') userId: string,
    @Param('id') id: string
  ) {
    return this.notesService.update(dto, id, userId)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.notesService.delete(id)
  }

  @HttpCode(200)
  @Get(':id')
  @Auth()
  async getNoteById(@Param('id') id: string) {
    return this.notesService.getById(id)
  }
}
