<script setup lang="ts">
import { computed, defineProps } from "vue";
import { turnDecimal } from "@/shared/helpers/index.ts";
import dividerIcon from "@/assets/icons/divider.svg";
import weightIcon from "@/assets/icons/weight.svg";
import heightIcon from "@/assets/icons/straighten.svg";

interface Ability {
  ability: {
    name: string;
  };
}

interface Props {
  name: string;
  weight: number;
  height: number;
  abilities: Ability[];
}

const props = defineProps<Props>();

const formattedWeight = computed(() => turnDecimal(props.weight));
const formattedHeight = computed(() => turnDecimal(props.height));

const generateUuid = () => crypto.randomUUID();
</script>

<template>
  <div class="pokemonDetails_body">
    <div class="pokemonDetails_section_weight">
      <div class="pokemonDetails_img_and_valor">
        <img
          class="pokemon_weight_img"
          :src="weightIcon"
          :alt="`${name} weight`"
        />
        <p class="pokemon_weight_title">{{ formattedWeight }} Kg</p>
      </div>
      <div class="pokemon_details_weight">Weight</div>
    </div>

    <div>
      <img
        class="divider"
        :src="dividerIcon"
        alt="divider"
      />
    </div>

    <div class="pokemonDetails_section_height">
      <div class="pokemonDetails_img_and_valor">
        <img
          class="pokemon_height_img"
          :src="heightIcon"
          :alt="`${name} height`"
        />
        <p class="pokemon_height_title">{{ formattedHeight }} m</p>
      </div>
      <div class="pokemon_details_height">Height</div>
    </div>

    <div>
      <img
        class="divider"
        :src="dividerIcon"
        alt="divider"
      />
    </div>

    <div class="pokemonDetails_section_abilities">
      <div class="pokemonDetails_abilities">
        <div
          v-for="ability in abilities"
          :key="generateUuid()"
          class="ability"
        >
          {{ ability.ability.name }}
        </div>
      </div>
      <div class="pokemon_details_abilities">Moves</div>
    </div>
  </div>
</template>

<style scoped>
.pokemonDetails_body {
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: fit-content;
}

.pokemonDetails_img_and_valor {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 2rem;
  padding: 0.5rem 0rem 0.5rem 0rem;
  gap: 0.5rem;
  align-items: center;
}

.pokemonDetails_abilities {
  flex-direction: row;
  width: 100%;
  height: 2rem;
  padding: 0.5rem 0rem 0.5rem 0rem;
  gap: 0.5rem;
  align-items: center;
}

.pokemon_weight_img,
.pokemon_height_img {
  width: 1rem;
  height: 1rem;
}

.pokemon_weight_title,
.pokemon_height_title,
.pokemonDetails_abilities {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #1d1d1d;
  line-height: 1rem;
  font-size: 0.625rem;
  text-align: center;
}

.pokemonDetails_section_weight,
.pokemonDetails_section_height,
.pokemonDetails_section_abilities,
.ability {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: capitalize;
}

.pokemon_details_weight,
.pokemon_details_height,
.pokemon_details_abilities {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #666666;
  line-height: 0.75rem;
  font-size: 0.5rem;
}

.divider {
  background: #e0e0e0;
  width: 0.0625rem;
  height: 3rem;
  margin: 0 auto;
}
@media screen and (min-width: 1024px) {
  .pokemonDetails_img_and_valor {
    height: 4rem;
    padding: 1rem 0rem 1rem 0rem;
  }

  .pokemon_weight_img,
  .pokemon_height_img {
    width: 2rem;
    height: 2rem;
  }

  .pokemon_weight_title,
  .pokemon_height_title,
  .pokemonDetails_abilities {
    line-height: 1rem;
    font-size: 1rem;
  }

  .pokemon_details_weight,
  .pokemon_details_height,
  .pokemon_details_abilities {
    line-height: 1rem;
    font-size: 1rem;
  }

  .divider {
    width: 0.1rem;
    height: 7rem;
  }

  .pokemonDetails_abilities {
    height: 4rem;
    padding: 1rem 0rem 1rem 0rem;
  }
}
</style>
