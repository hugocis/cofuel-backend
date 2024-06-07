const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Define tus rutas aquí
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/friends', require('./routes/friendRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/participants', require('./routes/participantRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
