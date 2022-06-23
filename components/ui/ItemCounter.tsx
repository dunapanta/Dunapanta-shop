import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";

interface Props {}

export const ItemCounter: FC<Props> = () => {
  return (
    <Box display="flex" alignItems="center">
      {/* Remove Button */}
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ width: 40, textAlign: "center" }}>1</Typography>
      {/* Add Button */}
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
