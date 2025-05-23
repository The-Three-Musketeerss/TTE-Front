import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import { describe, it, expect } from "vitest";

describe("Carousel", () => {
  it("renders the first image initially", () => {
    render(<Carousel />);
    const images = screen.getAllByRole("img");
    expect((images[0] as HTMLImageElement).alt).toBe("Clothes");
    expect(images[0].parentElement).toHaveClass("block");
    expect(images[1].parentElement).toHaveClass("hidden");
  });

  it("goes to next slide on right arrow click", () => {
    render(<Carousel />);
    fireEvent.click(screen.getByText("❯"));

    const images = screen.getAllByRole("img");
    expect((images[1] as HTMLImageElement).alt).toBe("Buying items");
    expect(images[1].parentElement).toHaveClass("block");
    expect(images[0].parentElement).toHaveClass("hidden");
  });

  it("goes to previous slide on left arrow click", () => {
    render(<Carousel />);
    fireEvent.click(screen.getByText("❯"));
    fireEvent.click(screen.getByText("❮"));

    const images = screen.getAllByRole("img");
    expect((images[0] as HTMLImageElement).alt).toBe("Clothes");
    expect(images[0].parentElement).toHaveClass("block");
    expect(images[1].parentElement).toHaveClass("hidden");
  });

  it("wraps to last slide when clicking ❮ on first", () => {
    render(<Carousel />);
    fireEvent.click(screen.getByText("❮"));

    const images = screen.getAllByRole("img");
    expect((images[1] as HTMLImageElement).alt).toBe("Buying items");
    expect(images[1].parentElement).toHaveClass("block");
    expect(images[0].parentElement).toHaveClass("hidden");
  });
});
