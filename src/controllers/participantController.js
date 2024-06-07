const supabase = require('../models/supabaseClient');
const { createNotification } = require('./notificationController'); // Import createNotification

// Function to add a participant to a trip
const addParticipant = async (req, res) => {
  const { tripId, userId, pickupLocation, dropoffLocation } = req.body;
  console.log('addParticipant endpoint hit');
  console.log('Request body:', req.body);

  try {
    const { data, error } = await supabase
      .from('trip_participants')
      .insert([{ trip_id: tripId, user_id: userId, pickup_location: pickupLocation, dropoff_location: dropoffLocation, status: 'pending' }]);

    if (error) {
      throw error;
    }

    const trip = await supabase
      .from('trips')
      .select('user_id')
      .eq('id', tripId)
      .single();

    await createNotification(trip.data.user_id, 'participant_request', 'A new participant has requested to join your trip');

    console.log('Participant added:', data);
    res.status(201).send(data);
  } catch (error) {
    console.error('Error adding participant:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to respond to a participation request
const respondToParticipationRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log('respondToParticipationRequest endpoint hit');
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);

  try {
    const { data, error } = await supabase
      .from('trip_participants')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw error;
    }

    const participant = await supabase
      .from('trip_participants')
      .select('user_id')
      .eq('id', id)
      .single();

    const notificationMessage = status === 'accepted' ? 'Your request to join the trip was accepted' : 'Your request to join the trip was rejected';

    await createNotification(participant.data.user_id, 'participant_response', notificationMessage);

    console.log('Participation request response:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error responding to participation request:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to list participants of a trip
const listParticipants = async (req, res) => {
  const { tripId } = req.params;
  console.log('listParticipants endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data, error } = await supabase
      .from('trip_participants')
      .select('*')
      .eq('trip_id', tripId)
      .eq('status', 'accepted');

    if (error) {
      throw error;
    }

    console.log('List of participants:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error listing participants:', error.message);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addParticipant,
  respondToParticipationRequest,
  listParticipants
};
