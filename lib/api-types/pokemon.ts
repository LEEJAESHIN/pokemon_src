// PokeAPI 타입 정의

export interface PokemonSpeciesName {
  name: string;
  language: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  names: PokemonSpeciesName[];
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}
