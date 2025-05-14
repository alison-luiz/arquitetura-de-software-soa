import { Module } from '@nestjs/common'
import { IbgeService } from './services/ibge.service'

@Module({
	providers: [IbgeService],
	exports: [IbgeService]
})
export class IbgeModule {}
