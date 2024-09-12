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

const Categorias = ({
  setCategoriaSeleccionada,
  handleOpenForm,
  setModoEdicion,
  categorias,
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
      <TableContainer component={Paper}>
        <Table style={{ border: "1px solid grey" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Fecha Creacion</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias?.map((categoria, i) => {
              const date = new Date(categoria.fechaCreacion);
              const year = date?.getFullYear().toString();
              const month = (date?.getMonth() + 1)?.toString();
              const day = date?.getDate()?.toString();
              const fecha = `${year}/${
                month.length === 1 ? "0" + month : month
              }/${day.length === 1 ? "0" + day : day}`;
              return (
                <TableRow>
                  <TableCell>{categoria.idCategoria}</TableCell>
                  <TableCell>{categoria.nombre}</TableCell>
                  <TableCell>{categoria.descripcion || "-"}</TableCell>
                  <TableCell>{fecha}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => {
                        setModoEdicion("EDITAR");
                        setCategoriaSeleccionada({
                          idCategoria: categoria?.idCategoria,
                          nombre: categoria.nombre,
                          descripcion: categoria.descripcion,
                          fechaCreacion: fecha,
                        });                        
                        handleOpenForm(categoria);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => {
                        setCategoriaSeleccionada({
                          idCategoria: categoria?.idCategoria,
                          nombre: categoria.nombre,
                          descripcion: categoria.descripcion,
                          fechaCreacion: fecha,
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
    </div>
  );
};

export default Categorias;
