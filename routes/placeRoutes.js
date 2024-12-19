import express from "express";
import axios from "axios";

const router = express.Router();

router.post('/places', async (req, res) => {
    const { lat, lng, radius, placeType } = req.body;
    console.log(placeType);
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${placeType}&key=${apiKey}`;
    console.log(placesUrl);
    try {
        let allPlaces = [];
        let nextPageToken = null;
        const response = await axios.get(placesUrl);
            let places = response.data.results;
            for (let place of places) {
                if (place.photos) {
                    const photoReference = place.photos[0].photo_reference;
                    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
                    place.image = photoUrl;
                }
            }
            allPlaces = [...allPlaces, ...response.data.results];
        res.status(200).json(allPlaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching places'});
    }
})
export default router;