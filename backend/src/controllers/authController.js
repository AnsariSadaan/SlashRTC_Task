import { User } from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User is already exists with this email" })
        }

        const hashPassword = await bcrypt.hash(password, 12);

        // create new user 
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Username or Password is Incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credential" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        console.log(token);
        res.json({ id: existingUser._id, token:token, message: "Login Successfully", });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}


export const logoutUser = async (req, res) => {
    try {
        res.json({ message: "Logout Successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
