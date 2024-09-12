import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Productos from "../secciones/Productos";
import Categorias from "../secciones/Categorias";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import ProductoForm from "../Formularios/ProductoForm";
import { fetchCategorias } from "../servicios/api";
import { fetchProductos } from "../servicios/api";
import DialogConfirmacion from "../dialogs/DialogoConfirmacion";
import DialogoCarga from "../dialogs/DialogoCarga";
import CategoriaForm from "../Formularios/CategoriaForm";

const VistaPrincipal = () => {
  const [actualizarProductos, setActualizarProductos] = useState(true);
  const [actualizarCategorias, setActualizarCategorias] = useState(true);
  const [seccionEnUso, setSeccionEnUso] = useState("PRODUCTOS");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormOpenCategoria, setIsFormOpenCategoria] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(undefined);
  const [productoSeleccionado, setProductoSeleccionado] = useState(undefined);
  const [modoEdicion, setModoEdicion] = useState("INSERTAR");
  const [categorias, setCategorias] = useState(undefined);
  const [productos, setProductos] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [formData, setformData] = useState({
    idCategoria: "",
    idProducto: "",
    nombre: "",
    descripcion: "",
    fechaCreacion: "",
  });
  const [mostrarDialogoConfirmacion, setMostrarDialogoConfirmacion] =
    useState(false);
  const [mostrarDialogoCarga, setMostrarDialogoCarga] = useState(false);

  useEffect(() => {
    console.log("categoriaSeleccionada");
    console.log(categoriaSeleccionada);
  }, [categoriaSeleccionada]);

  useEffect(() => {
    const getProductos = async () => {
      setMostrarDialogoCarga(true);
      try {
        const data = await fetchProductos();
        setProductos(data);
      } catch (err) {
        console.log(err);
        setProductos([]);
      } finally {
        setMostrarDialogoCarga(false);
        setActualizarProductos(false);
      }
    };

    if (actualizarProductos) {
      setProductos([]);
      getProductos();
    }
  }, [actualizarProductos]);

  useEffect(() => {
    const getCategorias = async () => {
      setMostrarDialogoCarga(true);
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (err) {
        console.log(err);
        setCategorias([]);
      } finally {
        setMostrarDialogoCarga(false);
        setActualizarCategorias(false);
      }
    };

    if (actualizarCategorias) {
      setCategorias([]);
      getCategorias();
    }
  }, [actualizarCategorias]);

  // handlers
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleOpenFormCategoria = () => {
    setIsFormOpenCategoria(true);
  };

  const handleCloseDialogoConfirmacion = (e) => {
    setMostrarDialogoConfirmacion(false);
    if (seccionEnUso === "PRODUCTOS") {
      setActualizarProductos(true);
    } else if (seccionEnUso === "CATEGORIAS") {
      setActualizarCategorias(true);
    }
  };

  const handleCloseFormProducto = () => {
    setIsFormOpen(false);
    setformData({
      idProducto: undefined,
      idCategoria: undefined,
      nombre: "",
      descripcion: "",
      fechaCreacion: "",
    });
    setCategoriasSeleccionadas([]);
    setModoEdicion("INSERTAR");
    setActualizarProductos(true);
  };

  const handleCloseFormProductoCategoria = () => {
    setIsFormOpenCategoria(false);
    setformData({
      idCategoria: undefined,
      nombre: "",
      descripcion: "",
      fechaCreacion: "",
    });
    setModoEdicion("INSERTAR");
    setActualizarCategorias(true);
  };

  useEffect(() => {
    if (productoSeleccionado) {
      setformData({
        idProducto: productoSeleccionado.idProducto,
        nombre: productoSeleccionado.nombre,
        descripcion: productoSeleccionado.descripcion,
        fechaCreacion: productoSeleccionado.fechaCreacion,
        categorias: productoSeleccionado?.categorias || [],
      });

      setCategoriasSeleccionadas(productoSeleccionado?.categorias || []);
    }
  }, [productoSeleccionado]);

  useEffect(() => {
    if (categoriaSeleccionada) {
      setformData({
        idCategoria: categoriaSeleccionada.idCategoria,
        nombre: categoriaSeleccionada.nombre,
        descripcion: categoriaSeleccionada.descripcion,
        fechaCreacion: categoriaSeleccionada.fechaCreacion,
      });
    }
  }, [categoriaSeleccionada]);

  return (
    <div id="main-id">
      <div id="cuerpo-id">
        <Router>
          <AppBar
            position="static"
            style={{
              height: "18vh",
            }}
          >
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Tech store
              </Typography>
              <Button
                color="inherit"
                component={Link}
                to="/productos"
                onClick={(e) => {
                  setActualizarProductos(true);
                  setSeccionEnUso("PRODUCTOS");
                }}
              >
                Productos
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/categorias"
                onClick={(e) => {
                  setActualizarCategorias(true);
                  setSeccionEnUso("CATEGORIAS");
                }}
              >
                Categorías
              </Button>
            </Toolbar>
            <Typography
              variant="h5"
              component="p"
              sx={{ flexGrow: 1, textAlign: "center" }}
              style={{
                borderTop: "1px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Gestor de inventario: {seccionEnUso}
              <IconButton
                style={{ marginLeft: "1vw", backgroundColor: "white" }}
                onClick={(e) => {
                  e?.preventDefault();
                  if (seccionEnUso === "PRODUCTOS") {
                    setIsFormOpen(true);
                  } else {
                    setIsFormOpenCategoria(true);
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Typography>
          </AppBar>
          <Routes>
            <Route
              path="/productos"
              element={
                <Productos
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                  setProductoSeleccionado={setProductoSeleccionado}
                  handleOpenForm={handleOpenForm}
                  productoSeleccionado={productoSeleccionado}
                  productos={productos}
                  setModoEdicion={setModoEdicion}
                  setMostrarDialogoConfirmacion={setMostrarDialogoConfirmacion}
                />
              }
            ></Route>
            <Route
              path="/categorias"
              element={
                <Categorias
                  isFormOpen={isFormOpenCategoria}
                  setIsFormOpen={setIsFormOpenCategoria}
                  setCategoriaSeleccionada={setCategoriaSeleccionada}
                  handleOpenForm={handleOpenFormCategoria}
                  categoriaSeleccionada={categoriaSeleccionada}
                  categorias={categorias}
                  setModoEdicion={setModoEdicion}
                  setMostrarDialogoConfirmacion={setMostrarDialogoConfirmacion}
                />
              }
            />
            <Route path="/" element={<Navigate to="/productos" />} />
          </Routes>
        </Router>
      </div>
      {
        <ProductoForm
          open={isFormOpen}
          onClose={handleCloseFormProducto}
          producto={productoSeleccionado}
          categorias={categorias}
          modoEdicion={modoEdicion}
          formData={formData}
          setFormData={setformData}
          categoriasSeleccionadas={categoriasSeleccionadas}
          setCategoriasSeleccionadas={setCategoriasSeleccionadas}
          setProducto={setProductoSeleccionado}
          setMostrarDialogoCarga={setMostrarDialogoCarga}
        />
      }
      {
        <CategoriaForm
          open={isFormOpenCategoria}
          onClose={handleCloseFormProductoCategoria}
          categoria={categoriaSeleccionada}
          categorias={categorias}
          modoEdicion={modoEdicion}
          formData={formData}
          setFormData={setformData}
        />
      }
      {
        <DialogConfirmacion
          open={mostrarDialogoConfirmacion}
          handleClose={handleCloseDialogoConfirmacion}
          productoSeleccionado={productoSeleccionado}
          seccionEnUso={seccionEnUso}
          categoriaSeleccionada={categoriaSeleccionada}
        />
      }
      {<DialogoCarga open={mostrarDialogoCarga} />}
    </div>
  );
};

export default VistaPrincipal;
