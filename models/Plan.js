import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  geometry: {
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  vicinity: { type: String, required: true },
  types: { type: [String], required: true },
  image: { type: String, required: true },
  rating: { type: Number },
});

const plannerSchema = new mongoose.Schema({
  name: { type: String, required: true},
  places: {
    type: [placeSchema],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Plan = mongoose.model('Plan', plannerSchema);

export default Plan;