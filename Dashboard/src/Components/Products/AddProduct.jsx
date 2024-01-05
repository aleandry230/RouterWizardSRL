import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
  Avatar,
} from "@nextui-org/react";
import { Alert } from "@mui/material";
import axios from "axios";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { API_URL } from "../../API/API";

export default function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileInputRef = useRef(null);

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    // Limit the number of selected files to 5
    const selectedFilesArray = Array.from(selectedFiles).slice(0, 5);

    // Convert each file to an object with additional properties if needed
    const photoObjects = selectedFilesArray.map((file) => ({
      file,
      // You can add more properties here, such as a caption or other metadata
    }));

    setPhotos((prevPhotos) => [...prevPhotos, ...photoObjects]);
  };

  const handleRemovePhoto = (index) => {
    // Rimuovi la foto corrispondente all'indice dall'array
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleAddProduct = async () => {
    const formDataToSend = new FormData();

    formDataToSend.append("title", productData.title);
    formDataToSend.append("description", productData.description);
    formDataToSend.append("price", productData.price);
    photos.forEach((photo, index) => {
      formDataToSend.append(`photo${index + 1}`, photo.file);
    });

    console.log(formDataToSend.forEach((value) => console.log(value)));
    if (
      productData.title !== "" ||
      productData.description !== "" ||
      productData.price !== "" ||
      photos.length > 0
    ) {
      try {
        const response = await axios.post(
          API_URL + "Products/AddProduct",
          formDataToSend
        );
        if (response.status === 200) {
          console.log("Prodotto aggiunto con successo");
          location.reload();
        }
      } catch (error) {
        console.error("Errore durante l'aggiunta del prodotto", error);
      }
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<AddRoundedIcon />}
      >
        Aggiungi prodotto
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Aggiungi prodotto
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              type="text"
              label="Nome prodotto"
              variant="bordered"
              onChange={(e) =>
                setProductData({ ...productData, title: e.target.value })
              }
            />
            <Textarea
              label="Descrizione"
              placeholder="Inserisci una descrizione"
              variant="bordered"
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
            <Input
              autoFocus
              type="number"
              label="Prezzo"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">€</span>
                </div>
              }
              variant="bordered"
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
            />
            <div className="flex flex-col gap-10">
              <Alert variant="outlined" severity="warning">
                Dimensioni consigliate per l'immagine: <br /> 500x500 pixel.
              </Alert>
              {photos.map((photo, index) => (
                <div key={index} className="flex flex-row gap-5 items-center">
                  <Avatar
                    isBordered
                    radius="sm"
                    size="lg"
                    src={URL.createObjectURL(photo.file)}
                  />
                  <Button
                    isIconOnly
                    className="bg-red-500 text-white"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <DeleteRoundedIcon />{" "}
                  </Button>
                </div>
              ))}
            </div>
            {photos.length < 5 && (
              <label className="relative inline-flex justify-center items-center bg-primary dark:text-black text-white px-4 py-2 rounded-md cursor-pointer w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e)}
                  className="hidden"
                  multiple
                  ref={fileInputRef}
                />
                <FileUploadRoundedIcon />
                {photos.length === 0 ? (
                  <span>Carica copertina</span>
                ) : (
                  <span>Carica foto {photos.length + "/" + 5}</span>
                )}
              </label>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Chiudi
            </Button>
            <Button color="primary" onPress={handleAddProduct}>
              Aggiungi prodotto
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
