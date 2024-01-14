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
            Prodotti offerti da Router Wizards
          </h1>
          <p className="text-white text-base lg:text-lg w-full text-center md:text-left">
            Router Wizards offre una vasta gamma di prodotti per reti e
            comunicazioni, inclusi router avanzati, switch, modem, accessori di
            rete e cavi di alta qualità. Sia che tu sia principiante o esperto,
            forniamo soluzioni di connettività su misura con informazioni
            dettagliate.
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
            Focus sulla sicurezza e innovazione
          </h1>
          <p className="text-white text-base lg:text-lg w-full text-center md:text-left">
            Ci differenziamo per l'attenzione alla sicurezza e all'innovazione,
            offrendo dispositivi conformi alle normative di sicurezza e
            abbracciando le ultime tendenze tecnologiche. Con Router Wizards,
            garantiamo connettività affidabile, sicurezza e tecnologia
            all'avanguardia.
          </p>
        </div>
        <div className=" aspect-square md:aspect-video md:w-1/2">
          <img className="object-cover w-full h-full" src={Uliveta} alt="" />
        </div>
      </div>
    </div>
  );
}
