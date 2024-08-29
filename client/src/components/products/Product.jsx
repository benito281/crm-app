import React from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import showAlert from '../layout/alerts.js';
import serverUrl from '../config/axios.js';

function Product({product, removeProductFromState}) {

  const deleteProduct = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estas seguro?",
        text: "Un producto eliminado no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const deleteCustomer = await serverUrl.delete(`/products/${id}`);
        if (deleteCustomer.status === 200) {
          showAlert("Eliminado", "Cliente eliminado correctamente", "success");
          removeProductFromState(id);
        }
      }
    } catch (error) {
      console.error("Error showing alert:", error);
      showAlert("Error", "Error fatal", "error");
    }
    
  }

  return (
    <li className="producto">
          <div className="info-producto">
            <p className="nombre">{product.nameProduct}</p>
            <p className="precio">${product.price}</p>
            {
              product.image ? (
                <img src={`${import.meta.env.VITE_SERVER_URL}/${product.image}`} />
              ) : null
            }
          </div>
          <div className="acciones">
            <Link to={`/products/edit/${product._id}`} className="btn btn-azul">
              <i className="fas fa-pen-alt"></i>
              Editar Producto
            </Link>

            <button type="button" 
            className="btn btn-rojo btn-eliminar"
            onClick={() => deleteProduct(product._id)}
            >
              <i className="fas fa-times"></i>
              Eliminar Producto
            </button>
          </div>
        </li>
  )
}

export default Product