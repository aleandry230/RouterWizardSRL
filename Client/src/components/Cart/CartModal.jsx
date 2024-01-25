import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const CartModal = ({ totalAmount }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ibanNumber = "IT74Z0200881910000104793653";

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} color="primary" fullWidth>
        Acquista ora
      </Button>

      <Modal isOpen={isOpen} placement="center" onClose={onClose}>
        <ModalContent>
          <ModalHeader className="text-2xl font-bold text-center">
            Checkout
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-5 text-lg mb-4">
              <p className="mb-2">
                Il totale da pagare per il tuo ordine è:{" "}
                <strong>€{totalAmount.toFixed(2)}</strong>
              </p>
              <div>
                <p className="text-sm text-gray-600">
                  Per completare l'ordine, effettua il bonifico utilizzando il
                  seguente IBAN:
                </p>
                <p className="text-lg font-bold">{ibanNumber}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Come beneficiario inserisci:
                </p>
                <p className="text-lg font-bold">Router Wizards</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" variant="light" onClick={onClose} fullWidth>
              Chiudi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CartModal;
