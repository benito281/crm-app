import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    //auterización para el header
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        const error = new Error("No esta autenticado");
        error.statusCode = 401
        throw error
    }
    //Obtener token
    const token = authHeader.split(' ')[1]
    let checkToken; //Verifica token
    try {
        checkToken = jwt.verify(token, 'LLAVESECRETA')
    } catch (error) {
        error.statusCode = 500
        throw error
    }
     //Si es un token pero hay un error
    if (!checkToken) {
        const error = new Error("No esta autenticado");
        error.statusCode = 401
        throw error
    }

    next()
}

export default auth