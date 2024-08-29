import React, { useEffect, useState } from "react";
import serverUrl from "../config/axios";
import OrderDetails from "./OrderDetails";
import Spinner from "../layout/Spinner";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); //Ayuda a mostrar el spinner

  //Obtenemos los pedidos
  const getOrders = async () => {
    try {
      const response = await serverUrl.get("/orders");
      setOrders(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

    // Función para eliminar pedido del estado
    const removeOrderFromState = (orderId) => {
      setOrders(orders.filter(order => order._id !== orderId));
    };
  
    if (loading) {
      return <Spinner />;
    }
  return (
    <>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {
          orders.map(order => (
            <OrderDetails 
              key={order._id}
              order={order}
              removeOrderFromState={removeOrderFromState}
            />

          ))
        }
      </ul>
    </>
  );
}

export default Orders;
