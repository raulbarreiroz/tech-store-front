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
  const [modoEdicion, setModoEdicion] = useState("INSERTAR");
  const [isFormProductoOpen, setisFormProductoOpen] = useState(false);
  const [isFormCategoriaOpen, setisFormCategoriaOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({
    idCategoria: undefined,
    nombre: "",
    descripcion: "",
    fechaCreacion: undefined,
  });
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    idProducto: undefined,
    nombre: "",
    descripcion: "",
    fechaCreacion: undefined,
    imagen: undefined,
    precio: 0,
    categorias: [],
  });
  const [mostrarDialogoConfirmacion, setMostrarDialogoConfirmacion] =
    useState(false);
  const [mostrarDialogoCarga, setMostrarDialogoCarga] = useState(false);

  function resetProductoSelecionado() {
    setProductoSeleccionado({
      idProducto: undefined,
      nombre: "",
      descripcion: "",
      fechaCreacion: undefined,
      imagen: undefined,
      precio: 0,
      categorias: [],
    });
  }

  function resetCategoriaSeleccionada() {
    setCategoriaSeleccionada({
      idCategoria: undefined,
      nombre: "",
      descripcion: "",
      fechaCreacion: undefined,
    });
  }

  useEffect(() => {
    console.log("actualizarProductos");
    console.log(actualizarProductos);
  }, [actualizarProductos]);

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
      resetProductoSelecionado();
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
      resetCategoriaSeleccionada();
      setCategorias([]);
      getCategorias();
    }
  }, [actualizarCategorias]);

  // handlers
  const handleOpenForm = () => {
    setisFormProductoOpen(true);
  };

  const handleOpenFormCategoria = () => {
    setisFormCategoriaOpen(true);
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
    setisFormProductoOpen(false);
    setModoEdicion("INSERTAR");
  };

  const handleCloseFormCategoria = () => {
    setisFormCategoriaOpen(false);
    resetCategoriaSeleccionada();
    setModoEdicion("INSERTAR");
  };

  const iconButtonClickHandler = (e) => {
    e?.preventDefault();
    if (seccionEnUso === "PRODUCTOS") {
      resetProductoSelecionado();
      setisFormProductoOpen(true);
    } else if (seccionEnUso === "CATEGORIAS") {
      resetCategoriaSeleccionada();
      setisFormCategoriaOpen(true);
    }
  };

  return (
    <div id="main-id">
      <div id="cuerpo-id">
        <Router>
          <AppBar
            position="static"
            style={{
              height: "18vh",
              margin: "0 0 5vh 0",
            }}
          >
            <Toolbar
              style={{
                padding: "0 3vw",
              }}
            >
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Tech store
              </Typography>
              <Button
                style={{
                  backgroundColor: "white",
                }}
                color="primary"
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
                style={{
                  backgroundColor: "white",
                  marginLeft: "1vw",
                }}
                color="primary"
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
                onClick={iconButtonClickHandler}
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
                  isFormProductoOpen={isFormProductoOpen}
                  setisFormProductoOpen={setisFormProductoOpen}
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
                  isFormCategoriaOpen={isFormCategoriaOpen}
                  setisFormCategoriaOpen={isFormCategoriaOpen}
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
          open={isFormProductoOpen}
          onClose={handleCloseFormProducto}
          productoSeleccionado={productoSeleccionado}
          setProductoSeleccionado={setProductoSeleccionado}
          categorias={categorias}
          modoEdicion={modoEdicion}
          setProducto={setProductoSeleccionado}
          setMostrarDialogoCarga={setMostrarDialogoCarga}
          setActualizarProductos={setActualizarProductos}
        />
      }
      {
        <CategoriaForm
          open={isFormCategoriaOpen}
          onClose={handleCloseFormCategoria}
          categorias={categorias}
          modoEdicion={modoEdicion}
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          setActualizarCategorias={setActualizarCategorias}
          setMostrarDialogoCarga={setMostrarDialogoCarga}
        />
      }
      {
        <DialogConfirmacion
          open={mostrarDialogoConfirmacion}
          handleClose={handleCloseDialogoConfirmacion}
          productoSeleccionado={productoSeleccionado}
          seccionEnUso={seccionEnUso}
          categoriaSeleccionada={categoriaSeleccionada}
          setMostrarDialogoCarga={setMostrarDialogoCarga}
          setActualizarProducto={setActualizarProductos}
        />
      }
      {<DialogoCarga open={mostrarDialogoCarga} />}
    </div>
  );
};

export default VistaPrincipal;
