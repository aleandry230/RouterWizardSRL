import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge,
} from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "../../API/API";

import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [cart, setCart] = useState([]);

  const menuItems = ["Home", "Prodotti", "Azienda"];

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart"));
    setCart(localStorage.getItem("cart") === null ? 0 : items.length);

    // Chiamata asincrona per verificare i prodotti nel carrello
    async function checkCartItems() {
      try {
        if (items && items.length > 0) {
          // Estrai gli id dei prodotti dal carrello
          const productIds = items.map((item) => item.id);

          // Effettua una chiamata al backend per verificare l'esistenza dei prodotti nel database
          const response = await axios.post(
            API_URL + "Ecommerce/CheckProductsExistence",
            {
              productIds: productIds,
            }
          );

          // Se uno o più prodotti non esistono nel database, azzerare il carrello
          if (response.data.some((exists) => !exists)) {
            localStorage.removeItem("cart");
            setCart([]);
          }
        }
      } catch (error) {
        console.error("Errore durante la verifica del carrello:", error);
      }
    }

    // Chiamata alla funzione di verifica
    checkCartItems();
  }, [cart.length]);

  function generatePath(item) {
    if (item === "Home") return "/";
    else return `/${item.toLowerCase()}`;
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarBrand justify="start">
        <p className="font-extrabold text-inherit">Azienda agricola Bianco</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem>
          <Link className="font-bold" color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="font-bold"
            color="foreground"
            href="/prodotti"
            aria-current="page"
          >
            Prodotti
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-bold" color="foreground" href="/azienda">
            Azienda
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:flex justify-end" justify="end">
        <Badge content={cart} shape="circle" color="danger">
          <Button
            as={Link}
            href="/carrello"
            radius="full"
            isIconOnly
            variant="light"
          >
            <ShoppingCartRoundedIcon />
          </Button>
        </Badge>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-xl"
              color={
                index === 2
                  ? "foreground"
                  : index === menuItems.length - 1
                  ? "foreground"
                  : "foreground"
              }
              href={generatePath(item)}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
