import { defineStore } from "pinia";
import { getPokemons, getPokemonByName } from "@/services/pokemonApiService";
import { INITIAL_PAGE } from "@/shared/helpers";
import { LIMIT } from "@/shared/helpers/index";
import type { PokedexState } from "@/services/types";

export const usePokedexStore = defineStore("pokedex", {
  state: (): PokedexState => ({
    search: "",
    currentPage: INITIAL_PAGE,
    pokemons: [],
    isLoading: false,
    isError: false,
    error: null,
    selectedTypes: [],
    totalPages: 0,
  }),

  actions: {
    async fetchPokemons() {
      this.isLoading = true;
      this.isError = false;
      this.error = null;

      try {
        const response = await getPokemons(this.currentPage);

        const basicPokemonList = response.results;

        const pokemonDetails = await Promise.all(
          basicPokemonList.map(async (pokemon) => {
            const { data } = await getPokemonByName(pokemon.name);
            return data;
          })
        );

        this.pokemons = pokemonDetails;
        this.totalPages = Math.ceil(response.count / LIMIT);
      } catch (error: any) {
        this.isError = true;
        this.error = error.message || "Erro ao buscar Pokémons.";
      } finally {
        this.isLoading = false;
      }
    },

    updatePage(direction: "next" | "previous") {
      if (direction === "next" && this.currentPage < this.totalPages) {
        this.currentPage++;
      } else if (direction === "previous" && this.currentPage > 1) {
        this.currentPage--;
      }
      this.fetchPokemons();
    },

    setSelectedTypes(types: string[]) {
      this.selectedTypes = types;
    },

    setSearch(value: string) {
      this.search = value;
    },

    resetSearchAndReload() {
      this.search = "";
      this.selectedTypes = [];

      this.currentPage = INITIAL_PAGE;
      this.fetchPokemons();
    },
  },

  getters: {
    canGoNext(state) {
      return state.currentPage < state.totalPages;
    },
  },
});
