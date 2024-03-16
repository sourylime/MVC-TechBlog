const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // If using Sequelize for session store
const db = require('./models'); // Assuming your Sequelize models are in a 'models' directory
const routes = require('./routes'); // Assuming your routes are in a 'routes' directory
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware for managing user sessions
app.use(session({
    secret: process.env.SESSION_SECRET, // Session secret (store this in .env)
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: db.sequelize // Pass your Sequelize instance
    })
}));

// Routes middleware
app.use(routes);

// Start the server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error syncing database:', error);
});

