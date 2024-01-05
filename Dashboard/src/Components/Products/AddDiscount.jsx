import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Autocomplete,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import DiscountRoundedIcon from "@mui/icons-material/DiscountRounded";
import { API_URL } from "../../API/API";

export default function AddDiscount() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  const [InputError, setInputError] = useState({
    status: null,
    message: null,
  });

  useEffect(() => {
    axios.get(API_URL + "Products/GetAllNoDiscount").then((res) => {
      setProducts(res.data);
    });
  }, []);

  function handleSetDiscount() {
    if (discount > 100 || discount <= 0) {
      setInputError({
        ...InputError,
        status: "error",
        message: "Inserire un valore compreso tra 1 e 100",
      });
    } else {
      axios
        .put(API_URL + "Products/UpdateDiscount", {
          percentuale: discount,
          idProdotto: selectedProduct,
        })
        .then((res) => {
          if (res.status == 200) {
            location.reload();
          }
        });
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<DiscountRoundedIcon />}
      >
        Imposta sconto
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Imposta sconto
              </ModalHeader>
              <ModalBody>
                {InputError.status === "error" && (
                  <Alert variant="outlined" severity="error">
                    {InputError.message}
                  </Alert>
                )}
                <Autocomplete
                  aria-label="Seleziona un prodotto"
                  placeholder="Inserisci il nome di un prodotto"
                  variant="bordered"
                  selectedKey={selectedProduct}
                  onSelectionChange={setSelectedProduct}
                >
                  {products.map((product) => (
                    <AutocompleteItem
                      key={product.id}
                      value={product.id}
                      textValue={product.title}
                    >
                      <div className="flex flex-row gap-5 items-center">
                        <Avatar
                          sizes="lg"
                          radius="sm"
                          isBordered
                          src={API_URL + "uploads/" + product.path}
                        />
                        {product.title}
                      </div>
                    </AutocompleteItem>
                  ))}
                  ;
                </Autocomplete>
                {selectedProduct != null && (
                  <Input
                    autoFocus
                    type="number"
                    label="Sconto"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    }
                    variant="bordered"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Chiudi
                </Button>
                <Button color="primary" onClick={handleSetDiscount}>
                  Imposta sconto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
