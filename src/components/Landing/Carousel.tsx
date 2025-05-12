import { useState } from "react";

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      imgUrl:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Clothes",
    },
    {
      imgUrl:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Buying items",
    }
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
