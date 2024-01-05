import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../API/API";
import { useTheme } from "next-themes";
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
  Switch,
} from "@nextui-org/react";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = ["Log Out"];

  function themeChange() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  function deleteAllCookies() {
    document.cookie =
      "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Cookie connect.sid eliminato");
  }

  function handleLogOut() {
    axios
      .get(API_URL + "Auth/Logout", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          deleteAllCookies();
          window.location.href = "/";
        }
      });
  }

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">Azienda agricola Bianco</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">Azienda agricola Bianco</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            variant="light"
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            disableRipple
            startContent={<Inventory2OutlinedIcon />}
            as={Link}
            href="/"
          >
            Prodotti
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            variant="light"
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            disableRipple
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Switch
            size="sm"
            onClick={themeChange}
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <DarkModeRoundedIcon
                  className={className}
                  sx={{ fontSize: "15px" }}
                />
              ) : (
                <WbSunnyRoundedIcon
                  className={className}
                  sx={{ fontSize: "15px" }}
                />
              )
            }
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 1
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              onClick={handleLogOut}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
