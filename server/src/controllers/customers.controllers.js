import Customers from "../models/Customers.js";
import {validateCustomer} from "../utils/validation.js";

//Guarda un nuevo cliente
export const addCustomer = async (req, res) => {
    const validationResult = validateCustomer(req.body); //Valida los datos del cliente antes de guardarlo
    if (validationResult.statusCode !== 200) {
        return res.status(validationResult.statusCode).json({ errors: validationResult.errors });
    }
    const { nameCustomer, lastnameCustomer, company, email, phone  } = req.body;
    const customer = { nameCustomer, lastnameCustomer, company, email, phone };
    try {
        const newCustomer = new Customers(customer); //Guarda el cliente en la base de datos

        await newCustomer.save();
        return res.json({
            message : "Se agrego un nuevo cliente"
        });
    } catch (error) {
        console.log(error.message);
        return res.json(error);
        
    }
}

//Muestra todos los clientes
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customers.find({});
        return res.json(customers);
    } catch (error) {
        console.log(error.message);
        return res.status(501).json({
            message : "Error interno"
        })
    }
}

//Muestra un cliente en particular
export const getCustomerID = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customers.findById(id);
        if (!customer) {
            return res.status(404).json({
                message : "El cliente no existe o no esta registrado"
            });    
        }
        return res.json(customer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Error en la base de datos"
        });
    }
}

//Actualizar datos del cliente
export const updateCustomer = async (req, res) => {
    const validationResult = validateCustomer(req.body);
    if (validationResult.statusCode !== 200) {
        return res.status(validationResult.statusCode).json({ message: validationResult.message });
    }

    const { id } = req.params;
    const { nameCustomer, lastnameCustomer, company, email, phone  } = req.body;
    const customer = {nameCustomer, lastnameCustomer, company, email, phone}
    
    try {
        const customerUpdate = await Customers.findByIdAndUpdate(id, customer);
        if (customerUpdate) {
            console.log(customerUpdate);
            return res.json({
                message : "Datos cliente actualizados correctamente"
            })
        }
        else {
            return res.status(404).json({
                message : "El cliente no existe"
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message : "Error en la base de datos"
        });
    }
}

//Eliminar cliente
export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customers.findByIdAndDelete(id);
        if (customer) {
            return res.json({
                message : "Cliente eliminado correctamente"
            })
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message : "Error en la base de datos"
        });
    }
}