import { Module } from '@nestjs/common'
import { EvolutionService } from './services/evolution.service'
import { HttpModule } from '@nestjs/axios'
import { IbgeController } from './ibge.controller'
import { RankingService } from './services/ranking.service'
import { ComparisonService } from './services/comparison.service'

@Module({
	imports: [HttpModule],
	controllers: [IbgeController],
	providers: [EvolutionService, RankingService, ComparisonService]
})
export class IbgeModule {}
