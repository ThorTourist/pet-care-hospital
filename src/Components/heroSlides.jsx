import React from "react";

const heroSlides = [
  {
    id: 1,
    img: "https://png.pngtree.com/png-vector/20250104/ourmid/pngtree-a-laying-dog-png-image_15037733.png",
    title: "Cozy Winter Cat Outfits",
    desc: "Keep your feline friends warm and stylish this winter!",
  },
  {
    id: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ95LK8iYhGPLew-dgzql8W3jIpLQqjSFcaYw&s",
    title: "Stylish Dog Winter Jackets",
    desc: "Comfortable and trendy winter jackets for your pups.",
  },
  {
    id: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbXs81_OV75l8vpetaWazAGd4f4dM9jdQeUQ&s",
    title: "Bunny Winter Warmers",
    desc: "Soft and cozy winter outfits for your tiny companions.",
  },
];

const HeroSlider = () => {
  return (
    <div className="carousel w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      {heroSlides.map((slide) => (
        <div
          key={slide.id}
          id={`slide${slide.id}`}
          className="carousel-item relative w-full"
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-[500px] object-cover brightness-90"
          />
          <div className="absolute flex flex-col justify-center items-start h-full left-10 top-0 text-white">
            <h2 className="text-4xl font-bold mb-3">{slide.title}</h2>
            <p className="mb-5 text-lg">{slide.desc}</p>
            <button className="btn btn-primary">Shop Now</button>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${
                slide.id === 1 ? heroSlides.length : slide.id - 1
              }`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${
                slide.id === heroSlides.length ? 1 : slide.id + 1
              }`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;
