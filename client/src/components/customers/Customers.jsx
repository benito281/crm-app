import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import serverUrl from "../config/axios.js";
import Customer from "./Customer.jsx";
import Spinner from "../layout/Spinner.jsx";

//Context
import  { CRMContext } from "../../context/CRMContext.jsx"

/* Visualización de clientes */
function Customers() {
  const [customers, setCustomerSave] = useState([]);

  ///Utiliza valores del context
  const [auth, setAuthToken] = useContext(CRMContext);

  const navigate = useNavigate();

  console.log(auth);
  
  const queryApi = async () => {
    try {
      const customerQuery = await serverUrl.get('/customers',{
        headers : {
          Authorization : `Bearer ${auth.token}`
        }
      });
      setCustomerSave(customerQuery.data);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/signin");
      }
      console.error("Error fetching customers:", error);
    }
  };

  /* Se obtiene los datos de clientes de a api */
  useEffect(() => {
    if (auth.token !== "") {
        queryApi();
    } else {
      navigate("/signin")
    }
  }, []);

  //Elimina el cliente de state
  const removeCustomerFromState = (customerId) => {
    setCustomerSave(customers.filter(customer => customer._id !== customerId));
  };
  if(!auth.auth){
    navigate("/signin");
  }
  if (!customers.length) {
    return <Spinner />;
  }

  return (
    <>
      <h2>Clientes</h2>
      <Link to={"/customers/new"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>
      <ul className="listado-clientes">
        {customers.map(customer => (
          <Customer customer={customer} key={customer._id} removeCustomerFromState={removeCustomerFromState} />
        ))}
      </ul>
    </>
  );
}

export default Customers;
