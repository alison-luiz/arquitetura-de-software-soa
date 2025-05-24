import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { IBGE_API_URL } from 'src/shared/utils/environment'
import { ComparisonDto, ComparisonResponseDto } from '../dto/comparison.dto'

interface IbgeRawComparison {
	nome: string
	sexo: string | null
	localidade: string
	res: {
		periodo: string
		frequencia: number
	}[]
}

@Injectable()
export class ComparisonService {
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

	async execute(comparisonDto: ComparisonDto): Promise<ComparisonResponseDto> {
		const endpoint = `${IBGE_API_URL}/v2/censos/nomes/${comparisonDto.name1}|${comparisonDto.name2}`
		const { data } = await firstValueFrom(
			this.httpService.get<IbgeRawComparison[]>(endpoint, {
				headers: { 'Content-Type': 'application/json' }
			})
		)

		const items = data.map((item) => ({
			name: item.nome,
			periods: item.res
				.map(({ periodo, frequencia }) => ({
					year: this.extractYear(periodo),
					frequency: frequencia
				}))
				.sort((a, b) => a.year - b.year)
		}))

		return { items }
	}
}
