import { defineStore } from "pinia";
import { getPokemons, getPokemonByName } from "@/services/pokemonApiService";
import { INITIAL_PAGE } from "@/shared/helpers";
import type { PokedexState } from "@/services/types";
import { useRouter } from "vue-router";

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
    isSearching: false,
    searchResults: [],
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
      const trimmedSearch = this.search.trim();
      if (!trimmedSearch) {
        this.redirectToHome();
        return;
      }

      this.isSearching = true;
      this.isError = false;
      this.error = null;

      try {
        if (this.searchMode === "id") {
          const { data } = await getPokemonByName(this.search);
          this.searchResults = [data];
        } else if (this.searchMode === "name") {
          const { data } = await getPokemonByName(this.search.toLowerCase());
          this.searchResults = [data];
        }
      } catch (error: any) {
        this.isError = true;
        this.error = error.message || "Erro ao buscar o Pokémon.";
        this.searchResults = [];
      } finally {
        this.isSearching = false;
      }
    },

    setSearchMode() {
      this.searchMode = this.searchMode === "name" ? "id" : "name";
    },

    setSearch(value: string) {
      this.search = value;
    },

    redirectToHome() {
      const router = useRouter();
      this.resetSearchAndReload();
      router.push("/");
    },

    resetSearchAndReload() {
      this.search = "";
      this.filter = [];
      this.searchResults = [];
      this.currentPage = INITIAL_PAGE;
      this.fetchPokemons();
    },
  },
});
