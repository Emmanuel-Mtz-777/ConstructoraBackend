import { UserModel } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class UserController {
    static async createUser(req, res) {
        try {
        const userData = req.body;
        const newUser = await UserModel.createUser(userData);

        if (!newUser) throw new Error("Error creating user");

        res.status(201).json({
            message: "Usuario creado correctamente",
            user: newUser,
        });
        } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al crear el usuario" });
        }
    }

    static async loginUser(req, res) {
        try {
        const userData = req.body;
        const user = await UserModel.loginUser(userData);

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }
        const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("authToken", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 3600000, 
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user,
        });
        } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error al iniciar sesión" });
        }
    }
}
