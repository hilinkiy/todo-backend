import { IsOptional, IsString } from 'class-validator'

export class NotesDto {
	@IsString()
	@IsOptional()
	title: string

	@IsString()
	@IsOptional()
	content: string

	@IsString()
	@IsOptional()
	createdAt?: string
}
