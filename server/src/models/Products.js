import {Schema, model} from 'mongoose';

//Datos de Producto
const productSchema = new Schema({
    nameProduct : {
        type : String,
        trim : true
    },
    price : {
        type : Number
    },
    image : {
        type : String
    }
});

export default  model('Products', productSchema);