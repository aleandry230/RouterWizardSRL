import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Tooltip,
  Avatar,
  Tabs,
  Tab,
} from "@nextui-org/react";
import Alert from "@mui/material/Alert";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function EditProduct({ data }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState("data");

  return (
    <>
      <Tooltip
        color="warning"
        className="text-white"
        content="Modifica prodotto"
        showArrow
      >
        <Button
          isIconOnly
          onPress={onOpen}
          color="warning"
          size="sm"
          radius="lg"
        >
          <EditRoundedIcon className="text-white" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modifica: {data.title}
              </ModalHeader>
              <ModalBody>
                <Tabs
                  radius="lg"
                  color="primary"
                  variant="bordered"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab
                    key="data"
                    title={
                      <div className="flex items-center space-x-2">
                        <EditRoundedIcon />
                        <span>Dati</span>
                      </div>
                    }
                  >
                    <EditData data={data} />
                  </Tab>

                  <Tab
                    key="photo"
                    title={
                      <div className="flex items-center space-x-2">
                        <PhotoLibraryRoundedIcon />
                        <span>Foto</span>
                      </div>
                    }
                  >
                    <EditPhoto data={data} />
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Chiudi
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function EditData({ data }) {
  const [productData, setProductData] = useState({
    title: data.title,
    description: data.description,
    price: data.price,
    percentuale: data.percentuale,
  });
  const [InputError, setInputError] = useState({
    status: null,
    message: null,
  });

  function handleEditProduct() {
    if (productData.percentuale > 100 || productData.percentuale < 0) {
      setInputError({
        ...InputError,
        status: "error",
        message: "Inserire un valore dello sconto compreso tra 0 e 100",
      });
    } else {
      axios
        .put(API_URL + "Products/UpdateProduct", {
          title: productData.title,
          description: productData.description,
          price: productData.price,
          percentuale: productData.percentuale,
          id: data.id,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("Prodotto aggiornato con successo");
            location.reload();
          }
        });
    }
  }
  return (
    <div className="flex flex-col gap-5">
      {InputError.status === "error" && (
        <Alert variant="outlined" severity="error">
          {InputError.message}
        </Alert>
      )}
      <Input
        type="text"
        label="Titolo"
        defaultValue={data.title}
        onChange={(e) =>
          setProductData({
            ...productData,
            title: e.target.value,
          })
        }
        variant="bordered"
      />
      <Textarea
        label="Descrizione"
        placeholder="Inserisci una descrizione"
        variant="bordered"
        defaultValue={data.description}
        onChange={(e) =>
          setProductData({
            ...productData,
            description: e.target.value,
          })
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
        defaultValue={data.price}
        onChange={(e) =>
          setProductData({
            ...productData,
            price: e.target.value,
          })
        }
      />
      {data.percentuale != 0 && (
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
          defaultValue={data.percentuale}
          onChange={(e) =>
            setProductData({
              ...productData,
              percentuale: e.target.value,
            })
          }
        />
      )}

      <Button color="primary" onClick={handleEditProduct}>
        Salva dati
      </Button>
    </div>
  );
}

function EditPhoto({ data }) {
  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "Products/GetAllPhotoByProduct/" + data.id)
      .then((res) => {
        setPhotos(res.data);
      });
  }, [data.id]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles).slice(0, 5);
    const photoObjects = selectedFilesArray.map((file) => ({
      file,
      isNew: true, // Nuova foto appena aggiunta
    }));

    setPhotos((prevPhotos) => [...prevPhotos, ...photoObjects]);
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleAddPhoto = async (photo, index) => {
    const formDataNewPhoto = new FormData();
    formDataNewPhoto.append("id", data.id);
    formDataNewPhoto.append("photo", photo.file);

    try {
      await axios.post(API_URL + "Products/AddPhoto", formDataNewPhoto);
      // Rimuovi la marcatura isNew dalla foto appena aggiunta
      const updatedPhotos = [...photos];
      updatedPhotos[index].isNew = false;
      setPhotos(updatedPhotos);
    } catch (error) {
      console.error("Errore durante l'aggiunta della foto", error);
    }
  };

  const handleDeletePhoto = async (photo) => {
    try {
      await axios.delete(
        API_URL + `Products/DeletePhoto/${data.id}&${photo.path}`
      );
      // Dopo aver cancellato dal database, rimuovi la foto dallo stato
      const updatedPhotos = photos.filter((p) => p !== photo);
      setPhotos(updatedPhotos);
    } catch (error) {
      console.error("Errore durante la cancellazione della foto", error);
    }
  };

  const handleSavePhotos = async () => {
    // Upload new photos
    for (const newPhoto of newPhotos) {
      const formDataNewPhoto = new FormData();
      formDataNewPhoto.append("id", data.id);
      formDataNewPhoto.append("photo", newPhoto.file);

      try {
        await axios.post(API_URL + "Products/AddPhoto", formDataNewPhoto);
      } catch (error) {
        console.error("Errore durante l'aggiunta della foto", error);
      }
    }

    // Clear the new photos state
    setNewPhotos([]);
    handleReloadPhotos();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-10">
        {photos.map((photo, index) => (
          <div key={index} className="flex flex-row gap-5 items-center">
            <Avatar
              isBordered
              radius="sm"
              size="lg"
              src={
                photo.path != null
                  ? API_URL + "uploads/" + photo.path
                  : URL.createObjectURL(photo.file)
              }
            />
            {photo.isNew ? (
              <>
                <Button
                  color="primary"
                  onClick={() => handleAddPhoto(photo, index)}
                >
                  Salva
                </Button>
                <Button color="danger" onClick={() => handleRemovePhoto(index)}>
                  Annulla
                </Button>
              </>
            ) : (
              <Button
                isIconOnly
                className="bg-red-500 text-white"
                onClick={() => handleDeletePhoto(photo)}
              >
                <DeleteRoundedIcon />
              </Button>
            )}
          </div>
        ))}
        <Alert variant="outlined" severity="warning">
          Dimensioni consigliate per l'immagine: <br /> 500x500 pixel.
        </Alert>
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
    </div>
  );
}
