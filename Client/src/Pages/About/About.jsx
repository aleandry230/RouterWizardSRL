import React from "react";
import { Helmet } from "react-helmet";
import Presentation from "./Presentation";
import Olio from "./Olio";

export default function About() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Router Wizards Srl | Azienda</title>
      </Helmet>
      <Presentation />
      <Olio />
    </>
  );
}
