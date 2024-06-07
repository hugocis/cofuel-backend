const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

console.log('Connecting to Supabase');  // Debug message

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

module.exports = supabase;
