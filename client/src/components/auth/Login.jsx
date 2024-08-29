import React, {useState, useContext} from 'react'
import {useNavigate} from "react-router-dom"
import serverUrl from '../config/axios.js'
import showAlert from '../layout/alerts.js';

import {CRMContext} from "../../context/CRMContext.jsx";

function Login() {
    const [credentials, setCredentials] = useState({});
    const navigate = useNavigate();

    //Llamamos al context
    const [auth, setAuthToken] = useContext(CRMContext);
    console.log(auth);
  

    //Inciar sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await serverUrl.post("/login", credentials);
            if (response.status !== 200) {                
                showAlert("Error",response.data.message, "warning");
            }
            else{
                showAlert("Correcto","Bienvenido", "success")
                const { token } = response.data;                
                //Se guarda el token de sesión en el localstorage, ya que es accesible para cualquier usuario
                localStorage.setItem('token', token);

                //Guardamos el token en el context para accederlo
                setAuthToken({
                    token,
                    auth : true
                })

                navigate("/")
            }
            
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                showAlert("Error ","Usuario no encontrado", "error")
            }

        }
    }

    //Almacena los datos en el state
    const readingData = (e) => {
            setCredentials({
                ...credentials,
                [e.target.name] : e.target.value
            })
    }

  return (
    <div className="login">
        <h2>Iniciar Sesión</h2>

        <div className="contenedor-formulario">
            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Email</label>
                    <input 
                        type="email"
                        name='email' 
                        placeholder='Introduzca el email'
                        required
                        onChange={readingData}/>
                        
                </div>

                <div className="campo">
                    <label>Contraseña</label>
                    <input 
                        type="password"
                        name='password' 
                        placeholder='Introduzca la contraseña'
                        required
                        onChange={readingData}/>        
                </div>

                <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
            </form>
        </div>
    </div>
  )
}

export default Login