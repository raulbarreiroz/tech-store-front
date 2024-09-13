// src/components/productoForm.js
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { Chip, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createProducto, updateProducto } from "../servicios/api";

const ProductoForm = ({
  open,
  onClose,
  producto,
  modoEdicion,
  categorias,
  formData,
  setFormData,
  categoriasSeleccionadas,
  setProducto,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name !== "nombre" ||
      (name === "nombre" && value?.length <= 49) ||
      (name === "descripcion" && value?.length <= 99)
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (open) {
      if (categoriasSeleccionadas) {
        console.log(categoriasSeleccionadas);
      }
    }
  }, [open, categoriasSeleccionadas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modoEdicion === "INSERTAR") {
      await createProducto({
        ...formData,
        categorias: categoriasSeleccionadas,
      });
    } else if (modoEdicion === "EDITAR") {
      await updateProducto({
        ...formData,
        categorias: categoriasSeleccionadas,
      });
    }

    onClose();
  };

  const handleChipClick = (chip) => {
    const nuevoProducto = { ...producto };
    if (
      producto?.categorias
        ?.map((cat) => cat?.idCategoria)
        ?.includes(chip?.idCategoria)
    ) {
      nuevoProducto.categorias = categoriasSeleccionadas?.filter(
        (cat) => cat?.idCategoria !== chip?.idCategoria
      );
    } else {
      nuevoProducto.categorias = [...categoriasSeleccionadas, chip];
    }
    setProducto(nuevoProducto);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {producto ? "Editar productoo" : "Crear productoo"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText={"El nombre es obligatorio"}
          />
          <TextField
            label="Descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline={true}
          />
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="number"
              inputProps={{
                step: "0.01", // Controla los decimales
              }}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      const base64String = reader.result.split(",")[1]; // Get Base64 string
                      const nuevoProducto = { ...producto };
                      nuevoProducto.imagen = base64String;
                      setProducto(nuevoProducto);
                    };
                  }
                }}
              />
            </div>
          </Box>
          {modoEdicion !== "INSERTAR" && (
            <TextField
              label="Fecha Creacion"
              name="fechaCreacion"
              value={formData.fechaCreacion}
              onChange={handleChange}
              fullWidth
              disabled={true}
              margin="normal"
            />
          )}
          <div style={{ margin: "1vh 0" }}></div>
          <Typography
            style={{
              borderTop: "1px solid lightgrey",
              padding: "1vh 0",
            }}
          >
            Seleccione las características del producto
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {categorias?.map((cat, i) => {
              return (
                <Chip
                  label={cat?.nombre}
                  key={cat?.idCategoria}
                  onClick={() => handleChipClick(cat)}
                  color={
                    producto?.categorias
                      ?.map((cat) => cat?.idCategoria)
                      .includes(cat?.idCategoria)
                      ? "success"
                      : "default"
                  }
                  icon={
                    producto?.categorias
                      ?.map((cat) => cat?.idCategoria)
                      .includes(cat?.idCategoria) ? (
                      <CheckCircleIcon />
                    ) : undefined
                  }
                  clickable
                  style={{ margin: "0.1vh 0.1vw" }}
                ></Chip>
              );
            })}
          </Stack>
          <DialogActions>
            <Button
              type="submit"
              color="primary"
              disabled={formData?.nombre?.trim() === "" ? true : false}
              onClick={handleSubmit}
            >
              {modoEdicion === "INSERTAR" ? "Guardar" : "Editar"}
            </Button>
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductoForm;
