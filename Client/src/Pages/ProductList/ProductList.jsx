import React from "react";
import { Helmet } from "react-helmet";
import ProductListBody from "./ProductListBody";
import banner from "../../assets/Products.jpg";

export default function ProductList() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Azienda Agricola Bianco | Prodotti</title>
      </Helmet>
      <div className="h-auto bg-white">
        <div
          className="mx-auto max-w-screen-lg font-inter h-80 bg-no-repeat justify-center items-center"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="blurred flex flex-col justify-center items-center gap-3 h-full">
            <h1 className="text-5xl font-bold text-white">Prodotti</h1>
            <p className="text-lg text-white w-3/4 text-center">
              Scopri l'essenza della Sicilia nei nostri oli Nocellara del Belice
            </p>
          </div>
        </div>

        <ProductListBody />
      </div>
    </>
  );
}
