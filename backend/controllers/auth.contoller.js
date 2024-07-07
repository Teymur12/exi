import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../generateTokenandSetCookie.js";

export const signup = async (request, response) => {
    try {
        const { email, fullName, userName, password } = request.body;

        if (!email || !fullName || !userName || !password) {
            return response.status(400).send({ error: "Please fill up all fields" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return response.status(400).send({ error: "Email is already in use, please try another email" });
            } else if (existingUser.userName === userName) {
                return response.status(400).send({ error: "Username is already taken, please try another username" });
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ email, fullName, userName, password: hashedPassword });

        if (!newUser) {
            return response.status(500).send({ error: "Failed to create user" });
        }

        generateTokenAndSetCookie(newUser._id, response);


        response.status(201).send(newUser);
    } catch (error) {
        console.error(`Error in signup controller: ${error.message}`);
        response.status(500).send("An internal server error occurred, please try again later");
    }
};

export const signin = async (request, response) => {
    try {
        const { email, password } = request.body
        if (!email || !password) {
            return response.status(404).send({ error: "please filled up all fields" })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(404).send({ error: "incorrect email or password" })
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (!isCorrectPassword) {
            return response.status(404).send({ error: "incorrect email or password" })
        }

        generateTokenAndSetCookie(user._id, response)

        response.status(201).send({ user })

    } catch (error) {
        console.error(`Error in signup controller: ${error.message}`);
        response.status(500).send("An internal server error occurred, please try again later");
    }
}

export const logout = async (request, response) => {
    response.cookie("jwt", "")
    response.status(201).send({ message: "logout is succesfully" })
}

