import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/vue";
import { screen, waitFor } from "@testing-library/dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Pokedex from "@/pages/Pokedex.vue";
import PokemonDetails from "@/pages/PokemonDetails.vue";
import { usePokedexStore } from "@/stores/pokedex";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Pokedex,
    },
    {
      path: "/pokemon/:name",
      name: "PokemonDetails",
      component: PokemonDetails,
    },
  ],
});

describe("Pokedex", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should render the page", () => {
    render(Pokedex, {
      global: {
        plugins: [router],
      },
    });

    expect.soft(screen.getByText("Pokédex")).toBeInTheDocument();
    expect.soft(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect.soft(screen.getByText("Filter by Types:")).toBeInTheDocument();
  });

  it("should search pokemon by name", async () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.pokemons = [
      { id: 1, name: "bulbasaur", types: [{ type: { name: "grass" } }] },
      { id: 2, name: "charmander", types: [{ type: { name: "fire" } }] },
    ];

    render(Pokedex, {
      global: {
        plugins: [router],
      },
    });

    const searchInput = screen.getByPlaceholderText("Search");
    await fireEvent.update(searchInput, "bulbasaur");

    await waitFor(() => {
      expect.soft(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect.soft(screen.queryByText("charmander")).not.toBeInTheDocument();
    });
  });

  it("should filter pokemon by type", async () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.pokemons = [
      {
        id: 1,
        name: "bulbasaur",
        types: [{ type: { name: "grass" } }],
        sprites: {
          other: {
            "official-artwork": {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            },
          },
        },
      },
      {
        id: 2,
        name: "charmander",
        types: [{ type: { name: "fire" } }],
        sprites: {
          other: {
            "official-artwork": {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            },
          },
        },
      },
    ];

    render(Pokedex, {
      global: {
        plugins: [router],
      },
    });

    const fireCheckbox = screen.getByLabelText("fire");
    expect(fireCheckbox).toBeInTheDocument();

    await fireEvent.click(fireCheckbox);

    await waitFor(() => {
      expect(screen.getByText("charmander")).toBeInTheDocument();
      expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    });
  });

  it("should move page forward", async () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.totalPages = 2;
    pokedexStore.currentPage = 1;
    pokedexStore.pokemons = [
      {
        id: 1,
        name: "bulbasaur",
        types: [{ type: { name: "grass" } }],
        sprites: {
          other: {
            "official-artwork": {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            },
          },
        },
      },
    ];

    const spyUpdatePage = vi.spyOn(pokedexStore, "updatePage");

    render(Pokedex, {
      global: {
        plugins: [router],
      },
    });

    const nextPageButton = screen.getByAltText("arrow to go forward one page");
    await fireEvent.click(nextPageButton);

    expect.soft(spyUpdatePage).toHaveBeenCalledWith("next");
  });

  it("should render error message if pokemon is not found", async () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.isError = true;

    render(Pokedex, {
      global: {
        plugins: [router],
      },
    });

    expect
      .soft(screen.getByText("An error has occurred: Pokémon not found"))
      .toBeInTheDocument();
  });

  it("should show loading message", () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.isLoading = true;

    render(Pokedex, {
      global: {
        plugins: [router],
      },
    });

    expect.soft(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
