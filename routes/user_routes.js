'use strict';

var bodyparser = require('body-parser');
var adminAuth = require('../lib/admin_auth')(process.env.APP_SECRET);
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var createUserController = require('../controllers/create_user_controller');
var signInController = require('../controllers/sign_in_controller');
var addRestController = require('../controllers/add_rest_controller');
var editRestController = require('../controllers/edit_rest_controller');
var deleteRestController = require('../controllers/delete_rest_controller');
var allRestFormController = require('../controllers/all_rest_form_controller');

module.exports = function(router, passport) {
  router.use(bodyparser.urlencoded({extended: true}));
  router.use(bodyparser.json());

  router.post('/user/create_user', adminAuth, createUserController);
  router.get('/', passport.authenticate('basic', {session: false}), signInController);
  router.post('/user/restaurant', eatAuth, addRestController);
  router.put('/user/restaurant/:id', eatAuth, editRestController);
  router.delete('/user/restaurant/:id', eatAuth, deleteRestController);

  router.get('/user/restaurant/all', eatAuth, allRestFormController);
  router.post('/user/create_user/client', createUserController);

  router.post('/user/restaurant/client', addRestController);
  router.get('/user/restaurant/all/client', allRestFormController);
  router.put('/user/restaurant/client/:id', editRestController);
  router.delete('/user/restaurant/client/:id', deleteRestController);
};
