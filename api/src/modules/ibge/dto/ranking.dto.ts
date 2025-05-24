import { IsNotEmpty, IsString } from 'class-validator'

export class RankingDto {
	@IsString()
	@IsNotEmpty()
	decade: string

	@IsString()
	@IsNotEmpty()
	state: string
}

export class RankingItemDto {
	name: string
	frequency: number
	ranking: number
}

export class RankingResponseDto {
	locality: string
	items: RankingItemDto[]
}
