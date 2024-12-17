import express from "express";
import User from "../models/User.js";

const router = express.Router();
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(400).json({ error: 'This username already exist.' });
        if (existingEmail) return res.status(400).json({ error: 'This email already exist.' });
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
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
        res.status(200).send("Login Successful");
    } catch(error) {
        console.error(error);
        res.status(404).json({ error: 'Error Login' });
    }
});

export default router;