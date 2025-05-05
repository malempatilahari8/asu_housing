console.log('🛠️ Attempting to connect to MySQL...');

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',              // 🔑 Your MySQL username
  password: 'Lahari@2001',   // 🔑 Your MySQL password
  database: 'housing_app'    // 🔑 Your database name
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    process.exit(1);  // Stop the server if DB connection fails
  }
  console.log('✅ Connected to MySQL');
});

module.exports = connection;
