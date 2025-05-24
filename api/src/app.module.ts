import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { IbgeModule } from './modules/ibge/ibge.module'

@Module({
	imports: [ConfigModule.forRoot(), IbgeModule],
	controllers: []
})
export class AppModule {}
