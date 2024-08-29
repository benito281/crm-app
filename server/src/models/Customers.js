import {Schema, model} from 'mongoose';

//Datos del cliente
const customerSchema = new Schema({
    nameCustomer : {
        type : String,
        trim : true
    }, 
    lastnameCustomer : {
        type : String,
        trim : true
    },
    company : {
        type : String,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true
    }, 
    phone : {
        type : String,
        trim : true
    }

})


export default model('Customers', customerSchema);