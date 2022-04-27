// Requiring the routes
const router = require('express').Router;
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//Initialize router app
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
