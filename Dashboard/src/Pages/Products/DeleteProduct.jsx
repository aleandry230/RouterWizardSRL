import React from "react";
import { Button, Tooltip } from "@nextui-org/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
export default function DeleteProduct({ data }) {
  return (
    <Tooltip color="danger" content="Elimina prodotto" showArrow>
      <Button isIconOnly color="danger" size="sm" radius="lg">
        <DeleteRoundedIcon />
      </Button>
    </Tooltip>
  );
}
