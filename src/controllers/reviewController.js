const supabase = require('../models/supabaseClient');
const { createNotification } = require('./notificationController'); // Import createNotification

// Function to add a review for a trip
const addReview = async (req, res) => {
  const { tripId, userId, rating, comment } = req.body;
  console.log('addReview endpoint hit');
  console.log('Request body:', req.body);

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ trip_id: tripId, user_id: userId, rating, comment }]);

    if (error) {
      throw error;
    }

    const trip = await supabase
      .from('trips')
      .select('user_id')
      .eq('id', tripId)
      .single();

    await createNotification(trip.data.user_id, 'trip_review', 'You have a new review on your trip');

    console.log('Review added:', data);
    res.status(201).send(data);
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to list reviews for a trip
const listReviews = async (req, res) => {
  const { tripId } = req.params;
  console.log('listReviews endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('trip_id', tripId);

    if (error) {
      throw error;
    }

    console.log('List of reviews:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error listing reviews:', error.message);
    res.status(400).send(error.message);
  }
};

module.exports = {
  addReview,
  listReviews
};
