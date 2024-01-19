import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function Hero() {
  return (
    <div className="h-auto md:h-screen flex font-inter p-10">
      <div className="mx-auto max-w-screen-xl h-auto font-inter flex flex-col md:flex-row sm:items-center md:gap-5">
        <div className="w-full md:w-1/2 relative">
          <img
            src="https://www.cisco.com/content/dam/cisco-cdc/site/us/en/images/networking/nexus9000-switching-nx9364gx2a-530x280.png"
            className="w-full h-full md:w-3/4 md:max-w-md hidden md:flex bottom-0 left-0"
            alt="Rotated Image"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 flex flex-col justify-center items-left gap-5">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-semibold w-full md:w-5/6">
            Tecnologia
            <b className="text-primary"> magica</b> all'istante.
          </h1>

          <p className="text-lg md:text-2xl w-full md:w-5/6">
            Soluzioni tecnologiche all'avanguardia a portata di clic.
          </p>
          <Button
            as={Link}
            href="/prodotti"
            color="primary"
            size="lg"
            className="w-full md:w-1/3"
          >
            Esplora Ora
          </Button>
        </div>
      </div>
    </div>
  );
}
