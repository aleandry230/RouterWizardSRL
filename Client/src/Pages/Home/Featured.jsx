import React from "react";
import FeaturedProducts from "../../Components/Home/FeaturedProducts";

export default function Featured() {
  return (
    <div className="bg-white py-20">
      <div className="py-8 px-4 mx-auto max-w-screen-xl h-auto font-inter flex flex-col gap-16">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Prodotti in evidenza
        </h1>
        <FeaturedProducts />
      </div>
    </div>
  );
}
