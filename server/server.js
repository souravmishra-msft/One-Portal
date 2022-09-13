const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

/** Include Routes */
const routes = require('./routes/routes');

/** Load main config */
dotenv.config({ path: './config/main.env' });

/** Configure the Express App */
const app = express();
const PORT = process.env.PORT;


/** Connect to DB */
const db = process.env.DB_CONNECT;
mongoose.connect(db)
    .then(() => console.log(`Connection to DB established successfully.`))
    .catch((error) => console.log(error));

/** Using the Middlewares */
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));
app.use(cors());

/** Using the routes */
app.use('/api/v1', routes);

/** Server listening */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});