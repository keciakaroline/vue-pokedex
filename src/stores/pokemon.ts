import { defineStore } from "pinia";
import {
  getPokemonByName,
  getPokemonSpecies,
} from "@/services/pokemonApiService";
import { PokemonState } from "@/services/types";
import { useRouter } from "vue-router";

export const usePokemonStore = defineStore("pokemon", {
  state: (): PokemonState => ({
    pokemon: null,
    pokemonSpecie: null,
    isLoading: false,
    isError: false,
    error: null,
    isLoadingSpecie: false,
    isErrorSpecie: false,
    errorSpecie: null,
  }),

  actions: {
    async fetchPokemonByName(name: string) {
      this.isLoading = true;
      this.isError = false;
      this.error = null;

      try {
        const response = await getPokemonByName(name);
        this.pokemon = response.data;
      } catch (error: any) {
        this.isError = true;
        this.error = error.message || "Erro ao buscar o Pokémon.";
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPokemonSpecies(name: string) {
      this.isLoadingSpecie = true;
      this.isErrorSpecie = false;
      this.errorSpecie = null;

      try {
        const response = await getPokemonSpecies(name);
        this.pokemonSpecie = response.data;
      } catch (error: any) {
        this.isErrorSpecie = true;
        this.errorSpecie =
          error.message || "Erro ao buscar a espécie do Pokémon.";
      } finally {
        this.isLoadingSpecie = false;
      }
    },

    navigateToPreviousPokemon() {
      const router = useRouter();
      if (this.pokemon && this.pokemon.id > 1) {
        const previousPokemonId = this.pokemon.id - 1;
        router.push(`/pokemon/${previousPokemonId}`);
      }
    },

    navigateToNextPokemon() {
      const router = useRouter();
      if (this.pokemon) {
        const nextPokemonId = this.pokemon.id + 1;
        router.push(`/pokemon/${nextPokemonId}`);
      }
    },
  },
});
