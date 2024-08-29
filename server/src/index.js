import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import productsRoutes from './routes/products.routes.js'
import ordersRoutes from './routes/orders.routes.js';
import usersRoutes from './routes/users.routes.js'
import auth from "./middlewares/auth.js"

import path from "path";
import { fileURLToPath } from "url";

import './database.js';
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url)); //Obtiene el directorio donde se encuentra el archivo


//Middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));


//port
app.set('port', process.env.PORT || 5000);


//routes
app.use('/', indexRoutes);
app.use('/customers', auth,customersRoutes);
app.use('/products', auth,productsRoutes);
app.use('/orders', auth,ordersRoutes);
app.use(usersRoutes);

app.use(express.static(path.join(__dirname, "uploads")));//Permite el acceso a los archivos


app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})