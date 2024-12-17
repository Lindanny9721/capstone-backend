import express from "express";

import Plan from "../models/Plan.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { lat, lng, radius } = req.query;
        if (!lat || !lng || !radius) {
            return res.status(400).json({ error: 'Missing lat, lng, or radius query parameters' });
        }
        const plans = await Plan.find({
        location: {
            $nearSphere: {
            $geometry: {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: radius,
            },
        },
        });
        res.json(plans); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
