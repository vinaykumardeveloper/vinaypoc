const mongoose = require('mongoose');

const poiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  geofence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Geofence'
  },
}, { timestamps: true });

poiSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('POI', poiSchema);

