import { UserModel } from "../Models/UserModel.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class UserController {
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserModel.createUser(userData);
            if (!newUser) throw new CustomError(400, 'Error creating user');
            res.status(201).json({message: "Usuario creado correctamente",user: newUser});
        } catch (error) {
            res.status(401).json({ message: "Error al crear el usuario" });
        }
    }
    static async loginUser(req, res) {
        try {
            const userData = req.body;
            const user = await UserModel.loginUser(userData);
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: "Error al iniciar sesión" });
        }
    }

    
}