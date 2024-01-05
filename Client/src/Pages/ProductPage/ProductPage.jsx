import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import Carousel from "../../Components/ProductPage/Carousel";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { API_URL } from "../../API/API";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ProductPage({ data }) {
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState({});
  const [productImages, setProductImages] = useState([]);

  const uriWithoutSpaces = location.pathname.replace(/\s+/g, "");
  function getIdFromUrl(uriWithoutSpaces) {
    const prefix = "/prodotti/product=";
    const titleWithoutPrefix = uriWithoutSpaces.replace(prefix, "");

    return titleWithoutPrefix;
  }

  useEffect(() => {
    const id = getIdFromUrl(uriWithoutSpaces);
    if (!location.state) {
      console.error("Data is missing in location state");
      axios
        .get(API_URL + `Ecommerce/GetProductById/${id}`)
        .then((response) => {
          setProductData(response.data[0]);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });

      axios
        .get(API_URL + `Ecommerce/GetAllImagesById/${id}`)
        .then((response) => {
          setProductImages(response.data);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
    } else {
      setProductData(location.state.data);
      axios
        .get(API_URL + `Ecommerce/GetAllImagesById/${id}`)
        .then((response) => {
          setProductImages(response.data);
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
    }
  }, []);

  function decreaseQuantity() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  function increaseQuantity() {
    setQuantity(quantity + 1);
  }

  function addToCart() {
    // Recupera l'array corrente dal local storage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verifica se il prodotto è già presente nel carrello
    const existingProductIndex = currentCart.findIndex(
      (item) => item.id === productData.id
    );

    if (existingProductIndex !== -1) {
      // Se il prodotto è già presente, sostituisci completamente l'elemento
      currentCart[existingProductIndex] = {
        id: productData.id,
        quantity: quantity,
      };
    } else {
      // Se il prodotto non è presente, aggiungilo all'array
      currentCart.push({ id: productData.id, quantity: quantity });
    }

    // Salva l'array aggiornato nel local storage
    localStorage.setItem("cart", JSON.stringify(currentCart));
    window.location.reload();
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Azienda Agricola Bianco | {String(productData.title)}</title>
      </Helmet>
      <div className="py-16 px-4 mx-auto max-w-screen-xl h-auto lg:h-screen font-inter flex flex-col gap-16">
        <div className="h-full w-full flex flex-col lg:flex-row gap-16 justify-center items-start ">
          <div className="w-full lg:w-1/2">
            {productImages.length > 0 && <Carousel data={productImages} />}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:flex lg:items-end">
              <div className="w-full">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {productData.title}
                </h1>
                <p className="text-sm text-gray-600 sm:text-medium mt-5">
                  {productData.description}
                </p>

                {productData.percentuale == 0 ? (
                  <p className="flex flex-row gap-5 mt-5">
                    <span className="text-2xl font-bold text-slate-900">
                      €{productData.price}
                    </span>
                  </p>
                ) : (
                  <p className="flex flex-row gap-5 mt-5">
                    <span className="text-2xl font-bold text-slate-900">
                      €
                      {productData.price -
                        (productData.price * productData.percentuale) / 100}
                    </span>
                    <span className="text-xl text-slate-600 line-through">
                      €{productData.price}
                    </span>
                  </p>
                )}

                <div className="mt-10 flex items-start space-y-4 border-t py-4 flex-col md:gap-5">
                  <p>Quantità:</p>
                  <div className="flex flex-row gap-5 justify-center items-center">
                    <Button
                      isIconOnly
                      color="primary"
                      onClick={decreaseQuantity}
                    >
                      <ArrowBackIosNewRoundedIcon />
                    </Button>
                    {quantity}
                    <Button
                      isIconOnly
                      color="primary"
                      onClick={increaseQuantity}
                    >
                      <ArrowForwardIosRoundedIcon />
                    </Button>
                  </div>

                  <Button
                    color="primary"
                    startContent={<ShoppingCartRoundedIcon />}
                    onClick={addToCart}
                    fullWidth
                  >
                    Aggiungi al carrello
                  </Button>
                </div>
                <div className="lg:col-span-3">
                  <Accordion>
                    <AccordionItem
                      className="my-2"
                      key="2"
                      aria-label="Spedizioni"
                      title="Spedizioni"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionItem>
                    <AccordionItem
                      className="my-2"
                      key="1"
                      aria-label="Pagamenti"
                      title="Pagamenti"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
