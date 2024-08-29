import React, { useState, useEffect } from "react";
import showAlert from "../layout/alerts.js";
import { useNavigate, useParams } from "react-router-dom";
import serverUrl from "../config/axios.js";
import Spinner from "../layout/Spinner";

function EditProduct() {
  const [product,setSaveProduct] = useState({
    nameProduct : '',
    price : '',
    image : ''
  });

  const [imageU, setSaveImage] = useState('');

  const navigate = useNavigate(); //Ayuda a la redirección   
  const { id } = useParams(); //Ayuda a obtener datos de la url 

  //Se obtiene el producto
  const getProduct = async (idProduct) => {
    try {
      const response = await serverUrl.get(`/products/${idProduct}`);
      setSaveProduct(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  //Leer información del producto
  const readingInformationProduct = (e) => {
    setSaveProduct({
      //Obtener una copia del state
      ...product,
      [e.target.name] : e.target.value
    })
  }

  //Leer archivo
  const readingFile = (e) => {
    setSaveImage(e.target.files[0]);
  }
  
  useEffect(() => {
    getProduct(id);
  },[]);
  
  const { nameProduct, price, image, _id } = product;


  if(!nameProduct || !price || !image) <Spinner />

  //Actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nameProduct', product.nameProduct);
    formData.append('price', product.price);
    formData.append('image', imageU);

    try {
      const response = await serverUrl.put(`/products/${_id}`, formData, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        showAlert("Exito", response.data.message, "success");
        navigate("/products");
      }
    } catch (error) {
      console.log(error.message);
      showAlert("Error", "Vuelva a intentarlo nuevamente", "error");
    }
  }

  return (
    <>
      <h2>Editar Producto</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nameProduct"
            onChange={readingInformationProduct}
            defaultValue={nameProduct}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={readingInformationProduct}
            defaultValue={price}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {
            image ? (
              <img src={`${import.meta.env.VITE_SERVER_URL}/${image}`} alt="image" width="250" height="250"/>
            ) : null
          }
          <input type="file" 
            name="image" 
            onChange={readingFile}/>
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </>
  );
}

export default EditProduct;
