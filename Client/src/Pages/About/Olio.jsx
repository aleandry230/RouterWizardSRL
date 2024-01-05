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
            src={image1}
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src={image2}
            alt="office content 2"
          />
        </div>
        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            Impegno per la qualità
          </h2>
          <p className="mb-4">
            La nostra missione è offrire ai nostri clienti un olio extravergine
            di oliva che incarni l'eccellenza del Belice. La qualità è al centro
            di ogni fase della produzione, dalla coltivazione
            all'imbottigliamento. Ogni goccia di olio che portiamo sul mercato è
            il risultato del nostro impegno per offrire un prodotto autentico e
            genuino.
          </p>
        </div>
      </div>
    </section>
  );
}
