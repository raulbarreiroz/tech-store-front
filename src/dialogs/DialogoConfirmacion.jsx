import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { deleteProducto } from "../servicios/api";
import { deleteCategoria } from "../servicios/api";

const DialogConfirmacion = ({
  open,
  handleClose,
  productoSeleccionado,
  seccionEnUso,
  categoriaSeleccionada,
  setMostrarDialogoCarga,
}) => {
  const handleConfirmDelete = (e) => {
    setMostrarDialogoCarga(true);
    e.preventDefault();
    if (seccionEnUso === "PRODUCTOS") {
      deleteProducto(productoSeleccionado);
    } else if (seccionEnUso === "CATEGORIAS") {
      console.log("deleting categoria");
      console.log(categoriaSeleccionada);
      deleteCategoria(categoriaSeleccionada);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Está seguro que quiere eliminar el siguiente registro
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirmDelete} color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmacion;
