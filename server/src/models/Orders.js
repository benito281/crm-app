import { Schema, model } from "mongoose";


const ordersSchema = new Schema({
    customer : {
        type : Schema.ObjectId,
        ref : 'Customers'
    },
    order : [{
        _id : false,
        product : {
            type : Schema.ObjectId,
            ref : 'Products'
        },
        amount : {
            type : Number
        }
    }],
    total : {
        type : Number
    }
});



export default model('Orders', ordersSchema);