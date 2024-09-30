<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import pokeballImg from "@/assets/icons/pokeball.svg";
import searchImg from "@/assets/icons/search.svg";
import vectorId from "@/assets/icons/searchById.svg";
import vectorName from "@/assets/icons/searchByName.svg";
import arrowBackBold from "@/assets/icons/arrow_back_bold.svg";
import arrowForwardBold from "@/assets/icons/arrow_forward_bold.svg";
import PokemonCard from "../components/PokemonCard.vue";

const pokedexStore = usePokedexStore();

const search = computed(() => pokedexStore.search);
const searchMode = computed(() => pokedexStore.searchMode);
const pokemons = computed(() => pokedexStore.pokemons);
const filter = computed(() => pokedexStore.filter);
const isLoading = computed(() => pokedexStore.isLoading);
const isError = computed(() => pokedexStore.isError);
const error = computed(() => pokedexStore.error);

const handleSearch = pokedexStore.handleSearch;
const setSearchMode = pokedexStore.setSearchMode;
const handleNextPage = pokedexStore.handleNextPage;
const handlePreviousPage = pokedexStore.handlePreviousPage;

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
        <h1 class="header_pokedex_title">Pokédex</h1>
      </div>
      <div class="header_title header_searchBar">
        <div class="inputContainer">
          <button
            @click="handleSearch"
            class="btn_searchImg"
          >
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
            @keydown.enter="handleSearch"
          />
        </div>
        <button
          class="btn_search"
          @click="setSearchMode"
        >
          <img
            :src="searchMode === 'name' ? vectorName : vectorId"
            alt="search by Id or Name icon"
            class="searchByIdImg"
          />
        </button>
      </div>
    </header>

    <section class="section_pokedex">
      <div v-if="isLoading">Loading...</div>
      <div v-if="isError">An error has occurred: {{ error }}</div>

      <ul
        class="grid_pokedex"
        v-if="!isLoading && !isError"
      >
        <PokemonCard
          v-for="pokemon in filter.length !== 0 ? filter : pokemons"
          :key="pokemon.id"
          :name="pokemon.name"
          :id="pokemon.id"
          :sprites="pokemon.sprites?.other['official-artwork']?.front_default"
        />
      </ul>

      <footer class="footer_pagination">
        <button
          class="btn_pagination_left"
          @click="handlePreviousPage"
        >
          <img
            :src="arrowBackBold"
            alt="arrow to go back one page"
          />
        </button>
        <button
          class="btn_pagination_right"
          @click="handleNextPage"
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
