<script setup lang="ts">
import { computed, defineProps } from "vue";
import {
  pokemonType,
  formatStat,
  calculateWidth,
} from "@/shared/helpers/index.ts";

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Type {
  type: {
    name: string;
  };
}

interface Props {
  types: Type[];
  stats: Stat[];
}

const props = defineProps<Props>();

const typeColor = computed(() => pokemonType(props.types));

const generateUuid = () => crypto.randomUUID();
</script>

<template>
  <div>
    <div
      v-for="stat in stats"
      :key="generateUuid()"
      class="pokemonDetails_stats_valor_bar"
    >
      <p class="statsValor">{{ formatStat(stat.base_stat) }}</p>

      <div
        :class="`statsBar_progress statsBar_progress_pokemon-type--${typeColor}`"
      >
        <div
          :class="`statsBar statsBar_pokemon-type--${typeColor}`"
          :style="{ width: calculateWidth(stat.base_stat) }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemonDetails_stats_valor_bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

/* !! olhar esse de novo */
.statsValor {
  padding: 0rem 0.25rem 0rem 0rem;
  margin: 0 auto;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #1d1d1d;
  line-height: 1rem;
  font-size: 0.625rem;
  text-align: center;
}

.statsBar_progress {
  box-sizing: border-box;
  padding: 0rem 11.75rem 0rem 0rem;
  border-radius: 0.25rem;
  width: 14rem;
  height: 0.25rem;
}

.statsBar {
  width: 14rem;
  height: 100%;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.statsBar_progress.statsBar_progress_pokemon-type--grass {
  background-color: var(--pokemon-type-grass-progress);
}

.statsBar.statsBar_pokemon-type--grass {
  background-color: var(--pokemon-type-grass);
}

.statsBar_progress.statsBar_progress_pokemon-type--bug {
  background-color: var(--pokemon-type-bug-progress);
}

.statsBar.statsBar_pokemon-type--bug {
  background-color: var(--pokemon-type-bug);
}

.statsBar_progress.statsBar_progress_pokemon-type--dark {
  background-color: var(--pokemon-type-dark-progress);
}

.statsBar.statsBar_pokemon-type--dark {
  background-color: var(--pokemon-type-dark);
}

.statsBar_progress.statsBar_progress_pokemon-type--dragon {
  background-color: var(--pokemon-type-dragon-progress);
}

.statsBar.statsBar_pokemon-type--dragon {
  background-color: var(--pokemon-type-dragon);
}

.statsBar_progress.statsBar_progress_pokemon-type--electric {
  background-color: var(--pokemon-type-electric-progress);
}

.statsBar.statsBar_pokemon-type--electric {
  background-color: var(--pokemon-type-electric);
}

.statsBar_progress.statsBar_progress_pokemon-type--fairy {
  background-color: var(--pokemon-type-fairy-progress);
}

.statsBar.statsBar_pokemon-type--fairy {
  background-color: var(--pokemon-type-fairy);
}

.statsBar_progress.statsBar_progress_pokemon-type--fighting {
  background-color: var(--pokemon-type-fighting-progress);
}

.statsBar.statsBar_pokemon-type--fighting {
  background-color: var(--pokemon-type-fighting);
}

.statsBar_progress.statsBar_progress_pokemon-type--fire {
  background-color: var(--pokemon-type-fire-progress);
}

.statsBar.statsBar_pokemon-type--fire {
  background-color: var(--pokemon-type-fire);
}

.statsBar_progress.statsBar_progress_pokemon-type--flying {
  background-color: var(--pokemon-type-flying-progress);
}

.statsBar.statsBar_pokemon-type--flying {
  background-color: var(--pokemon-type-flying);
}

.statsBar_progress.statsBar_progress_pokemon-type--ghost {
  background-color: var(--pokemon-type-ghost-progress);
}

.statsBar.statsBar_pokemon-type--ghost {
  background-color: var(--pokemon-type-ghost);
}

.statsBar_progress.statsBar_progress_pokemon-type--ground {
  background-color: var(--pokemon-type-ground-progress);
}

.statsBar.statsBar_pokemon-type--ground {
  background-color: var(--pokemon-type-ground);
}

.statsBar_progress.statsBar_progress_pokemon-type--ice {
  background-color: var(--pokemon-type-ice-progress);
}

.statsBar.statsBar_pokemon-type--ice {
  background-color: var(--pokemon-type-ice);
}

.statsBar_progress.statsBar_progress_pokemon-type--normal {
  background-color: var(--pokemon-type-normal-progress);
}

.statsBar.statsBar_pokemon-type--normal {
  background-color: var(--pokemon-type-normal);
}

.statsBar_progress.statsBar_progress_pokemon-type--poison {
  background-color: var(--pokemon-type-poison-progress);
}

.statsBar.statsBar_pokemon-type--poison {
  background-color: var(--pokemon-type-poison);
}

.statsBar_progress.statsBar_progress_pokemon-type--psychic {
  background-color: var(--pokemon-type-psychic-progress);
}

.statsBar.statsBar_pokemon-type--psychic {
  background-color: var(--pokemon-type-psychic);
}

.statsBar_progress.statsBar_progress_pokemon-type--rock {
  background-color: var(--pokemon-type-rock-progress);
}

.statsBar.statsBar_pokemon-type--rock {
  background-color: var(--pokemon-type-rock);
}

.statsBar_progress.statsBar_progress_pokemon-type--steel {
  background-color: var(--pokemon-type-steel-progress);
}

.statsBar.statsBar_pokemon-type--steel {
  background-color: var(--pokemon-type-steel);
}

.statsBar_progress.statsBar_progress_pokemon-type--water {
  background-color: var(--pokemon-type-water-progress);
}

.statsBar.statsBar_pokemon-type--water {
  background-color: var(--pokemon-type-water);
}

@media screen and (min-width: 1024px) {
  .statsValor {
    padding: 0.2rem 0.8rem 0rem 0rem;
    font-size: 1rem;
    line-height: 1rem;
  }

  .statsBar_progress {
    padding: 0rem 15rem 0rem 0rem;
    width: 25rem;
    height: 0.5rem;
  }

  .statsBar {
    width: 25rem;
  }
}
</style>
