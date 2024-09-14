import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchProductos = async () => {
  const response = await axios.get(`${API_URL}/producto/activo`);
  return response?.data;
};

const crearCategorias = async (categorias, idProducto) => {
  for (const categoria of categorias) {
    await axios?.post(`${API_URL}/relacion`, {
      idProducto: idProducto,
      idCategoria: categoria?.idCategoria,
    });
  }
};

export const createProducto = async (producto) => {
  try {
    const response = await axios?.post(`${API_URL}/producto`, producto);
    const nuevoProducto = response.data;
    const categorias = producto?.categorias;
    await crearCategorias(categorias, nuevoProducto?.idProducto);
  } catch (err) {
    console.log("Error al momento de crear producto:" + err);
  }
};

export const updateProducto = async (producto) => {
  try {
    const idProducto = producto?.idProducto;
    await axios?.put(`${API_URL}/producto/${idProducto}`, producto);
    const categorias = producto?.categorias;
    await axios?.delete(`${API_URL}/relacion/producto/${idProducto}`);
    await crearCategorias(categorias, idProducto);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProducto = async (producto) => {
  try {
    const idProducto = producto?.idProducto;
    await axios?.delete(`${API_URL}/producto/${idProducto}`);
  } catch (err) {
    console.log(err);
  }
};

export const fetchCategorias = async () => {
  const response = await axios.get(`${API_URL}/categoria`);
  return response.data;
};

export const createCategoria = async (categoria) => {
  try {
    await axios?.post(`${API_URL}/categoria`, categoria);
  } catch (err) {
    console.log("Error al momento de crear producto:" + err);
  }
};

export const updateCategoria = async (categoria) => {
  try {
    const idCategoria = categoria?.idCategoria;
    await axios?.put(`${API_URL}/categoria/${idCategoria}`, categoria);
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategoria = async (categoria) => {
  try {
    const idCategoria = categoria?.idCategoria;
    await axios?.delete(`${API_URL}/categoria/${idCategoria}`);
  } catch (err) {
    console.log(err);
  }
};
