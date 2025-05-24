import { Controller, Get, Query } from '@nestjs/common'
import { EvolutionService } from './services/evolution.service'
import { RankingService } from './services/ranking.service'
import { ComparisonService } from './services/comparison.service'
import { EvolutionDto } from './dto/evolution.dto'
import { EvolutionResponseDto } from './dto/evolution.dto'
import { RankingDto, RankingResponseDto } from './dto/ranking.dto'
import { ComparisonDto, ComparisonResponseDto } from './dto/comparison.dto'

@Controller('ibge')
export class IbgeController {
	constructor(
		private readonly evolutionService: EvolutionService,
		private readonly rankingService: RankingService,
		private readonly comparisonService: ComparisonService
	) {}

	@Get('evolution')
	async getEvolutionByName(
		@Query() evolutionDto: EvolutionDto
	): Promise<EvolutionResponseDto[]> {
		return this.evolutionService.execute(evolutionDto)
	}

	@Get('ranking')
	async getRanking(
		@Query() rankingDto: RankingDto
	): Promise<RankingResponseDto[]> {
		return this.rankingService.execute(rankingDto)
	}

	@Get('comparison')
	async getComparison(
		@Query() comparisonDto: ComparisonDto
	): Promise<ComparisonResponseDto> {
		return this.comparisonService.execute(comparisonDto)
	}
}
