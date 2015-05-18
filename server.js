'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

process.env.APP_SECRET = process.env.APP_SECRET || 'ginahintonsfoodapp' // change

var adminRoutes = express.Router();
var restaurantRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/food_critic_dev');

require('./routes/admin_routes.js')(adminRoutes);
require('./routes/restaurant_routes.js')(restaurantRoutes);

app.use('/api', adminRoutes);
app.use('/api', restaurantRoutes);

app.listen(3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000));
});
