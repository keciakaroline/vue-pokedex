<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePokemonStore } from "@/stores/pokemon";
import PokemonAboutDetails from "@/components/PokemonAboutDetails.vue";
import PokemonStats from "@/components/PokemonStats.vue";
import backArrow from "@/assets/icons/back_arrow.svg";
import arrowLeft from "@/assets/icons/arrow_left.svg";
import arrowRight from "@/assets/icons/arrow_right.svg";
import divider from "@/assets/icons/divider.svg";
import { pokemonType, cleanFlavorText } from "@/shared/helpers/index.ts";

const route = useRoute();
const router = useRouter();
const { name } = route.params as { name: string };

const pokemonStore = usePokemonStore();

const loadPokemon = (pokemonName: string) => {
  pokemonStore.fetchPokemonByName(pokemonName);
  pokemonStore.fetchPokemonSpecies(pokemonName);
};

onMounted(() => {
  loadPokemon(name);
});

watch(
  () => route.params.name,
  (newPokemonName) => {
    loadPokemon(newPokemonName as string);
  }
);

const pokemon = computed(() => pokemonStore.pokemon);
const pokemonSpecie = computed(() => pokemonStore.pokemonSpecie);
const isLoading = computed(() => pokemonStore.isLoading);
const isError = computed(() => pokemonStore.isError);
const error = computed(() => pokemonStore.error);
const isLoadingSpecie = computed(() => pokemonStore.isLoadingSpecie);
const isErrorSpecie = computed(() => pokemonStore.isErrorSpecie);
const errorSpecie = computed(() => pokemonStore.errorSpecie);

const handlePreviousPokemon = () => {
  pokemonStore.navigateToPreviousPokemon(router);
};

const handleNextPokemon = () => {
  pokemonStore.navigateToNextPokemon(router);
};

const flavorText = computed(() => {
  const entry = pokemonSpecie.value?.flavor_text_entries?.find(
    (entry) => entry.language.name === "en"
  );
  return cleanFlavorText(entry?.flavor_text ?? null);
});
</script>

<template>
  <div v-if="isLoading || isLoadingSpecie">Loading...</div>
  <div v-if="isError">{{ error }}</div>
  <div v-if="isErrorSpecie">{{ errorSpecie }}</div>

  <div
    v-else
    :class="`pokemonDetails_main pokemon-type--${pokemonType(
      pokemon?.types ?? null
    )}`"
  >
    <header class="pokemonDetails_header">
      <router-link :to="`/`">
        <img
          class="pokemonDetails_backArrow"
          :src="backArrow"
          alt="Back to Pokedex"
        />
      </router-link>
      <h1 class="pokemonDetails_pokemonName">{{ pokemon?.name }}</h1>
      <p class="pokemonDetails_id">
        #{{ pokemon?.id.toString().padStart(3, "0") }}
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
          :src="pokemon?.sprites?.other['official-artwork']?.front_default"
          :alt="pokemon?.name"
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
      <div class="pokemonDetails_pokemonType">
        <span
          v-for="type in pokemon?.types"
          :key="type.type.name"
          :class="`pokemonDetails_pokemonType--${type.type.name}`"
        >
          {{ type.type.name }}
        </span>
      </div>

      <div>
        <h2
          :class="`title_pokemonDetails_pokemon-type--${pokemonType(
            pokemon?.types ?? null
          )}`"
        >
          About
        </h2>
        <PokemonAboutDetails
          :name="pokemon?.name ?? ''"
          :weight="pokemon?.weight ?? 0"
          :height="pokemon?.height ?? 0"
          :abilities="pokemon?.abilities ?? []"
        />
      </div>

      <div class="pokemonDetails_flavorText">
        <p>{{ flavorText }}</p>
      </div>

      <div class="pokemonDetails_stats">
        <h2
          :class="`title_pokemonDetails_pokemon-type--${pokemonType(
            pokemon?.types ?? null
          )}`"
        >
          Base Stats
        </h2>
        <div class="pokemonDetails_stats_table">
          <div>
            <div
              v-for="stat in pokemon?.stats"
              :key="stat.stat.name"
              class="pokemonDetails_stats_name"
            >
              <span
                :class="`statsName stat_pokemonDetails_pokemon-type--${pokemonType(
                  pokemon?.types ?? null
                )}`"
              >
                {{ stat.stat.name }}
              </span>
            </div>
          </div>

          <div>
            <img
              class="longDivider"
              :src="divider"
              alt="divider"
            />
          </div>

          <PokemonStats
            :stats="pokemon?.stats ?? []"
            :types="pokemon?.types ?? []"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import "PokemonDetails.css";
</style>
