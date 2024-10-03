import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import PokemonCard from "@/components/PokemonCard.vue";
import "@testing-library/jest-dom";

describe("PokemonCard", () => {
  it("should render name, id and img", () => {
    const props = {
      name: "pikachu",
      id: 25,
      sprites:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    };

    render(PokemonCard, { props });
    const img = screen.getByAltText("pikachu");

    expect.soft(screen.getByText("pikachu")).toBeInTheDocument();
    expect.soft(screen.getByText("#025")).toBeInTheDocument();
    expect.soft(img).toBeInTheDocument();
    expect.soft(img).toHaveAttribute("src", props.sprites);
  });
});
