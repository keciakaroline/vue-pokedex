import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePokedexStore } from "@/stores/pokedex";
import { createPinia, setActivePinia } from "pinia";
import { getPokemons, getPokemonByName } from "@/services/pokemonApiService";

vi.mock("@/services/pokemonApiService", () => ({
  getPokemons: vi.fn(),
  getPokemonByName: vi.fn(),
}));

describe("Pokedex Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should fetchPokemons", async () => {
    const mockPokemonsResponse = {
      results: [{ name: "bulbasaur" }],
      count: 1,
    };

    const mockPokemonDetailsResponse = {
      data: { name: "bulbasaur", id: 1 },
    };

    (getPokemons as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockPokemonsResponse
    );
    (getPokemonByName as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockPokemonDetailsResponse
    );

    const pokedexStore = usePokedexStore();

    await pokedexStore.fetchPokemons();

    expect.soft(pokedexStore.pokemons).toEqual([{ name: "bulbasaur", id: 1 }]);
    expect.soft(pokedexStore.totalPages).toBe(1);
    expect.soft(pokedexStore.isError).toBe(false);
    expect.soft(pokedexStore.isLoading).toBe(false);
  });

  it("should show error message if failed", async () => {
    (getPokemons as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("Erro ao buscar Pokémons")
    );

    const pokedexStore = usePokedexStore();

    await pokedexStore.fetchPokemons();

    expect.soft(pokedexStore.isError).toBe(true);
    expect.soft(pokedexStore.error).toBe("Erro ao buscar Pokémons");
    expect.soft(pokedexStore.isLoading).toBe(false);
  });

  it("should update page when called updatePage", async () => {
    const pokedexStore = usePokedexStore();

    (getPokemons as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [{ name: "bulbasaur" }],
      count: 20,
    });

    pokedexStore.totalPages = 3;
    pokedexStore.currentPage = 1;

    pokedexStore.updatePage("next");
    expect.soft(pokedexStore.currentPage).toBe(2);

    pokedexStore.updatePage("previous");
    expect.soft(pokedexStore.currentPage).toBe(1);
  });

  it("should select correct types with setSelectedTypes", () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.setSelectedTypes(["fire", "grass"]);

    expect.soft(pokedexStore.selectedTypes).toEqual(["fire", "grass"]);
  });

  it("should search when called setSearch", () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.setSearch("bulbasaur");

    expect.soft(pokedexStore.search).toBe("bulbasaur");
  });

  it("should reset search and filters when called resetSearchAndReload", async () => {
    const pokedexStore = usePokedexStore();

    (getPokemons as ReturnType<typeof vi.fn>).mockResolvedValue({
      results: [{ name: "bulbasaur" }],
      count: 20,
    });

    pokedexStore.setSearch("bulbasaur");
    pokedexStore.setSelectedTypes(["fire"]);
    pokedexStore.currentPage = 2;

    pokedexStore.resetSearchAndReload();

    expect.soft(pokedexStore.search).toBe("");
    expect.soft(pokedexStore.selectedTypes).toEqual([]);
    expect.soft(pokedexStore.currentPage).toBe(1);
  });

  it("should return getter canGoNext", () => {
    const pokedexStore = usePokedexStore();

    pokedexStore.totalPages = 3;
    pokedexStore.currentPage = 1;
    expect.soft(pokedexStore.canGoNext).toBe(true);

    pokedexStore.currentPage = 3;
    expect.soft(pokedexStore.canGoNext).toBe(false);
  });
});
