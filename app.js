require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes'); // Index de las rutas


const sequelize = require('./database/conexion');

app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

