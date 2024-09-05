import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService],
})
export class NotesModule {}
