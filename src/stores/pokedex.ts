import { defineStore } from "pinia";
import { getPokemons, getPokemonByName } from "@/services/pokemonApiService";
import { INITIAL_PAGE } from "@/shared/helpers";
import type { PokedexState } from "@/services/types";

export const usePokedexStore = defineStore("pokedex", {
  state: (): PokedexState => ({
    search: "",
    searchMode: "name",
    currentPage: INITIAL_PAGE,
    filter: [],
    pokemons: [],
    isLoading: false,
    isError: false,
    error: null,
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

    handleSearch() {
      if (this.searchMode === "id") {
        this.filter = this.pokemons.filter((pokemon) =>
          pokemon.id.toString().includes(this.search)
        );
      } else if (this.searchMode === "name") {
        this.filter = this.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
    },

    setSearchMode() {
      this.searchMode = this.searchMode === "name" ? "id" : "name";
    },
  },
});
