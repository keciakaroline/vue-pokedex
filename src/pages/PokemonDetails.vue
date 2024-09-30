<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";
import PokemonAboutDetails from "@/components/PokemonAboutDetails.vue";
import PokemonStats from "@/components/PokemonStats.vue";
import backArrow from "@/assets/icons/back_arrow.svg";
import arrowLeft from "@/assets/icons/arrow_left.svg";
import arrowRight from "@/assets/icons/arrow_right.svg";
import { pokemonType } from "@/shared/helpers/index.ts";

const route = useRoute();
const router = useRouter();
const { name } = route.params as { name: string };

const pokemonStore = usePokemonStore();

onMounted(() => {
  pokemonStore.fetchPokemonByName(name);
  pokemonStore.fetchPokemonSpecies(name);
});

const pokemon = computed(() => pokemonStore.pokemon);
const pokemonSpecie = computed(() => pokemonStore.pokemonSpecie);
const isLoading = computed(() => pokemonStore.isLoading);
const isError = computed(() => pokemonStore.isError);
const error = computed(() => pokemonStore.error);
const isLoadingSpecie = computed(() => pokemonStore.isLoadingSpecie);
const isErrorSpecie = computed(() => pokemonStore.isErrorSpecie);
const errorSpecie = computed(() => pokemonStore.errorSpecie);
</script>

<template>
  <div v-if="isLoading || isLoadingSpecie">Loading...</div>
  <div v-if="isError">{{ error }}</div>
  <div v-if="isErrorSpecie">{{ errorSpecie }}</div>

  <div
    v-if="pokemon"
    :class="`pokemonDetails_main pokemon-type--${pokemonType(pokemon?.types)}`"
  >
    <header class="pokemonDetails_header">
      <router-link :to="`/`">
        <img
          class="pokemonDetails_backArrow"
          :src="backArrow"
          alt="Back to Pokedex"
        />
      </router-link>
      <h1 class="pokemonDetails_pokemonName">{{ pokemon.name }}</h1>
      <p class="pokemonDetails_id">
        #{{ pokemon.id.toString().padStart(3, "0") }}
      </p>
    </header>

    <div class="pokemonDetails_mid">
      <div class="section_about_pokemon_img_arrows">
        <button
          @click="handlePreviousPokemon"
          class="btn_left_arrow"
        >
          <img
            class="pokemon_about_left_arrow"
            :src="arrowLeft"
            alt="Left arrow"
          />
        </button>
        <img
          class="pokemon_about_img"
          :src="pokemon.sprites?.other['official-artwork']?.front_default"
          :alt="pokemon.name"
        />
        <button
          @click="handleNextPokemon"
          class="btn_right_arrow"
        >
          <img
            class="pokemon_about_right_arrow"
            :src="arrowRight"
            alt="Right arrow"
          />
        </button>
      </div>
    </div>

    <section class="section_about">
      <PokemonAboutDetails
        :name="pokemon.name"
        :weight="pokemon.weight"
        :height="pokemon.height"
        :abilities="pokemon.abilities"
      />
      <PokemonStats
        :stats="pokemon.stats"
        :types="pokemon.types"
      />
    </section>
  </div>
</template>

<style scoped>
@import "@/pages/PokemonDetails.css";
</style>
