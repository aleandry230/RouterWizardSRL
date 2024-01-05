import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

export default function Footbar() {
  return (
    <footer className="bg-[#040F0F] py-10">
      <div className="mx-auto w-4/5 p-4 py-6 lg:py-8">
        <div className="w-full md:justify-center">
          <div className="md:flex md:justify-center">
            <div className="mb-6 md:mb-0">
              <span className="text-center text-2xl font-semibold text-white flex justify-center">
                Azienda agricola Bianco
              </span>
            </div>
            <div className="w-1/3"></div>
            <div className="flex flex-col gap-2 sm:gap-10 sm:flex-row items-center justify-center">
              <Link
                to="/"
                className=" text-sm font-semibold text-white uppercase dark:text-white"
              >
                Home
              </Link>
              <Link
                to="/prodotti"
                className="text-sm font-semibold text-white uppercase dark:text-white"
              >
                Prodotti
              </Link>
              <Link
                to="/azienda"
                className="text-sm font-semibold sm: mx-2 text-white uppercase dark:text-white"
              >
                Azienda
              </Link>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-10">
          <span className="flex flex-col sm:flex-row gap-5 text-sm text-gray-400 sm:text-center dark:text-gray-400">
            Copyright © 2023 Azienda agricola Bianco
            <p className="font-semibold text-white">P.IVA 02655120810</p>
            <p className="font-semibold text-white">
              Via Cavour 117, Partanna (TP)
            </p>
          </span>
          <div className="text-white flex flex-row my-4 gap-5 justify-center items-center sm:mt-0">
            <Link
              to="https://www.instagram.com/azienda_agricola_bianco/"
              target="blank"
            >
              <InstagramIcon sx={{ fontSize: 20 }} />
            </Link>

            <Link
              to="https://www.facebook.com/Azienda.agricola.Bianco/"
              target="blank"
            >
              <FacebookIcon sx={{ fontSize: 20 }} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
