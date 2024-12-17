import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
});

planSchema.index({ location: '2dsphere' });

const Plan = mongoose.model('Plan', planSchema);

export default Plan;