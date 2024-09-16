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
        height: "calc(77vh)",
        width: "calc(100vw - 2vw)",
        padding: "1vh 1vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {categorias?.length > 0 ? (
        <TableContainer
          sx={{ maxHeight: "100%", border: "1px solid grey" }}
          component={Paper}
        >
          <Table stickyHeader>
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
      ) : (
        "No exiten categorias registradas"
      )}
    </div>
  );
};

export default Categorias;
