import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import serverUrl from "../config/axios.js";
import showAlert from "../layout/alerts.js";


function NewProduct() {

  const navegate = useNavigate();

  //Guardo el nombre del producto y su precio
  const [newProduct, setSaveNewProduct] = useState({
    nameProduct : '',
    price : ''
  });

  //Guardo el archivo
  const [image, setSaveImage] = useState('');


  //Leer información del producto
  const readingInformationProduct = (e) => {
    setSaveNewProduct({
      //Obtener una copia del state
      ...newProduct,
      [e.target.name] : e.target.value
    })
  }

  //Leer archivo
  const readingFile = (e) => {
    setSaveImage(e.target.files[0]);
  }

  //Envio de datos al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nameProduct', newProduct.nameProduct);
    formData.append('price', newProduct.price);
    formData.append('image', image);

    try {
      const response = await serverUrl.post('/products', formData,{
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        showAlert("Exito", response.data.message, "success");
        navegate("/products");
      }
      console.log(response.data.message);
    } catch (error) {
      console.log(error.message);
      showAlert("Hubo un error","Vuelva a interlo nuevamente","error");
    }

  }


  return (
    <>
      <h2>Nuevo Producto</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" 
          placeholder="Nombre Producto" 
          name="nameProduct"
          onChange={readingInformationProduct} />
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
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" 
          name="image"
          onChange={readingFile} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
            
          />
        </div>
      </form>
    </>
  );
}

export default NewProduct;
