interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
}

interface PokemonResponse {
  results: Pokemon[];
}

interface PokemonSpecie {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

interface PokemonState {
  pokemon: Pokemon | null;
  pokemonSpecie: PokemonSpecie | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isLoadingSpecie: boolean;
  isErrorSpecie: boolean;
  errorSpecie: string | null;
}

interface PokedexState {
  search: string;
  currentPage: number;
  pokemons: Pokemon[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  searchResults: Pokemon[];
}

export type {
  Pokemon,
  PokemonResponse,
  PokemonSpecie,
  PokemonState,
  PokedexState,
};
