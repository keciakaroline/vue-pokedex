export const API_BASE_URL = "https://pokeapi.co/api/v2/";

export const LIMIT = 20;

export const INITIAL_PAGE = 1;

export function cleanFlavorText(flavorText: string | null): string {
  return flavorText
    ? flavorText.replace(/\\f|\\n/g, " ").replace(/POKéMON/g, "Pokémon")
    : "";
}

export const turnDecimal = (value: number): string => {
  return (value / 10).toFixed(1);
};

export const formatId = (id: number | null): string => {
  return `#${id?.toString().padStart(3, "0")}`;
};

interface PokemonType {
  type: {
    name: string;
  };
}

export const pokemonType = (types: PokemonType[] | null): string => {
  return types?.[0]?.type.name ?? "normal";
};

export const formatStat = (stat: number | string): string => {
  return parseInt(stat as string)
    .toString()
    .padStart(3, "0");
};

export const calculateWidth = (stat: number): string => `${(stat / 50) * 100}%`;
