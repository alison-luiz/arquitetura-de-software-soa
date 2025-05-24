export interface Period {
  year: number;
  frequency: number;
}

export interface EvolutionResponse {
  name: string;
  periods: Period[];
}

export interface RankingItem {
  name: string;
  frequency: number;
  ranking: number;
}

export interface RankingResponse {
  locality: string;
  items: RankingItem[];
}

export interface ComparisonItem {
  name: string;
  periods: Period[];
}

export interface ComparisonResponse {
  items: ComparisonItem[];
}
