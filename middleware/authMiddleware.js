import jwt from 'jsonwebtoken';

const authMiddleWare = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export default authMiddleWare;