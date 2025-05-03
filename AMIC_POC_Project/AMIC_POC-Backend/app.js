require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const poiRoutes = require('./routes/pois');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/pois', poiRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});















// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const poiRoutes = require('./routes/pois');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Replace with your MongoDB connection string
// mongoose.connect('mongodb+srv://kumar:Darna@369@vinaylearning1.ovn1c.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));

// // Routes
// app.use('/api/pois', poiRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
