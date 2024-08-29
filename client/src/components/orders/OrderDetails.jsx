import React from 'react'
import Swal from 'sweetalert2';
import serverUrl from '../config/axios.js';
import showAlert from '../layout/alerts.js'
function OrderDetails({order, removeOrderFromState}) {
    const deleteOrder = async (id) => {
        try {
            const result = await Swal.fire({
              title: "¿Estas seguro?",
              text: "Un pedido eliminado no se puede recuperar",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, eliminar!",
              cancelButtonText: "Cancelar",
            });
      
            if (result.isConfirmed) {
              const deleteCustomer = await serverUrl.delete(`/orders/${id}`);
              if (deleteCustomer.status === 200) {
                showAlert("Pedido eliminado", deleteCustomer.data.message, "success");
                removeOrderFromState(id) // Eliminar el pedido del estado en Orders
              }
            }
          } catch (error) {
            console.error("Error showing alert:", error);
            showAlert("Error", "Error fatal", "error");
          }
          
    }


  return (
    <li className="pedido">
        <div className="info-pedido">
            <p className="id">ID: {order._id}</p>
            <p className="nombre">Cliente: {order.customer.nameCustomer} {order.customer.lastnameCustomer}</p>

            <div className="articulos-pedido">
                <p className="productos">Artículos Pedido: </p>
                <ul>
  {
    order.order.map(items => (
      items.product ? (
        <li key={order._id+items.product._id}>
          <p>{items.product.nameProduct}</p>
          <p>Precio: ${items.product.price}</p>
          <p>Cantidad: {items.amount}</p>
        </li>
      ) : (
        <li key={order._id+Math.random()}>
          <p>Producto no disponible</p>
          <p>Cantidad: {items.amount}</p>
        </li>
      )
    ))
  }                    
</ul>

            </div>
            <p className="total">Total: ${order.total} </p>
        </div>
        <div className="acciones">
            <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => deleteOrder(order._id)}>
                <i className="fas fa-times"></i>
                Eliminar Pedido
            </button>
        </div>
    </li>
  )
}

export default OrderDetails