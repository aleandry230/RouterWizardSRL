import React from "react";
import { Chip, Button, Tooltip } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function ProductCard({ data }) {
  function removeInEvidence() {
    axios
      .delete(API_URL + "Products/RemoveInEvidence/" + data.id)
      .then((response) => {
        if (response.status === 200) {
          location.reload();
        }
      });
  }
  return (
    <div className="relative m-5 flex w-full max-w-xs flex-col">
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
        <div className="absolute right-5 top-5">
          <Tooltip content={`Rimuovi ${data.title} dall'evidenza`} showArrow>
            <Button
              className="bg-red-500 text-white"
              size="sm"
              radius="md"
              onClick={removeInEvidence}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="mt-4 pb-5">
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
  );
}
