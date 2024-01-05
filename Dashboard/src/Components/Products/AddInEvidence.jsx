import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function AddInEvidence() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  useEffect(() => {
    axios.get(API_URL + "Products/GetAllNotInEvidence").then((res) => {
      setProducts(res.data);
    });
  }, []);

  function addInEvidence() {
    axios
      .post(API_URL + "Products/AddInEvidence", {
        id: selectedProduct,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Prodotto aggiunto con successo");
          location.reload();
        }
      });
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<AddRoundedIcon />}
      >
        Prodotto in evidenza
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Aggiungi prodotto in evidenza
              </ModalHeader>
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Chiudi
                </Button>
                <Button color="primary" onClick={addInEvidence}>
                  Aggiungi prodotto
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
