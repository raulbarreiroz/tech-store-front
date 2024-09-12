import React from "react";
import { Chip, Stack, TextField } from "@mui/material";

const ChipSeleccionable = ({ opciones, chipsSeleccionadas, onChange }) => {
  const handleClick = (option) => {
    const newchipsSeleccionadas = chipsSeleccionadas.includes(option)
      ? chipsSeleccionadas.filter((chip) => chip !== option)
      : [...chipsSeleccionadas, option];
  };

  return (
    <div>
      <TextField
        select
        label="categorias"
        selected={{
          multiple: true,
          renderValue: (selected) => (
            <Stack direction="row" spacing={1}>
              {selected?.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Stack>
          ),
        }}
        value={chipsSeleccionadas}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      >
        {opciones?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
    </div>
  );
};

export default ChipSeleccionable;
