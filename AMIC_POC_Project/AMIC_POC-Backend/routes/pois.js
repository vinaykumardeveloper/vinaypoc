const express = require('express');
const router = express.Router();
const POI = require('../models/POI');

// GET all POIs
router.get('/', async (req, res) => {
  const pois = await POI.find().populate('geofence');
  res.json(pois);
});

// GET specific POI by ID
router.get('/:id', async (req, res) => {
  const poi = await POI.findById(req.params.id).populate('geofence');
  if (!poi) return res.status(404).json({ error: 'POI not found' });
  res.json(poi);
});

// CREATE new POI
router.post('/', async (req, res) => {
  try {
    const { name, coordinates, geofence } = req.body;
    const newPOI = new POI({ name, coordinates, geofence }); // Don't nest coordinates again
    await newPOI.save();
    res.status(201).json(newPOI);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE POI
router.put('/:id', async (req, res) => {
  const updated = await POI.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'POI not found' });
  res.json(updated);
});

// PATCH - partial update
router.patch('/:id', async (req, res) => {
  const updated = await POI.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ error: 'POI not found' });
  res.json(updated);
});


// DELETE POI
router.delete('/:id', async (req, res) => {
  const deleted = await POI.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'POI not found' });
  res.json({ message: 'POI deleted' });
});

module.exports = router;
