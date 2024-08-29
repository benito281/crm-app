import React,{useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormSearchProduct from "./FormSearchProduct.jsx";
import FormCantProduct from "./FormCantProduct.jsx";
import serverUrl from "../config/axios.js";
import showAlert from "../layout/alerts.js"

function NewOrder() {

    //Se obtine el id del cliente
    const { id } = useParams();
    const navegate = useNavigate();

    //State
    //Guardamos los obtenidos del cliente
    const [customer, setSaveCustomer] = useState({});

    //Se guarda los datos de la busqueda
    const [search, setSaveSearch] = useState('');

    //Se guarda los productos
    const [products, setSaveProducts] = useState([]);

    //Se opera el total de los productos
    const [total, setSaveTotalProducts] = useState(0);


    //Se obtiene los datos del cliente
    const getCustomer = async (id) => {
        try {
            const response = await serverUrl.get(`/customers/${id}`);
            setSaveCustomer(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        getCustomer(id);

        updateTotal();
    },[products]);

    /* Busca el producto */
    const searchProduct = async (e) => {
      e.preventDefault();

      //Obtener productos de busqueda
      try {
        const response = await serverUrl.post(`/products/search/${search}`);
        if (response.data[0]) {
          let productResult = response.data[0];
          productResult.product = response.data[0]._id;
          productResult.amount = 0;

          setSaveProducts([
            ...products,
            productResult
          ])
        }else {
          //En caso de no encontrar ninguno
          showAlert("Upps", "El producto no fue encontrado", "warning");
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    /* Lee los datos de busqueda */
    const readDataSearch = (e) => {
      setSaveSearch(e.target.value);
    }


    //Restar producto
    const subtractProduct = (cant) => {

      //Copia el arreglo origina de productos
      const allProducts = [...products];
      //Validar si esta en 0 no puede ir mas alla
      if (allProducts[cant].amount === 0) return null;
      //Decremento
      allProducts[cant].amount--;

      //Se almacena en el state de products
      setSaveProducts(allProducts);

      //updateTotal() Forma uno de actualizar productos
    }
    //Sumar producto
    const sumProduct = (cant) => {
      //Copia el arreglo origina de productos
      const allProducts = [...products];
      
      //Incremento
      allProducts[cant].amount++;

      //Se almacena en el state de products
      setSaveProducts(allProducts);
      //updateTotal() Forma 1 de actualizar productos
    }


    //Actualizar pedido
    const updateTotal = () => {
      //Si el arreglo de productos es igual a 0 : el total es 0
      if (products.length === 0) {
        setSaveTotalProducts(0);
        return; //Termina la ejecución
      }

      let newTotal = 0;
      //recorrer el arreglo de productos, sus cantidades y precios
      products.map(product => newTotal += (product.amount * product.price));

      //Se guarda en el state
      setSaveTotalProducts(newTotal.toFixed(2));
    }

    //Eliminar pedido
    const deleteProductOrder =  (id) => {
      //Busca un producto por id, si lo encuentra genera una salida con todos los valores distintos al encontrado
      const allProducts = products.filter(product => product.product !== id) 
      setSaveProducts(allProducts)
    }

    //Enviar pedido al servidor
    const handleSubmit = async (e) => {
      e.preventDefault();
      //Pedido solicitado
      const requestedOrder = {
        customer : id,
        order : products, //Ya es un arreglo con el formato requerido
        total : total

      }
      try {
        const response = await serverUrl.post(`/orders/new/${id}`, requestedOrder);
        if (response.status === 200) {
          showAlert("Exito", "Pedido solicitado correctamente", "success");
          navegate("/orders");
        }
        else {
          showAlert("Error", response.data.message, "warning");
          
        }
      } catch (error) {
        console.log(error)
        showAlert("Error fatal", "Error en la comunicación con el servidor", "error")
      }
      //console.log(requestedOrder);
    }
  return (
    <>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>{customer.nameCustomer} {customer.lastnameCustomer}</p>
        <p>Telefono : {customer.phone}</p>
      </div>

        <FormSearchProduct 
         searchProduct={searchProduct}
         readDataSearch={readDataSearch}
        /> {/* Formulario de busqueda de producto */}

        <ul className="resumen">
          {
            products.map((product, index) => (
              <FormCantProduct 
              key={product.product}
              product={product}
              sumProduct={sumProduct}
              subtractProduct={subtractProduct}
              deleteProductOrder={deleteProductOrder}
              index={index}
              />
              
            ))
          }
        </ul>
        
        <p className="total">Total a pagar: <span>$ {total}</span> </p>
        {/* Si hay productos en el state muestra el formulario de salida */}
        {
          total > 0 ? (
            <form onSubmit={handleSubmit} >
              <input type="submit"
                
                className="btn btn-verde btn-block"
                value="Realizar pedido"
              />
            </form>
          ) : null
        }
     
    </>
  );
}

export default NewOrder;
