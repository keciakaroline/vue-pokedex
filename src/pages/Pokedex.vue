<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import pokeballImg from "@/assets/icons/pokeball.svg";
import searchImg from "@/assets/icons/search.svg";
import arrowBackBold from "@/assets/icons/arrow_back_bold.svg";
import arrowForwardBold from "@/assets/icons/arrow_forward_bold.svg";
import PokemonCard from "../components/PokemonCard.vue";
import { useRouter } from "vue-router";

const pokedexStore = usePokedexStore();
const router = useRouter();

const search = computed(() => pokedexStore.search);
const pokemons = computed(() => pokedexStore.pokemons);
const isLoading = computed(() => pokedexStore.isLoading);
const isError = computed(() => pokedexStore.isError);
const searchResults = computed(() => pokedexStore.searchResults);

const handleSearch = () => {
  pokedexStore.handleSearch();
};

const redirectToHome = () => {
  pokedexStore.resetSearchAndReload();
  router.push("/");
};

const setSearch = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (target && target.value) {
    pokedexStore.setSearch(target.value);
    handleSearch();
  }
};

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
            @input="setSearch"
            @keydown.enter="handleSearch"
          />
        </div>
      </div>
    </header>

    <section class="section_pokedex">
      <div v-if="isLoading">Loading...</div>
      <div v-if="isError">An error has occurred: Pokemon not found</div>

      <ul
        class="grid_pokedex"
        v-if="!isLoading && !isError && searchResults.length > 0"
      >
        <PokemonCard
          v-for="pokemon in searchResults"
          :key="pokemon.id"
          :name="pokemon.name"
          :id="pokemon.id"
          :sprites="pokemon.sprites?.other['official-artwork']?.front_default"
        />
      </ul>

      <ul
        class="grid_pokedex"
        v-if="!isLoading && !isError && searchResults.length === 0"
      >
        <PokemonCard
          v-for="pokemon in pokemons"
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
