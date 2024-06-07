const supabase = require('../models/supabaseClient');
const { createNotification } = require('./notificationController'); // Import createNotification

// Function to add a new vehicle
const addVehicle = async (req, res) => {
  const { userId, make, model, year, licensePlate } = req.body;
  console.log('addVehicle endpoint hit');
  console.log('Request body:', req.body);

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([{ user_id: userId, make, model, year, license_plate: licensePlate }]);

    if (error) {
      throw error;
    }

    await createNotification(userId, 'vehicle_added', 'Your vehicle has been added successfully');

    console.log('Vehicle added:', data);
    res.status(201).send(data);
  } catch (error) {
    console.error('Error adding vehicle:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to list all vehicles for a user
const listVehicles = async (req, res) => {
  const { userId } = req.params;
  console.log('listVehicles endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    console.log('List of vehicles:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error listing vehicles:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to update a vehicle
const updateVehicle = async (req, res) => {
  const { userId, licensePlate } = req.params;
  const { make, model, year } = req.body;
  console.log('updateVehicle endpoint hit');
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);

  try {
    // First, find the vehicle by user ID and license plate
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('user_id')
      .eq('license_plate', licensePlate)
      .eq('user_id', userId)
      .single();

    if (vehicleError || !vehicle) {
      console.error('Error finding vehicle:', vehicleError ? vehicleError.message : 'Vehicle not found');
      throw new Error('Vehicle not found');
    }

    // Update the vehicle
    const { data, error } = await supabase
      .from('vehicles')
      .update({ make, model, year })
      .eq('license_plate', licensePlate)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    await createNotification(vehicle.user_id, 'vehicle_updated', 'Your vehicle has been updated successfully');

    console.log('Vehicle updated:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error updating vehicle:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to delete a vehicle
const deleteVehicle = async (req, res) => {
  const { licensePlate } = req.params;
  console.log('deleteVehicle endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data: vehicle, error: vehicleError } = await supabase
      .from('vehicles')
      .select('user_id')
      .eq('license_plate', licensePlate)
      .single();

    if (vehicleError || !vehicle) {
      throw new Error('Vehicle not found');
    }

    const { data, error } = await supabase
      .from('vehicles')
      .delete()
      .eq('license_plate', licensePlate);

    if (error) {
      throw error;
    }

    await createNotification(vehicle.user_id, 'vehicle_deleted', 'Your vehicle has been deleted successfully');

    console.log('Vehicle deleted:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error deleting vehicle:', error.message);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addVehicle,
  listVehicles,
  updateVehicle,
  deleteVehicle
};
