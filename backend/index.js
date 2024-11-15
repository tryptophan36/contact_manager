const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

//Routers
const contactRouter = require('./routes/contacts')

// Middleware
app.use(cors());
app.use(express.json());

//Route Handling
app.use('/api',contactRouter)



// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

