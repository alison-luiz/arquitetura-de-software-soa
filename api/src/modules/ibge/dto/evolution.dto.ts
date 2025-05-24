import { IsNotEmpty, IsString } from 'class-validator'

export class EvolutionDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	firstYear: string

	@IsString()
	@IsNotEmpty()
	lastYear: string
}

export class PeriodDto {
	year: number
	frequency: number
}

export class EvolutionResponseDto {
	name: string
	periods: PeriodDto[]
}
