import React, { useState } from "react";

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      imgUrl:
        "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1500&q=80",
      alt: "Creative workspace",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1500&q=80",
      alt: "Notebook and coffee",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1602526217033-3ec78c9f53c4?auto=format&fit=crop&w=1500&q=80",
      alt: "Office setup",
    },
  ];

  const goToSlide = (index: number) => {
    const total = slides.length;
    const newIndex = (index + total) % total;
    setCurrent(newIndex);
  };

  return (
    <div className="carousel w-full max-w-7xl rounded-lg shadow-lg overflow-hidden relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-item w-full transition-opacity duration-500 ease-in-out ${
            index === current ? "block" : "hidden"
          }`}
        >
          <img
            src={slide.imgUrl}
            alt={slide.alt}
            className="w-full object-cover h-[400px]"
          />
        </div>
      ))}

      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <button
          onClick={() => goToSlide(current - 1)}
          className="btn btn-sm md:btn-md btn-circle"
        >
          ❮
        </button>
        <button
          onClick={() => goToSlide(current + 1)}
          className="btn btn-sm md:btn-md btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
