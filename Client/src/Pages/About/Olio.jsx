import React from "react";
import image1 from "../../assets/boilerOlio.jpg";
import image2 from "../../assets/RamoOlive.jpg";

export default function Olio() {
  return (
    <section>
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl flex flex-col-reverse lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://www.pipeline.it/prodotti-e-servizi/wp-content/uploads/sites/4/2022/05/server-aziendale.jpg"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://i0.wp.com/www.linkiesta.it/wp-content/uploads/2020/02/13b3e2c6-d70f-4211-b395-fcfbb02f075e_large.jpg?fit=1200%2C800&ssl=1"
            alt="office content 2"
          />
        </div>
        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Trasparenza e impegno di Router Wizards
          </h2>
          <p className="mb-4">
            La trasparenza è al centro della missione di Router Wizards. Ogni
            prodotto è accompagnato da recensioni dettagliate fornite dagli
            utenti, garantendo che ogni acquisto risponda alle aspettative. La
            piattaforma si impegna a tenere gli acquirenti informati sulle
            ultime tendenze e innovazioni, fornendo guide dettagliate,
            spiegazioni chiare e raccomandazioni esperte. L'obiettivo finale è
            offrire un'esperienza di acquisto per prodotti di reti e
            comunicazioni che sia semplice, istruttiva e soddisfacente.
          </p>
        </div>
      </div>
    </section>
  );
}
