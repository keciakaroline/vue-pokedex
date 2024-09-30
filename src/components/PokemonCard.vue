<script setup lang="ts">
import { computed, defineProps } from "vue";
import { formatId } from "@/shared/helpers/index.ts";

interface Props {
  name: string;
  id: number;
  sprites: string;
}

const props = defineProps<Props>();

const formattedId = computed(() => formatId(props.id));
</script>

<template>
  <li class="pokemonCard">
    <router-link
      :to="`/pokemon/${name}`"
      class="pokemonCard"
    >
      <div class="pokemonCard_id">{{ formattedId }}</div>
      <div class="pokemonCard_name">{{ name }}</div>
      <img
        class="pokemonCard_img"
        :src="sprites"
        :alt="name"
      />
    </router-link>
  </li>
</template>

<style scoped>
.pokemonCard {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  height: auto;
  width: 6.75rem;

  border: 0.0625rem solid transparent;
  border-radius: 0.5rem;
  box-shadow: 0rem 0.0625rem 0.1875rem 0.0625rem #00000033;
  animation-timing-function: ease-out;
  animation-duration: 300ms;
}

.pokemonCard_id {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;

  background-color: #fff;
  padding: 0.25rem 0.5rem 0rem 0.5rem;
  gap: 0.5rem;
  height: 0.75rem;
  width: 1.25rem;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 0.5rem;
  line-height: 0.75rem;
  text-align: right;
  color: #666;
}

.pokemonCard_name {
  display: flex;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0rem 0.25rem 0rem;
  border-radius: 0.4375rem;
  background: #efefef;
  width: 100%;

  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 0.625rem;
  line-height: 1rem;
  color: #1d1d1d;
  text-transform: capitalize;
}

.pokemonCard_img {
  width: 4.5rem;
  height: 4.5rem;
  padding: 1rem 0.5rem;
  z-index: 1;
}

@media screen and (min-width: 1024px) {
  .pokemonCard {
    width: 10rem;
    height: 11rem;
  }

  .pokemonCard_id {
    padding: 0.25rem 0.75rem 0rem 0.75rem;
    height: 1rem;
    width: 1.5rem;
    font-size: 0.7rem;
    line-height: 1rem;
  }

  .pokemonCard_name {
    padding: 4rem 0rem 0.7rem 0rem;
    font-size: 1.1rem;
    line-height: 0.3rem;
  }

  .pokemonCard_img {
    width: 8rem;
    height: 8rem;
  }
}
</style>
