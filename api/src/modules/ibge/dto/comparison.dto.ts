import { IsNotEmpty, IsString } from 'class-validator'

export class ComparisonDto {
	@IsString()
	@IsNotEmpty()
	name1: string

	@IsString()
	@IsNotEmpty()
	name2: string
}

export class PeriodDto {
	year: number
	frequency: number
}

export class ComparisonItemDto {
	name: string
	periods: PeriodDto[]
}

export class ComparisonResponseDto {
	items: ComparisonItemDto[]
}
