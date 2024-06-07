const supabase = require('../models/supabaseClient');
const { createNotification } = require('./notificationController'); // Import createNotification

// Function to create a new trip
const createTrip = async (req, res) => {
  const { userId, vehicleId, startLocation, endLocation, startTime, endTime, cost } = req.body;
  console.log('createTrip endpoint hit');
  console.log('Request body:', req.body);

  try {
    const { data, error } = await supabase
      .from('trips')
      .insert([{ user_id: userId, vehicle_id: vehicleId, start_location: startLocation, end_location: endLocation, start_time: startTime, end_time: endTime, cost }]);

    if (error) {
      throw error;
    }

    await createNotification(userId, 'trip_created', 'Your trip has been created successfully');

    console.log('Trip created:', data);
    res.status(201).send(data);
  } catch (error) {
    console.error('Error creating trip:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to list all trips
const listTrips = async (req, res) => {
  console.log('listTrips endpoint hit');

  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*');

    if (error) {
      throw error;
    }

    console.log('List of trips:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error listing trips:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to get details of a specific trip
const getTripDetails = async (req, res) => {
  const { id } = req.params;
  console.log('getTripDetails endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    console.log('Trip details:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error getting trip details:', error.message);
    res.status(400).send(error.message);
  }
};

module.exports = {
  createTrip,
  listTrips,
  getTripDetails
};
