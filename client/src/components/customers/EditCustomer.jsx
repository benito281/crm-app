import React, { useState, useEffect } from "react";
import showAlert from "../layout/alerts.js";
import { useNavigate, useParams } from "react-router-dom";
import serverUrl from "../config/axios.js";

/* Componente de editar cliente */
function EditCustomer() {
    const [customer, setDataCustomer] = useState({
      nameCustomer: "",
      lastnameCustomer: "",
      company: "",
      phone: "",
      email: "",
    });
    const navigate = useNavigate(); //Ayuda a la redirección 
    
    const { id } = useParams(); //Ayuda a obtener datos de la url 


    const updateState = (e) => {
        setDataCustomer({
        ...customer,
        [e.target.name]: e.target.value,
      });
    };

    //Consulta a la API
    const getCustomer = async () => {
        try {
            const response = await serverUrl.get(`/customers/${id}`);
            setDataCustomer(response.data);
        
        } catch (error) {
            console.log(error.message);
        }
    }
    //useEffect, componente de carga
    useEffect(() => {
        getCustomer();
    }, []);


    //Actualización de datos de cliente
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updateCustomer = await serverUrl.put(`/customers/${customer._id}`, customer);
            if (updateCustomer.status === 200) {
                showAlert('Exito','Datos del cliente actualizados correctamente', 'success');
                console.log(updateCustomer);
                navigate("/");
            }
        } catch (error) {
            console.log(error.message)
        }
    }

  
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
  
    
    return (
      <>
        <h2>Editar cliente</h2>
        <form onSubmit={handleSubmit}>
          <legend>Llena todos los campos</legend>
  
          <div className="campo">
            <label>Nombre:</label>
            <input
              type="text"
              placeholder="Nombre Cliente"
              name="nameCustomer"
              onChange={updateState}
              value={customer.nameCustomer}
            />
          </div>
  
          <div className="campo">
            <label>Apellido:</label>
            <input
              type="text"
              placeholder="Apellido Cliente"
              name="lastnameCustomer"
              onChange={updateState}
              value={customer.lastnameCustomer}
            />
          </div>
  
          <div className="campo">
            <label>Empresa:</label>
            <input
              type="text"
              placeholder="Empresa Cliente"
              name="company"
              onChange={updateState}
              value={customer.company}
            />
          </div>
  
          <div className="campo">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email Cliente"
              name="email"
              onChange={updateState}
              value={customer.email}
            />
          </div>
  
          <div className="campo">
            <label>Teléfono:</label>
            <input
              type="text"
              placeholder="Teléfono Cliente"
              name="phone"
              onChange={updateState}
              value={customer.phone}
            />
          </div>
  
          <div className="enviar">
            <input
              type="submit"
              className="btn btn-azul"
              value="Guardar cambios"
              disabled={validateCustomer()}
            />
          </div>
        </form>
      </>
    );
  }
  
  

export default EditCustomer;