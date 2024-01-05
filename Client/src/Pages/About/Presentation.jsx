import React from "react";
import image1 from "../../assets/Olive.jpg";
import image2 from "../../assets/AlberoOlive.jpg";

export default function Presentation() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
            La nostra storia
          </h2>
          <p className="mb-4">
            Siamo l'Azienda Agricola Bianco, un'impresa familiare radicata nelle
            colline rigogliose della Valle del Belice, nel cuore della Sicilia.
            La nostra passione per la terra e la produzione di olio extravergine
            di oliva di alta qualità è il motore che guida ogni passo della
            nostra attività.
          </p>
          <p>
            Fondata con l'amore per la tradizione agricola, l'Azienda Agricola
            Bianco nasce dall'unione di generazioni dedite alla coltivazione
            delle ulive. La nostra storia è intrecciata con il territorio, e ci
            impegniamo a preservare e trasmettere le antiche tecniche agricole
            che rendono unico l'olio del Belice.
          </p>
        </div>
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
      </div>
    </section>
  );
}
