import React from "react";
import InEvidence from "../../Components/Products/InEvidence";
import ProductList from "../../Components/Products/ProductList";

export default function Products() {
  return (
    <div className="mx-auto max-w-screen-xl h-auto font-inter flex flex-col md:gap-5 py-16 px-5">
      <div>
        <InEvidence />
      </div>

      <div>
        <ProductList />
      </div>
    </div>
  );
}
