import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from './shared/database/database.config'

import { IbgeModule } from './modules/ibge/ibge.module'
import { DatabaseService } from './shared/database/database.service'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) =>
				DatabaseConfig.createTypeOrmOptions(configService),
			inject: [ConfigService]
		}),
		IbgeModule
	],
	controllers: [],
	providers: [DatabaseService]
})
export class AppModule {}
