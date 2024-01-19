import React from "react";
import image1 from "../../assets/Olive.jpg";
import image2 from "../../assets/AlberoOlive.jpg";

export default function Presentation() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Descrizione di Router Wizards
          </h2>
          <p className="mb-4">
            Router Wizards è il principale portale dedicato alle reti e alle
            comunicazioni, offrendo un'ampia gamma di prodotti attraverso un
            innovativo e-commerce. Il catalogo include router, switch, modem,
            accessori di rete, cavi e altro ancora. L'obiettivo è rivoluzionare
            l'esperienza di acquisto, trasformandola in un viaggio informativo.
            La piattaforma è progettata per soddisfare le esigenze di acquirenti
            di ogni livello di competenza, fornendo non solo prodotti di alta
            qualità, ma anche informazioni approfondite per prendere decisioni
            consapevoli.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/126864590/original/0ccae38dfd5636d13f69737229ee9e972a2e4942/configure-and-troubleshoot-your-cisco-routers-and-switches.png"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://assets.techrepublic.com/uploads/2022/09/configure-dhcp-server-rocky-linux.jpeg"
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
}
