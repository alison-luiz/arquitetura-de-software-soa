import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { IBGE_API_URL } from 'src/shared/utils/environment'
import { RankingDto, RankingResponseDto } from '../dto/ranking.dto'

interface IbgeRawRanking {
	localidade: string
	sexo: string | null
	res: {
		nome: string
		frequencia: number
		ranking: number
	}[]
}

interface IbgeState {
	id: number
	sigla: string
	nome: string
	regiao: {
		id: number
		sigla: string
		nome: string
	}
}

@Injectable()
export class RankingService {
	constructor(private readonly httpService: HttpService) {}

	private async getStateId(stateUf: string): Promise<number> {
		const endpoint = `${IBGE_API_URL}/v1/localidades/estados`
		const { data } = await firstValueFrom(
			this.httpService.get<IbgeState[]>(endpoint, {
				params: { orderBy: 'nome' },
				headers: { 'Content-Type': 'application/json' }
			})
		)

		const state = data.find((s) => s.sigla === stateUf)
		if (!state) {
			throw new Error(`Estado com UF ${stateUf} não encontrado`)
		}

		return state.id
	}

	async execute(rankingDto: RankingDto): Promise<RankingResponseDto[]> {
		const endpoint = `${IBGE_API_URL}/v2/censos/nomes/ranking`
		const { data } = await firstValueFrom(
			this.httpService.get<IbgeRawRanking[]>(endpoint, {
				params: {
					decada: rankingDto.decade,
					localidade:
						rankingDto.state === 'BR'
							? 'BR'
							: await this.getStateId(rankingDto.state)
				},
				headers: { 'Content-Type': 'application/json' }
			})
		)

		return data.map((ranking) => ({
			locality: rankingDto.state,
			items: ranking.res.map((item) => ({
				name: item.nome,
				frequency: item.frequencia,
				ranking: item.ranking
			}))
		}))
	}
}
