import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { Helmet } from "react-helmet";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import axios from "axios";
import { API_URL } from "../../API/API";
import CartModal from "../../components/Cart/CartModal";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIds = cart.map((item) => item.id);

    axios
      .post(API_URL + "Ecommerce/GetCartItems", { productIds: cartIds })
      .then((res) => {
        setCartItems(res.data);
        getQuantities(cart);
      });
  }, []);

  useEffect(() => {
    calculateSubTotal(quantities);
  }, [quantities]);

  function getQuantities(cart) {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }

  const updateQuantity = (productId, newQuantity) => {
    const updatedQuantities = { ...quantities, [productId]: newQuantity };
    setQuantities(updatedQuantities);

    // Aggiorna le quantità nel localStorage dopo aver aggiornato il carrello
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartItems.map((item) => ({
          id: item.id,
          quantity: updatedQuantities[item.id] || 1,
        }))
      )
    );
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);

    // Aggiorna le quantità nel localStorage dopo aver rimosso il prodotto
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedCart.map((item) => ({
          id: item.id,
          quantity: quantities[item.id] || 1,
        }))
      )
    );

    location.reload();
  };

  const calculateSubTotal = (updatedQuantities) => {
    let total = 0;
    cartItems.forEach((item) => {
      const quantity = updatedQuantities[item.id] || 1;
      const discountedPrice =
        item.percentuale === 0
          ? item.price
          : item.price - (item.price * item.percentuale) / 100;
      total += discountedPrice * quantity;
    });
    setSubTotal(total);
  };

  const decreaseQuantity = (productId) => {
    const currentQuantity = quantities[productId];
    if (currentQuantity && currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateQuantity(productId, newQuantity);
    }
  };

  const increaseQuantity = (productId) => {
    const currentQuantity = quantities[productId];
    const newQuantity = currentQuantity + 1;
    updateQuantity(productId, newQuantity);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Azienda Agricola Bianco | Carrello</title>
      </Helmet>

      <div className="h-auto md:h-screen w-full">
        <div className="flex flex-col lg:flex-row ">
          <div className="w-full h-auto">
            <div className="p-5 md:p-10">
              {cartItems.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center">
                  <p>Il carrello è vuoto!</p>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex justify-start w-full"
                    >
                      <img
                        src={API_URL + "uploads/" + item.path}
                        alt="product-image"
                        className="w-full h-auto rounded-lg sm:w-40 object-cover"
                      />
                      <div className="mt-4 md:mt-0 flex flex-col justify-between lg:w-full gap-3 sm:ml-5">
                        <div className="flex flex-col gap-1">
                          <h2 className="text-lg font-semibold text-gray-900">
                            {item.title}
                          </h2>

                          <div className="text-sm text-gray-600">
                            {item.percentuale === 0 ? (
                              <p>Prezzo: €{item.price.toFixed(2)}</p>
                            ) : (
                              <>
                                <div className="flex flex-row gap-2">
                                  Prezzo:{" "}
                                  {(
                                    item.price -
                                    (item.price * item.percentuale) / 100
                                  ).toFixed(2)}{" "}
                                  <p className=" line-through">
                                    €{item.price.toFixed(2)}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <Button
                            isIconOnly
                            color="primary"
                            size="sm"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <ArrowBackIosNewRoundedIcon />
                          </Button>
                          <span className="text-lg font-semibold">
                            {quantities[item.id]}
                          </span>
                          <Button
                            isIconOnly
                            color="primary"
                            size="sm"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <ArrowForwardIosRoundedIcon />
                          </Button>
                        </div>
                        <div className="mt-2">
                          <Button
                            className="text-sm text-red-500 hover:underline bg-transparent p-0"
                            onClick={() => removeItem(item.id)}
                          >
                            Rimuovi
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-5 md:p-10">
            <div className="h-auto rounded-lg border bg-white p-6 shadow-md md:mt-0 w-full sticky top-24">
              <h2 className="text-xl font-bold">Dettagli Ordine</h2>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.title} - €
                    {item.percentuale === 0
                      ? item.price.toFixed(2)
                      : (
                          item.price -
                          (item.price * item.percentuale) / 100
                        ).toFixed(2)}{" "}
                    x {quantities[item.id] || 1}
                  </li>
                ))}
              </ul>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotale</p>
                <p className="text-gray-700">€{subTotal.toFixed(2)}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Totale</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">
                    €{subTotal.toFixed(2)}
                  </p>
                </div>
              </div>
              <CartModal totalAmount={subTotal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
