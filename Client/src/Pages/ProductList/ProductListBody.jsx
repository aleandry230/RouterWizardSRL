import React, { useState, useEffect } from "react";
import {
  Slider,
  RadioGroup,
  Radio,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
  Button,
} from "@nextui-org/react";
import ProductCard from "../../Components/Home/ProductCard";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function ProductListBody() {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState("empty");
  const [value, setValue] = useState([0, 200]);

  useEffect(() => {
    axios.get(API_URL + "Products/GetAll").then((res) => {
      setProducts(res.data);
    });
  }, []);

  function filterProducts() {
    axios
      .get(API_URL + "Ecommerce/GetAllFilter", {
        params: {
          order: order,
          min: value[0],
          max: value[1],
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }

  return (
    <div className="py-10 px-5 mx-auto max-w-screen-2xl font-inter flex flex-row gap-16">
      <div className="hidden md:flex flex-col gap-5 w-2/5 lg:w-1/4">
        <div className="flex flex-col gap-5">
          <span className="flex flex-row gap-3">
            <TuneRoundedIcon />
            <h1 className="text-2xl font-semibold">Filtri</h1>
          </span>

          <h2 className="text-lg font-semibold">Filtra per</h2>

          <RadioGroup
            defaultValue="empty"
            value={order}
            onValueChange={setOrder}
          >
            <Radio value="empty">Nulla</Radio>
            <Radio value="ASC">Prezzo crescente</Radio>
            <Radio value="DESC">Prezzo decrescente</Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-lg font-semibold">Prezzo</h2>
          <div className="flex flex-col gap-5">
            {Array.isArray(value) && (
              <div className="flex flex-row gap-5">
                <Input
                  variant="faded"
                  type="number"
                  value={value[0]}
                  aria-label="Prezzo minimo"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                />
                <Input
                  variant="faded"
                  type="number"
                  value={value[1]}
                  aria-label="Prezzo massimo"
                  onChange={(e) => {
                    setValue([value[0], e.target.value]);
                  }}
                  maxValue={200}
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                />
              </div>
            )}
            <Slider
              showTooltip={true}
              formatOptions={{ style: "currency", currency: "EUR" }}
              step={10}
              maxValue={200}
              minValue={0}
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <Button
          color="primary"
          onClick={filterProducts}
          startContent={<SearchRoundedIcon />}
        >
          Cerca
        </Button>
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-semibold">Prodotti</h1>
          <Dropdown showArrow>
            <DropdownTrigger>
              <Button
                variant="light"
                startContent={<TuneRoundedIcon />}
                className="flex md:hidden"
                disableRipple
              >
                Filtri
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="filtri" isReadOnly>
                <h2 className="text-lg font-semibold">Filtra per</h2>

                <RadioGroup
                  defaultValue="empty"
                  value={order}
                  onValueChange={setOrder}
                >
                  <Radio value="empty">Nulla</Radio>
                  <Radio value="ASC">Prezzo crescente</Radio>
                  <Radio value="DESC">Prezzo decrescente</Radio>
                </RadioGroup>
              </DropdownItem>
              <DropdownItem key="filtriprezzo" isReadOnly>
                <div className="flex flex-col justify-center gap-5">
                  <h2 className="text-lg font-semibold">Prezzo</h2>
                  <div className="flex flex-col gap-5">
                    {Array.isArray(value) && (
                      <div className="flex flex-row gap-5">
                        <Input
                          variant="faded"
                          type="number"
                          value={value[0]}
                          aria-label="Prezzo minimo"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                €
                              </span>
                            </div>
                          }
                        />
                        <Input
                          variant="faded"
                          type="number"
                          value={value[1]}
                          aria-label="Prezzo massimo"
                          onChange={(e) => {
                            setValue([value[0], e.target.value]);
                          }}
                          maxValue={200}
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                €
                              </span>
                            </div>
                          }
                        />
                      </div>
                    )}
                    <Slider
                      showTooltip={true}
                      formatOptions={{ style: "currency", currency: "EUR" }}
                      step={10}
                      maxValue={200}
                      minValue={0}
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <Button
                  color="primary"
                  onClick={filterProducts}
                  startContent={<SearchRoundedIcon />}
                  fullWidth
                >
                  Cerca
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-cente md:justify-start h-full">
          {products.length === 0 ? (
            <div className="w-full h-full flex justify-center items-center">
              Nessun prodotto trovato
            </div>
          ) : (
            <>
              {products.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
