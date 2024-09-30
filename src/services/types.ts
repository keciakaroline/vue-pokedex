interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: Pokemon[];
}

export type { Pokemon, PokemonResponse };
