import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Productos = ({
  setProductoSeleccionado,
  handleOpenForm,
  setModoEdicion,
  productos,
  setMostrarDialogoConfirmacion,
}) => {
  return (
    <div
      style={{
        height: "calc(100vh - 20vh)",
        width: "calc(100vw - 2vw)",
        padding: "1vh 1vw",
        overflowY: "scroll",
      }}
    >
      {productos?.length >= 0 && (
        <TableContainer component={Paper}>
          <Table style={{ border: "1px solid grey" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Descripcion</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Imagen</TableCell>
                <TableCell align="center">Fecha Creacion</TableCell>
                <TableCell align="center">Editar</TableCell>
                <TableCell align="center">Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto, i) => {
                const date = new Date(producto.fechaCreacion);
                const year = date?.getFullYear().toString();
                const month = (date?.getMonth() + 1)?.toString();
                const day = date?.getDate()?.toString();
                const fecha = `${year}/${
                  month.length === 1 ? "0" + month : month
                }/${day.length === 1 ? "0" + day : day}`;

                const categorias = producto?.categorias?.map(
                  (categoria) => categoria?.nombre_categoria
                );
                return (
                  <TableRow>
                    <TableCell align="center">{producto.idProducto}</TableCell>
                    <TableCell align="center">{producto.nombre}</TableCell>
                    <TableCell align="center">
                      {producto.descripcion || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {producto.precio || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {producto?.imagen ? (
                        <img
                          src={`data:image/jpeg;base64,${producto.imagen}`}
                          alt={`${producto.imagen}`}
                          style={{ width: "100px", height: "auto" }}
                        />
                      ) : (
                        <>-</>
                      )}
                    </TableCell>
                    <TableCell align="center">{fecha}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          setModoEdicion("EDITAR");
                          setProductoSeleccionado({
                            idProducto: producto?.idProducto,
                            nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            fechaCreacion: fecha,
                            categorias: producto?.categorias,
                          });
                          handleOpenForm(producto);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          setProductoSeleccionado({
                            idProducto: producto?.idProducto,
                            nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            fechaCreacion: fecha,
                            categorias: producto?.categorias,
                          });
                          setMostrarDialogoConfirmacion(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Productos;
