const supabase = require('../models/supabaseClient');

// Crear un nuevo pago
const createPayment = async (req, res) => {
  const { trip_id, payer_id, amount, status } = req.body;

  const { data, error } = await supabase
    .from('payments')
    .insert([{ trip_id, payer_id, amount, status }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ data });
};

// Obtener todos los pagos
const getAllPayments = async (req, res) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
};

// Obtener pagos por ID de viaje
const getPaymentsByTripId = async (req, res) => {
  const { trip_id } = req.params;

  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('trip_id', trip_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
};

// Eliminar un pago
const deletePayment = async (req, res) => {
  const { payment_id } = req.params;

  const { data, error } = await supabase
    .from('payments')
    .delete()
    .eq('id', payment_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByTripId,
  deletePayment,
};
