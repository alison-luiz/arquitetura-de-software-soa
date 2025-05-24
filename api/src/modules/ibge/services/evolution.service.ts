import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { IBGE_API_URL } from 'src/shared/utils/environment'
import { EvolutionDto } from '../dto/evolution.dto'
import { EvolutionResponseDto, PeriodDto } from '../dto/evolution.dto'

interface IbgeRaw {
	nome: string
	sexo: string | null
	localidade: string
	res: { periodo: string; frequencia: number }[]
}

@Injectable()
export class EvolutionService {
	constructor(private readonly httpService: HttpService) {}

	private extractYear(periodo: string): number {
		const range = periodo.match(/^\[(\d{4}),(\d{4})\[$/)
		if (range) {
			return parseInt(range[2], 10)
		}
		const single = periodo.match(/^(\d{4})\[$/)
		if (single) {
			return parseInt(single[1], 10)
		}
		return NaN
	}

	private filterPeriodsByYearRange(
		periods: PeriodDto[],
		firstYear: string,
		lastYear: string
	): PeriodDto[] {
		const startYear = parseInt(firstYear, 10)
		const endYear = parseInt(lastYear, 10)

		return periods.filter(
			(period) => period.year >= startYear && period.year <= endYear
		)
	}

	async execute(evolutionDto: EvolutionDto): Promise<EvolutionResponseDto[]> {
		const endpoint = `${IBGE_API_URL}/v2/censos/nomes/${evolutionDto.name}`
		const { data } = await firstValueFrom(
			this.httpService.get<IbgeRaw[]>(endpoint, {
				headers: { 'Content-Type': 'application/json' }
			})
		)

		return data.map((person) => {
			const periods = person.res
				.map(({ periodo, frequencia }) => ({
					year: this.extractYear(periodo),
					frequency: frequencia
				}))
				.sort((a, b) => a.year - b.year)

			const filteredPeriods = this.filterPeriodsByYearRange(
				periods,
				evolutionDto.firstYear,
				evolutionDto.lastYear
			)

			return {
				name: person.nome,
				periods: filteredPeriods
			}
		})
	}
}
