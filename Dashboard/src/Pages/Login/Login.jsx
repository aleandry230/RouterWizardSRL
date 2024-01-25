import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import bg from "../../assets/bg.jpg";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  function handleLogin(e) {
    axios
      .post(
        API_URL + "Auth/Login",
        { email: loginData.email, password: loginData.password },
        { withCredentials: true }
      )
      .then((res) => {
        window.location.href = "/";
      });
  }

  return (
    <section className="relative flex flex-wrap h-screen lg:items-center bg-white">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24 flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-black">Login</h1>
          </div>

          <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div className="flex flex-col gap-5">
              <Input
                type="email"
                label="Email"
                variant="flat"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <Input
                label="Password"
                variant="flat"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <VisibilityOffRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <RemoveRedEyeRoundedIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                className="bg-black text-white"
                size="lg"
                onClick={handleLogin}
                fullWidth
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:flex relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Landing"
          src="https://e0.pxfuel.com/wallpapers/511/257/desktop-wallpaper-computer-networking.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
