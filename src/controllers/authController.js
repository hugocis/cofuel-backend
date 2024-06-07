const supabase = require('../models/supabaseClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { addTokenToBlacklist } = require('../tokenBlacklist');

const register = async (req, res) => {
  const { username, password, email } = req.body;
  console.log('Register endpoint hit');  // Debug message
  console.log('Request body:', req.body);  // Debug message
  
  try {
    if (!username || !password || !email) {
      console.log('Missing fields');  // Debug message
      return res.status(400).send('All fields are required');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    console.log('Password hashed');  // Debug message
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password: hashedPassword, email }]);
    
    console.log('Supabase response data:', data);  // Debug message
    console.log('Supabase response error:', error);  // Debug message
    
    if (error) {
      console.error('Supabase insert error:', error);  // Debug message
      return res.status(400).send(error.message || 'Insert error');
    }

    console.log('User registered:', data);  // Debug message
    res.status(201).send(data);
  } catch (error) {
    console.error('Register error:', error.message);  // Debug message
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login endpoint hit');  // Debug message
  console.log('Request body:', req.body);  // Debug message
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      console.error('User not found:', error);  // Debug message
      throw new Error('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password');  // Debug message
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id }, config.jwtSecret, {
      expiresIn: 86400, // 24 hours
    });

    console.log('Login successful, token generated');  // Debug message
    res.status(200).send({ auth: true, token });
  } catch (error) {
    console.error('Login error:', error.message);  // Debug message
    res.status(401).send(error.message);
  }
};

const logout = (req, res) => {
  const token = req.headers['x-access-token'];
  if (token) {
    addTokenToBlacklist(token); // Añadir el token a la lista negra
  }
  console.log('Logout endpoint hit');  // Debug message
  res.status(200).send({ auth: false, token: null });
};

module.exports = { register, login, logout };
