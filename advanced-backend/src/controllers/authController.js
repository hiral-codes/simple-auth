import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Creating a user
export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName) {
        return res.status(200).json({ message: "First Name is Required" });
    }
    if (!lastName) {
        return res.status(200).json({ message: `Last Name is Required` });
    }
    if (!email) {
        return res.status(200).json({ message: `Email is Required` });
    }
    if (!password) {
        return res.status(200).json({ message: `Password is Required` });
    }
    // Hashed a password using bcrypt
    const hashedPasssword = await bcrypt.hash(password, 10)
    try {
        const user = new User({
            firstName,
            lastName,
            displayName: `${firstName + `${" "}` + lastName}`,
            email,
            password: hashedPasssword
        })
        const savedUser = await user.save();
        res.status(201).json({ message: "Successfully Registered", user: savedUser })
    } catch (error) {
        return res.status(500).json({ message: "Unable To Register", error: error })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        // Compared a password with a hash stored in DB
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid Password" })
        }
        // Payload which can be encoded from the token
        const payload = { userId: user._id, email: user.email, displayName: user.displayName }
        // Generating token using jwt
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        // sent token as a cookie
        res.cookie("token", token, { secure: true, httpOnly: true });
        res.status(200).json({ message: "Login Success", user: user })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error })
    }
}

// Getting a single user
export const getUser = async (req, res) => {
    try {
        const user = await User.find()
        if (!user) {
            res.status(401).json({ message: "User Not Found" })
        }
        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error })
    }
}


// export const checkAuth = async(req,res)=>{
//     try {
//             const token = req.cookies.token;
//             if (!token) {
//                 return res.status(401).json({ message: "Unauthorized: No token provided" });
//             }
//             const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//             req.user = decoded;
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: "Unauthorized: Invalid token" });
//         }
// }