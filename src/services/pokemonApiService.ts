import axiosClient from "./axiosClient";
import { LIMIT } from "@/shared/helpers/index";
import type { Pokemon, PokemonResponse } from "./types";

export function getPokemons(
  page: number = 1
): Promise<{ results: Pokemon[]; count: number }> {
  const offset = (page - 1) * LIMIT;
  return axiosClient
    .get<PokemonResponse>(`/pokemon?offset=${offset}&limit=${LIMIT}`)
    .then((response) => {
      return {
        results: response.data.results,
        count: response.data.count,
      };
    })
    .catch((error) => {
      throw error;
    });
}

export function getPokemonByName(name: string): Promise<any> {
  return axiosClient.get(`/pokemon/${name}`);
}

export function getPokemonSpecies(name: string): Promise<any> {
  return axiosClient.get(`/pokemon-species/${name}`);
}
