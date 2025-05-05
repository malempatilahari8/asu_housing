console.log('Starting server.js'); // First log

const db = require('./db');  // ✅ This triggers MySQL connection
console.log('db.js has been required');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');  // ✅ Import login router

const app = express();  // 🛑 Make sure this comes BEFORE using app!

app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoutes);  // ✅ Mount /login routes

const PORT = 4004;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
