import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Header = () => {
  //Llamamos al context
  const [auth, setAuthToken] = useContext(CRMContext);
  const navigate = useNavigate();

  const logout = () => {
    //auth.auth = false y auth.token = ""
    setAuthToken({
      token : "",
      auth : false
    })
    localStorage.setItem('token', ''); //Se elimina el token de localstorage
    navigate("/signin"); //Redirecciona a la pantalla de logueo
  }

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>

          {auth.auth ? (
            <button className="btn btn-rojo" type="button" onClick={logout}>
              <i className="far fa-circle-xmark"></i> Cerrar Sesión
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
