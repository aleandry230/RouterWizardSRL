import React from "react";
import { Helmet } from "react-helmet";
import ProductListBody from "./ProductListBody";
import banner from "../../assets/Products.jpg";

export default function ProductList() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Router Wizards Srl | Prodotti</title>
      </Helmet>
      <div className="h-auto bg-white">
        <div
          className="mx-auto max-w-screen-lg font-inter h-80 bg-no-repeat justify-center items-center"
          style={{
            backgroundImage: `url(https://osatech.ch/wp-content/uploads/tipi-di-server.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="blurred flex flex-col justify-center items-center gap-3 h-full">
            <h1 className="text-5xl font-bold text-white">Prodotti</h1>
            <p className="text-lg text-white w-3/4 text-center">
              Esplora il nostro catalogo magico di router, switch e accessori
              per trasformare la tua connettività in un'esperienza
              straordinaria.
            </p>
          </div>
        </div>

        <ProductListBody />
      </div>
    </>
  );
}
