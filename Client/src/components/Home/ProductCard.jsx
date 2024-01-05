import React from "react";
import { Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { API_URL } from "../../API/API";

export default function ProductCard({ data }) {
  return (
    <Link to={`/prodotti/product=${data.id}`} state={{ data: data }}>
      <div className="relative m-5 flex w-72 max-w-xs flex-col px-5">
        <div className="relative flex h-80 bg-[#F6F6F6]">
          <img
            className="object-cover w-full"
            src={API_URL + "uploads/" + data.path}
            alt=""
          />
          <div className="absolute left-5 top-5">
            {data.percentuale > 0 && (
              <Chip color="secondary" radius="md">
                -{data.percentuale}%
              </Chip>
            )}
          </div>
        </div>
        <div className="mt-4 pb-5 px-5">
          <h5 className="text-md tracking-tight font-semibold">{data.title}</h5>
          <div className=" flex items-center justify-between">
            <p className="flex flex-row gap-5">
              {data.percentuale > 0 ? (
                <>
                  <span className="text-md font-bold">
                    €{data.price - (data.price * data.percentuale) / 100}
                  </span>
                  <span className="text-md  line-through">€{data.price}</span>
                </>
              ) : (
                <span className="text-md font-bold">€{data.price}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
