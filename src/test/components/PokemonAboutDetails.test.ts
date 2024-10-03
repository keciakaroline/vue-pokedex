import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import PokemonAboutDetails from "@/components/PokemonAboutDetails.vue";
import "@testing-library/jest-dom";

describe("PokemonAboutDetails", () => {
  it("should render weight, height and skills", () => {
    const props = {
      name: "charizard",
      weight: 905,
      height: 17,
      abilities: [
        { ability: { name: "blaze" } },
        { ability: { name: "solar-power" } },
      ],
    };

    render(PokemonAboutDetails, { props });

    expect.soft(screen.getByText("90.5 Kg")).toBeInTheDocument();

    expect.soft(screen.getByText("1.7 m")).toBeInTheDocument();

    expect.soft(screen.getByText("blaze")).toBeInTheDocument();
    expect.soft(screen.getByText("solar-power")).toBeInTheDocument();

    expect.soft(screen.getByAltText("charizard weight")).toBeInTheDocument();
    expect.soft(screen.getByAltText("charizard height")).toBeInTheDocument();
  });
});
