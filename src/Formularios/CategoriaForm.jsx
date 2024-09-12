// src/components/CategoriaForm.js
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useEffect } from "react";

import { createCategoria, updateCategoria } from "../servicios/api";

const CategoriaForm = ({
  open,
  onClose,
  categoria,
  modoEdicion,
  formData,
  setFormData,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modoEdicion === "INSERTAR") {
      await createCategoria(formData);
    } else if (modoEdicion === "EDITAR") {
      await updateCategoria(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {categoria ? "Editar categoria" : "Crear categoria"}
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

export default CategoriaForm;
