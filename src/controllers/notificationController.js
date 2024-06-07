const supabase = require('../models/supabaseClient');

// Function to get notifications for a user
const getNotifications = async (req, res) => {
  const { userId } = req.params;
  console.log('getNotifications endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    console.log('Notifications:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error getting notifications:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to mark a notification as read
const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
  console.log('markNotificationAsRead endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ status: 'read' })
      .eq('id', id);

    if (error) {
      throw error;
    }

    console.log('Notification marked as read:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error marking notification as read:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to create a notification
const createNotification = async (userId, type, message) => {
  console.log('createNotification function called');
  console.log('User ID:', userId, 'Type:', type, 'Message:', message);

  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{ user_id: userId, type, message, status: 'unread' }]);

    if (error) {
      throw error;
    }

    console.log('Notification created:', data);
    return data;
  } catch (error) {
    console.error('Error creating notification:', error.message);
    throw error;
  }
};

module.exports = {
  getNotifications,
  markNotificationAsRead,
  createNotification,
};
