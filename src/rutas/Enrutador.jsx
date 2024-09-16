import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Enrutador = ({ setSeccionEnUso }) => {
  const location = useLocation();

  useEffect(() => {
    console.log("location");
    console.log(location);

    const pathname = location?.pathname;
    console.log(pathname);

    if (pathname === "/" || pathname === "/productos") {
      setSeccionEnUso("PRODUCTOS");
    } else if (pathname === "/categorias") {
      setSeccionEnUso("CATEGORIAS");
    }
  }, [location, setSeccionEnUso]);
};

export default Enrutador;
