import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
/* Layouts */
import Header from './components/layout/Header';
import Navegation from './components/layout/Navegation';

/* Componentes */
import Customers from "./components/customers/Customers";
import NewCustomer from './components/customers/NewCustomer';
import EditCustomer from './components/customers/EditCustomer';
//Productos
import Products from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import EditProduct from './components/products/EditProduct';

//Ordenes
import Orders from "./components/orders/Orders";
import NewOrder from './components/orders/NewOrder';
import EditOrder from "./components/orders/EditOrder"

//Login
import Login from './components/auth/Login';
/* Context */
import {CRMProvider, CRMContext} from "./context/CRMContext";

/* Recursos */
import '../public/css/app.css';
import '../public/css/normalize.css'

function App() {
  //Utilizar context
  const [auth, setAuthToken] = useContext(CRMContext);

  return (
    <>
    <CRMProvider>
      <Router>
        <Header/>
        <div className="grid contenedor contenido-principal">
          <Navegation/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route exact path="/" element={<Customers />} />
              <Route exact path="/customers/new" element={<NewCustomer />} />
              <Route exact path="/customers/edit/:id" element={<EditCustomer />} />

              <Route exact path="/products" element={<Products />} />
              <Route exact path="/products/new" element={< NewProduct />} />
              <Route exact path="/products/edit/:id" element={<EditProduct />} />

              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/orders/new/:id" element={< NewOrder />} />
              <Route exact path="/orders/edit/:id" element={<EditOrder />} />

              <Route exact path="/signin" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
      </CRMProvider>
    </>
  )
}

export default App;
