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
    searchResults: [],
    selectedTypes: [],
    typeFilterError: "",
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

    filterByTypes() {
      if (this.selectedTypes.length === 0) {
        this.searchResults = this.pokemons;
        this.typeFilterError = "";
      } else {
        const filtered = this.pokemons.filter((pokemon) =>
          pokemon.types.some((type) =>
            this.selectedTypes.includes(type.type.name)
          )
        );

        if (filtered.length === 0) {
          this.searchResults = [];
          this.typeFilterError =
            "Nenhum Pokémon encontrado com os tipos selecionados.";
        } else {
          this.searchResults = filtered;
          this.typeFilterError = "";
        }
      }
    },

    setSelectedTypes(types: string[]) {
      this.selectedTypes = types;
      this.filterByTypes();
    },

    setSearch(value: string) {
      this.search = value;
    },

    resetSearchAndReload() {
      this.search = "";
      this.selectedTypes = [];
      this.searchResults = [];
      this.typeFilterError = "";
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
