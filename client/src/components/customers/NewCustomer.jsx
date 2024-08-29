import React, { useState } from "react";
import showAlert from "../layout/alerts.js";
import { useNavigate } from "react-router-dom";
import serverUrl from "../config/axios.js";

/* Componente de nuevo cliente */
function NewCustomer() {
  const [customer, setCustomerSave] = useState({
    nameCustomer: "",
    lastnameCustomer: "",
    company: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();

  const updateState = (e) => {
    setCustomerSave({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  

  //Validar formulario
  const validateCustomer = () => {
    const { nameCustomer, lastnameCustomer, company, phone, email } = customer;

    //Verifica los valores del state customer, si dan true se puede enviar los datos al backend
    let valid =
      !nameCustomer.length ||
      !lastnameCustomer.length ||
      !company.length ||
      !phone.length ||
      !email.length;

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await serverUrl.post("/customers", customer);
      if (response.data.code == 11000) {
        showAlert(
          "Upps",
          "No puede haber dos correos iguales, cambielo e intentelo nuevamente",
          "warning"
        );
        console.log("Error data duplicated Mongo");
      } else {
        showAlert("Exito", "Se guardo correctamente el cliente", "success");
        console.log(response.data);
        navigate("/"); //Redirecciona al inicio de clientes
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h2>Nuevo cliente</h2>
      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nameCustomer"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="lastnameCustomer"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="company"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={updateState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="phone"
            onChange={updateState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validateCustomer()}
          />
        </div>
      </form>
    </>
  );
}

//High Order Component (HOC) es una función que toma un componente y retorna un nuevo componente
export default NewCustomer;
