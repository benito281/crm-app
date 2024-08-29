import {Schema, model} from 'mongoose';


//Datos del usuario
const userSchema = new Schema({
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true
    },
    username : {
        type : String,
        required : 'Agrega tu nombre'
    },
    password : {
        type : String,
        required : true
    }
})

export default model('Users', userSchema);