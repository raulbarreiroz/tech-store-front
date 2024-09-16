import axios from "axios";

//const API_URL = "http://localhost:3001";
const API_URL = process.env.REACT_APP_API_URL;

export const fetchProductos = async () => {
  const response = await axios.get(`${API_URL}/producto/activo`);
  return response?.data;
};

export const createProducto = async (producto) => {
  try {
    if (producto?.base64Imagen) {
      delete producto.base64Imagen;
    }
    const response = await axios?.post(
      `${API_URL}/producto`,
      { ...producto },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const nuevoProducto = response.data;
    return nuevoProducto;
  } catch (err) {
    console.log("Error al momento de crear producto:" + err);
  }
};

export const updateProducto = async (producto) => {
  try {
    if (producto?.imagen) {
      delete producto.imagenUrl;
    }
    const idProducto = producto?.idProducto;
    await axios?.put(`${API_URL}/producto/${idProducto}`, producto, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
