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
  modoEdicion,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  setActualizarCategorias,
  setMostrarDialogoCarga,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name !== "nombre" ||
      (name === "nombre" && value?.length <= 49) ||
      (name === "descripcion" && value?.length <= 99)
    ) {
      setCategoriaSeleccionada({
        ...categoriaSeleccionada,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    setMostrarDialogoCarga();
    e.preventDefault();
    if (modoEdicion === "INSERTAR") {
      await createCategoria(categoriaSeleccionada);
    } else if (modoEdicion === "EDITAR") {
      await updateCategoria(categoriaSeleccionada);
    }
    onClose();
    setActualizarCategorias(true);
  };

  useEffect(() => {
    console.log("categoriaSeleccionada");
    console.log(categoriaSeleccionada);
  }, [categoriaSeleccionada]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {modoEdicion ? "Editar categoria" : "Crear categoria"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="nombre"
            value={categoriaSeleccionada.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText={"El nombre es obligatorio"}
          />
          <TextField
            label="Descripcion"
            name="descripcion"
            value={categoriaSeleccionada.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline={true}
          />
          {modoEdicion !== "INSERTAR" && (
            <TextField
              label="Fecha Creacion"
              name="fechaCreacion"
              value={categoriaSeleccionada.fechaCreacion}
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
              disabled={
                categoriaSeleccionada?.nombre?.trim() === "" ? true : false
              }
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
