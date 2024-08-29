import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serverUrl from "../config/axios";
import Product from "./Product";
import Spinner from "../layout/Spinner";

function Products() {
  const [products, setSaveProducts] = useState([]);

  //Se obtiene todos los productos
  const getProducts = async () => {
    try {
      const response = await serverUrl.get("/products");
      setSaveProducts(response.data);

    } catch (error) {
      console.error("Error fetching products:", error);
      setSaveProducts([]); // Establece como array vacío en caso de error
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (!products.length) <Spinner />
  
  //Elimina el producto de state
  const removeProductFromState = (productId) => {
    setSaveProducts(products.filter(product => product._id !== productId));
  };

  return (
    <>
      <h2>Productos</h2>
      <Link to={"/products/new"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i> Nuevo Producto
      </Link>
      <ul className="listado-productos">
        {products.map((product) => (
          <Product key={product._id} product={product} removeProductFromState={removeProductFromState}/>
        ))}
      </ul>
    </>
  );
}

export default Products;
