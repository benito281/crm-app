import axios from "axios";


//Instancia de url para clientes
const serverUrl = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL
});
export default serverUrl;