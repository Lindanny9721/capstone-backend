import express from "express";
import axios from "axios";

const router = express.Router();

router.post('/places', async (req, res) => {
    const { lat, lng, radius } = req.body;
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`;
        const response = await axios.get(placesUrl);
        res.status(200).json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching places'});
    }
})
export default router;