import Users from "../models/Users.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//Registro de usuarios
export const registerUser = async (req, res) => {
    const user = new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12)
    console.log(user);
    try {
        const response = await user.save();
        console.log(response);
        return res.status(200).json({
            message : "Usuario creado satisfactoriamente"
        })
    } catch (error) {
        console.log(error);
        
        return res.json({
            message : "Error en el servidor"
        })
    }
    
}

//Autenticación de usuario
export const autenticateUser = async (req, res) => {
    const { email, password } = req.body
    if (email === "" || password === "") {
        return res.status(204).json({
            message : "Debe rellenar todos los campos"
        })
    }
    const user = await Users.findOne({email});
    if(!user) {
        return res.status(401).json({
        message : "Usuario no encontrado"
    })
    }else{
        if (!bcrypt.compareSync(password, user.password)) {
            return await res.status(401).json({
                message : "La contraseña es incorrecta"
            });
        } else {
            //Se crea firma el token
            const token = jwt.sign({
                email : user.email,
                username : user.username,
                id : user._id
            }, 'LLAVESECRETA', {
                expiresIn : '1h'
            })
            return res.json({
                token
            })
        }
    }

}