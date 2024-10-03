<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import pokeballImg from "@/assets/icons/pokeball.svg";
import searchImg from "@/assets/icons/search.svg";
import arrowBackBold from "@/assets/icons/arrow_back_bold.svg";
import arrowForwardBold from "@/assets/icons/arrow_forward_bold.svg";
import PokemonCard from "../components/PokemonCard.vue";
import { useRouter } from "vue-router";

const types = [
  "fire",
  "water",
  "grass",
  "electric",
  "rock",
  "ground",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy",
  "bug",
  "poison",
  "normal",
  "flying",
  "fighting",
  "steel",
  "ghost",
];

const pokedexStore = usePokedexStore();
const router = useRouter();
const search = ref(pokedexStore.search);

const currentPage = computed(() => pokedexStore.currentPage);
const isLoading = computed(() => pokedexStore.isLoading);
const isError = computed(() => pokedexStore.isError);
const totalPages = computed(() => pokedexStore.totalPages);
const selectedTypes = computed(() => pokedexStore.selectedTypes);

const filteredPokemons = computed(() => {
  return pokedexStore.pokemons.filter((pokemon) => {
    const matchesSearchName = pokemon.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const isFromFilteredTypes = selectedTypes.value.length
      ? pokemon.types.some((type) =>
          selectedTypes.value.includes(type.type.name)
        )
      : true;

    return matchesSearchName && isFromFilteredTypes;
  });
});

const setSearch = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target && target.value) {
    pokedexStore.setSearch(target.value);
  }
};

const handleTypeChange = () => {
  const selectedTypes = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map((input) => (input as HTMLInputElement).value);

  pokedexStore.setSelectedTypes(selectedTypes);
};

const redirectToHome = () => {
  pokedexStore.currentPage = 1;
  pokedexStore.resetSearchAndReload();
};

onMounted(() => {
  pokedexStore.fetchPokemons();
});
</script>

<template>
  <div class="main_container">
    <header class="header_pokedex">
      <div class="header_title">
        <img
          :src="pokeballImg"
          alt="Pokeball"
          class="pokeballImg"
        />
        <router-link
          to="/"
          class="header_pokedex_title"
          @click="redirectToHome"
        >
          Pokédex
        </router-link>
      </div>
      <div class="header_title header_searchBar">
        <div class="inputContainer">
          <button class="btn_searchImg">
            <img
              :src="searchImg"
              alt="search icon"
              class="searchImg"
            />
          </button>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            class="searchInput"
            v-model="search"
            @input="setSearch"
          />
        </div>
      </div>
    </header>

    <div class="filter_section">
      <h3>Filter by Types:</h3>
      <div class="types_filters">
        <div
          v-for="type in types"
          :key="type"
          class="filter_option"
        >
          <label>
            <input
              type="checkbox"
              :value="type"
              @change="handleTypeChange"
            />
            {{ type }}
          </label>
        </div>
      </div>
    </div>

    <section class="section_pokedex">
      <div v-if="isLoading">Loading...</div>
      <div v-if="isError">An error has occurred: Pokémon not found</div>

      <ul
        class="grid_pokedex"
        v-if="!isLoading && !isError"
      >
        <PokemonCard
          v-for="pokemon in filteredPokemons"
          :key="pokemon.id"
          :name="pokemon.name"
          :id="pokemon.id"
          :sprites="pokemon.sprites?.other['official-artwork']?.front_default"
        />
      </ul>

      <footer class="footer_pagination">
        <button
          class="btn_pagination_left"
          :disabled="currentPage === 1"
          @click="pokedexStore.updatePage('previous')"
        >
          <img
            :src="arrowBackBold"
            alt="arrow to go back one page"
          />
        </button>
        <button
          class="btn_pagination_right"
          :disabled="currentPage >= totalPages"
          @click="pokedexStore.updatePage('next')"
        >
          <img
            :src="arrowForwardBold"
            alt="arrow to go forward one page"
          />
        </button>
      </footer>
    </section>
  </div>
</template>

<style scoped>
@import "Pokedex.css";
</style>
