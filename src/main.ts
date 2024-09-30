import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Pokedex from "@/pages/Pokedex.vue";
import PokemonDetails from "@/pages/PokemonDetails.vue";
import { createPinia } from "pinia";

const routes = [
  {
    path: "/",
    name: "Pokedex",
    component: Pokedex,
  },
  {
    path: "/pokemon/:id",
    name: "PokemonDetails",
    component: PokemonDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
