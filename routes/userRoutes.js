import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const router = express.Router();
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        console.log("TEST");
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(400).json({ error: 'This username already exist.' });
        if (existingEmail) return res.status(400).json({ error: 'This email already exist.' });
        const newUser = new User({ username, email, password });
        await newUser.save();
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log(token)
        res.status(200).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});  
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({ error: 'Invalid password or email' });
        user.comparePassword(password, (err,isMatch) => {
            if(err) return res.send("Server Error").status(500)
            if(!isMatch) return res.status(404).json({ error: 'Invalid password or email' });
        })
        const token = jwt.sign(
            { id: user._id, username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        )
        res.status(200).json("Login Successful", token);
    } catch(error) {
        console.error(error);
        res.status(404).json({ error: 'Error Login', token });
    }
});
router.get('/userInfo', authMiddleWare, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ profile: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;