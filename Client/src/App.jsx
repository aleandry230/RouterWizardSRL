import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductPage from "./Pages/ProductPage/ProductPage";
import ProductList from "./Pages/ProductList/ProductList";
import Nav from "./components/global/Nav";
import Footbar from "./components/global/Footbar";
import ScrollToTop from "./components/global/ScrollToTop";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Error404 from "./Pages/Errors/404/Error404";

export default function App() {
  return (
    <>
      <Nav />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/prodotti" element={<ProductList />} />
        <Route exact path="/prodotti/:id" element={<ProductPage />} />
        <Route exact path="/azienda" element={<About />} />
        <Route exact path="/carrello" element={<Cart />} />
        <Route exact path="*" element={<Error404 />} />
      </Routes>
      <Footbar />
    </>
  );
}
