import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import showAlert from "../layout/alerts.js"
import serverUrl from "../config/axios.js";

function Customer({ customer, removeCustomerFromState }) {
  const { _id, nameCustomer, lastnameCustomer, company, email, phone } =
    customer;

  async function confirmDeleteCustomer() {
    try {
      const result = await Swal.fire({
        title: "¿Estas seguro?",
        text: "Un cliente eliminado no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const deleteCustomer = await serverUrl.delete(`/customers/${_id}`);
        if (deleteCustomer.status === 200) {
          showAlert("Eliminado", deleteCustomer.data.message, "success");
          removeCustomerFromState(_id);
        }
      }
    } catch (error) {
      console.error("Error showing alert:", error);
    }
  }

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nameCustomer} {lastnameCustomer}
        </p>
        <p className="empresa">{company}</p>
        <p>{email}</p>
        <p>Tel: {phone}</p>
      </div>
      <div className="acciones">
        <Link to={`/customers/edit/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <Link to={`/orders/new/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => confirmDeleteCustomer(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
}

export default Customer;
