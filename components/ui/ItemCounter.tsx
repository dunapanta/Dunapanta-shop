import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ quantity, onChangeQuantity }) => {
  return (
    <Box display="flex" alignItems="center">
      {/* Remove Button */}
      <IconButton onClick={() => onChangeQuantity(-1)}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: "center" }}>
        {quantity}
      </Typography>
      {/* Add Button */}
      <IconButton onClick={() => onChangeQuantity(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
