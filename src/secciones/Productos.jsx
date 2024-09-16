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
import { ImageNotSupported } from "@mui/icons-material";

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
        height: "calc(77vh)",
        width: "calc(100vw - 2vw)",
        padding: "0 1vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {productos?.length > 0 ? (
        <TableContainer
          sx={{ maxHeight: "100%", border: "1px solid grey" }}
          component={Paper}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Descripcion</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Imagen</TableCell>
                <TableCell align="center">Categorias</TableCell>
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
                return (
                  <TableRow>
                    <TableCell align="center">{producto?.idProducto}</TableCell>
                    <TableCell align="center">{producto?.nombre}</TableCell>
                    <TableCell align="center">
                      {producto.descripcion || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {"$" + producto?.precio || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {producto?.imagenUrl ? (
                        <img
                          src={producto?.imagenUrl}
                          alt={`${producto?.nombre}`}
                          style={{ width: "100px", height: "auto" }}
                        />
                      ) : (
                        <ImageNotSupported />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {producto?.categorias?.length > 0 ? (
                        <ul>
                          {producto?.categorias
                            ?.map((cat) => cat?.nombre)
                            ?.map((nombre) => (
                              <li>{nombre}</li>
                            ))}
                        </ul>
                      ) : (
                        "Sin Categorías"
                      )}
                    </TableCell>
                    <TableCell align="center">{fecha}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          setModoEdicion("EDITAR");
                          setProductoSeleccionado({
                            idProducto: producto?.idProducto,
                            nombre: producto?.nombre,
                            descripcion: producto?.descripcion || "",
                            fechaCreacion: fecha,
                            categorias: producto?.categorias || [],
                            imagenUrl: producto?.imagenUrl || "",
                            precio: producto?.precio || 0,
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
                            nombre: producto?.nombre,
                            descripcion: producto?.descripcion || "",
                            fechaCreacion: fecha,
                            categorias: producto?.categorias || [],
                            imagenUrl: producto?.imagenUrl || "",
                            precio: producto?.precio || 0,
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
      ) : (
        "No existen productos registrados"
      )}
    </div>
  );
};

export default Productos;
