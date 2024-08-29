import Orders from "../models/Orders.js";

//Agrega un pedido
export const newOrder = async (req, res) => {
    const {customer, order, total } = req.body;
    try {
        const orderNew = new Orders({customer, order, total});
        await orderNew.save();
        return res.json({
            message : "Se agrego un nuevo pedido"
        });
    } catch (error) {
        console.log(error.message)
        return res.json({
            message : error.message
        })
    }
    
}

//Muestra las ordenes
export const showOrders = async (req, res) => {
    try {
        const orders = await Orders.find({}).populate('customer').populate({
            path : 'order.product',
            model : 'Products'
        });
        if (!orders) {
            return res.status(404).json({
                message : "Error al mostrar los pedidos"
            });
        }
        return res.json(orders);
    } catch(error){
        console.log(error.message);
        return res.status(500).json({
            message : error.message
        })
    }
}

//Muestra un pedido
export const showOrder = async (req, res) => {
    const {idOrder} = req.params;
    try {
        const order = await Orders.findById(idOrder).populate('customer').populate({
            path : 'order.product',
            model : 'Products'
        });
        if (!order) {
            return res.status(404).json({
                message : "Pedido no encontrado"
            });
        }
        return res.json(order);

    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}

//Actualizar pedido
export const updateOrder = async (req, res) => {
    const { idOrder } = req.params;
    const { customer, order, total } = req.body;
    try {
        const orderUpdate = await Orders.findByIdAndUpdate(idOrder, {customer, order, total}, {
            new : true
        });
        if(!orderUpdate){
            return res.json({
                message : "Error update"
            });
        }
        return res.json({
            message : "Pedido actualizado correctamente",
            orderUpdate
        });
    } catch (error) {
        console.log(error.message);
        return res.json({
            message : error.message
        })
    }
}

//Eliminar orden
export const deleteOrder = async (req, res) => {
    const { idOrder } = req.params;
    try{
        const order = await Orders.findOneAndDelete(idOrder);
        if (!order) {
            return res.json({
                message : "El pedido no existe"
            });
        }
        return res.json({
            message : "Pedido eliminado satisfactoriamente"
        })
    } catch(error){

    }
}