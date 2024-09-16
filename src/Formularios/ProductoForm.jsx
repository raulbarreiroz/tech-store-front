// src/components/productoSeleccionadoForm.js
import React, { useRef, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Chip, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createProducto, updateProducto } from "../servicios/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import AddIcon from "@mui/icons-material/Add";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

const ProductoForm = ({
  open,
  onClose,
  modoEdicion,
  categorias,
  productoSeleccionado,
  setProductoSeleccionado,
  setMostrarDialogoCarga,
  setActualizarProductos,
}) => {
  useEffect(() => {
    console.log("producto seleccionado");
    console.log(productoSeleccionado);
  }, [productoSeleccionado]);

  const REGEXDECIMAL = /^(0|[1-9]\d*)(\.\d+)?$/;
  const REGEXINTEGER = /^[1-9]\d*|0$/;

  const imagenInputRef = useRef(undefined);
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name !== "nombre" ||
      (name === "nombre" && value?.length <= 49) ||
      (name === "descripcion" && value?.length <= 99)
    ) {
      setProductoSeleccionado({
        ...productoSeleccionado,
        [name]: name === "precio" || name === "cantidad" ? value.trim() : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    setMostrarDialogoCarga(true);
    e.preventDefault();
    if (modoEdicion === "INSERTAR") {
      await createProducto({
        ...productoSeleccionado,
      });
    } else if (modoEdicion === "EDITAR") {
      await updateProducto({
        ...productoSeleccionado,
      });
    }

    onClose();
    setActualizarProductos(true);
  };

  const handleChipClick = (chip) => {
    const antiguoproductoSeleccionado = { ...productoSeleccionado };

    let nuevasCategorias = antiguoproductoSeleccionado?.categorias || [];
    if (
      antiguoproductoSeleccionado?.categorias
        ?.map((cat) => cat?.idCategoria)
        ?.includes(chip?.idCategoria)
    ) {
      nuevasCategorias = antiguoproductoSeleccionado?.categorias?.filter(
        (cat) => cat?.idCategoria !== chip?.idCategoria
      );
    } else {
      nuevasCategorias = [...antiguoproductoSeleccionado?.categorias, chip];
    }
    setProductoSeleccionado({
      ...antiguoproductoSeleccionado,
      categorias: nuevasCategorias,
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {productoSeleccionado
          ? "Editar productoSeleccionadoo"
          : "Crear productoSeleccionadoo"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            name="nombre"
            value={productoSeleccionado?.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {!productoSeleccionado?.nombre && (
            <Typography style={{ marginTop: "-8px", color: "red" }}>
              Debe ingresar un nombre
            </Typography>
          )}
          <TextField
            label="Descripcion"
            name="descripcion"
            value={productoSeleccionado?.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline={true}
          />
          <Box display="flex" gap={2} alignItems="center">
            <div style={{ width: "50%" }}>
              <TextField
                label="Precio (en dólares)"
                name="precio"
                value={productoSeleccionado?.precio}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography
                style={{
                  fontSize: "small",
                  marginTop: "-8px",
                  color: "red",
                  visibility: REGEXDECIMAL.test(productoSeleccionado?.precio)
                    ? "hidden"
                    : "visible",
                }}
              >
                Debe ingresar una cantidad mayor a 0, permite decimal
              </Typography>
            </div>
            <div style={{ width: "50%" }}>
              <TextField
                label="Cantidad"
                name="cantidad"
                value={productoSeleccionado?.cantidad}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
              <Typography
                style={{
                  fontSize: "small",
                  marginTop: "-8px",
                  color: "red",
                  visibility: REGEXINTEGER.test(productoSeleccionado?.cantidad)
                    ? "hidden"
                    : "visible",
                }}
              >
                Debe ingresar una cantidad mayor a 0, no permite decimal
              </Typography>
            </div>
          </Box>
          <Typography
            style={{
              borderTop: "1px solid lightgrey",
              padding: "1vh 0",
            }}
          ></Typography>
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={(e) => {
                  imagenInputRef.current.click();
                }}
              >
                {productoSeleccionado?.imagenUrl ? <EditIcon /> : <AddIcon />}
              </IconButton>

              <IconButton
                disabled={productoSeleccionado?.imagenUrl ? false : true}
                onClick={(e) => {
                  setProductoSeleccionado({
                    ...productoSeleccionado,
                    imagenUrl: undefined,
                    imagen: undefined,
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "none",
                }}
              >
                <input
                  ref={imagenInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        const nuevoproductoSeleccionado = {
                          ...productoSeleccionado,
                        };
                        nuevoproductoSeleccionado.imagen = file;
                        nuevoproductoSeleccionado.imagenUrl =
                          URL.createObjectURL(file);
                        setProductoSeleccionado(nuevoproductoSeleccionado);
                      };
                    }
                  }}
                />
              </div>
              <div
                style={{
                  width: "100px",
                  height: "79px",
                }}
              >
                {productoSeleccionado?.imagenUrl ? (
                  <img
                    src={productoSeleccionado?.imagenUrl}
                    alt={`${productoSeleccionado.nombre}`}
                    style={{ width: "100px", height: "100%" }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      height: "79px",
                    }}
                  >
                    <ImageNotSupportedIcon
                      fontSize="large"
                      style={{ width: "100px", height: "79px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {modoEdicion !== "INSERTAR" && (
            <TextField
              label="Fecha Creacion"
              name="fechaCreacion"
              value={productoSeleccionado?.fechaCreacion}
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
                    productoSeleccionado?.categorias
                      ?.map((cat) => cat?.idCategoria)
                      .includes(cat?.idCategoria)
                      ? "success"
                      : "default"
                  }
                  icon={
                    productoSeleccionado?.categorias
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
              disabled={
                productoSeleccionado?.nombre?.trim() === "" ||
                !REGEXDECIMAL.test(productoSeleccionado?.precio) ||
                !REGEXINTEGER.test(productoSeleccionado?.cantidad)
                  ? true
                  : false
              }
              onClick={handleSubmit}
            >
              {modoEdicion === "INSERTAR" ? "Guardar" : "Editar"}
            </Button>
            <Button
              onClick={(e) => {
                onClose();
              }}
              color="secondary"
            >
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductoForm;
