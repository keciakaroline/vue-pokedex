import { defineStore } from "pinia";
import { getPokemons, getPokemonByName } from "@/services/pokemonApiService";
import { INITIAL_PAGE } from "@/shared/helpers";
import type { PokedexState } from "@/services/types";

export const usePokedexStore = defineStore("pokedex", {
  state: (): PokedexState => ({
    search: "",
    currentPage: INITIAL_PAGE,
    pokemons: [],
    isLoading: false,
    isError: false,
    error: null,
    searchResults: [],
    selectedTypes: [] as string[],
  }),

  actions: {
    async fetchPokemons() {
      this.isLoading = true;
      this.isError = false;
      this.error = null;

      try {
        const basicPokemonList = await getPokemons(this.currentPage);

        const pokemonDetails = await Promise.all(
          basicPokemonList.map(async (pokemon) => {
            const { data } = await getPokemonByName(pokemon.name);
            return data;
          })
        );

        this.pokemons = pokemonDetails;
      } catch (error: any) {
        this.isError = true;
        this.error = error.message || "Erro ao buscar Pokémons.";
      } finally {
        this.isLoading = false;
      }
    },

    handleNextPage() {
      this.currentPage++;
      this.fetchPokemons();
    },

    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchPokemons();
      }
    },

    async handleSearch() {
      const trimmedSearch = this.search.trim().toLowerCase();
      if (!trimmedSearch) {
        this.resetSearchAndReload();
        return;
      }

      this.isLoading = true;
      this.isError = false;
      this.error = null;

      try {
        const filteredPokemons = this.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(trimmedSearch)
        );

        if (filteredPokemons.length > 0) {
          this.searchResults = filteredPokemons;
        } else {
          const { data } = await getPokemonByName(trimmedSearch);
          this.searchResults = [data];
        }
      } catch (error: any) {
        this.isError = true;
        this.error = error.message || "Erro ao buscar o Pokémon.";
        this.searchResults = [];
      } finally {
        this.isLoading = false;
      }
    },

    filterByType() {
      if (this.selectedTypes.length === 0) {
        this.searchResults = this.pokemons;
      } else {
        this.searchResults = this.pokemons.filter((pokemon) =>
          pokemon.types.some((type) =>
            this.selectedTypes.includes(type.type.name)
          )
        );
      }
    },

    setSelectedTypes(types: string[]) {
      this.selectedTypes = types;
      this.filterByType();
    },

    setSearch(value: string) {
      this.search = value;
    },

    resetSearchAndReload() {
      this.search = "";
      this.searchResults = [];
      this.currentPage = INITIAL_PAGE;
      this.fetchPokemons();
    },
  },
});
