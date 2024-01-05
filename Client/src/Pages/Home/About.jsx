import React from "react";
import { Button, Link } from "@nextui-org/react";
import Uliveta from "../../assets/Uliveta.jpg";
import Olive from "../../assets/Olive.jpg";

export default function About() {
  return (
    <div className="bg-white">
      <div className="w-full flex flex-col md:flex-row">
        <div className=" aspect-square md:aspect-video md:w-1/2">
          <img className="object-cover w-full h-full" src={Olive} alt="" />
        </div>
        <div className="aspect-video w-full md:w-1/2 bg-[#2D3A3A] flex flex-col gap-5 justify-center items-center md:items-start py-10 px-10 lg:py-32 lg:px-24">
          <h1 className="text-primary text-2xl lg:text-4xl font-bold text-center md:text-left">
            Una gemma siciliana
          </h1>
          <p className="text-white text-base lg:text-lg w-full text-center md:text-left">
            Le nostre olive Nocellara del Belice, un tesoro unico della Valle
            del Belice, sono coltivate con passione sotto il caldo sole
            mediterraneo, regalando un mondo di sapori intensi e fragranze
            avvolgenti che si trovano solo in questa straordinaria regione.
          </p>
          <Button
            as={Link}
            href="/prodotti"
            color="primary"
            size="lg"
            className="w-full lg:w-2/5"
          >
            Esplora Ora
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col-reverse md:flex-row">
        <div className="aspect-video w-full md:w-1/2 bg-[#2D3A3A] flex flex-col gap-5 justify-center items-center md:items-start py-10 px-10 lg:py-32 lg:px-24">
          <h1 className="text-primary text-2xl lg:text-4xl font-bold text-center md:text-left">
            Il cuore della Sicilia nei nostri campi
          </h1>
          <p className="text-white text-base lg:text-lg w-full text-center md:text-left">
            Nei campi della nostra azienda, la passione per la terra e il
            rispetto per l'ambiente si fondono in un connubio armonioso. Ogni
            oliva è un piccolo scrigno di sapori, portando con sé l'essenza di
            un territorio ricco di storia e tradizione.
          </p>
        </div>
        <div className=" aspect-square md:aspect-video md:w-1/2">
          <img className="object-cover w-full h-full" src={Uliveta} alt="" />
        </div>
      </div>
    </div>
  );
}
