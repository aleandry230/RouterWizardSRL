import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function Settings() {
  const [oldData, setOldData] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL + "Auth/GetUserData", { withCredentials: true })
      .then((res) => {
        setOldData(res.data);
      });
  }, []);
  return (
    <div className="mx-auto max-w-screen-xl h-auto font-inter flex flex-col md:gap-5 py-16">
      <div>
        <Input label="Email" value={oldData.mail} />
        <Input label="Email" value={oldData.nome} />
        <Input label="Email" value={oldData.cognome} />
      </div>
    </div>
  );
}
