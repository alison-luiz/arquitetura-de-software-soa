import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { IBGE_API_URL } from 'src/shared/utils/environment'

@Injectable()
export class IbgeService {
	constructor(private readonly httpService: HttpService) {}

	async getFrequencyByName(name: string) {
		// https://servicodados.ibge.gov.br/api/v2/censos/nomes/{nome}

		const endpoint = `${IBGE_API_URL}/v2/censos/nomes/${name}`
		const headers = {
			'Content-Type': 'application/json'
		}
		const { data } = await firstValueFrom(
			this.httpService.get(endpoint, {
				headers
			})
		)

		return data
	}
}
