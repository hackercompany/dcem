const express = require('express');

const routes = express.Router();

routes.use('/settings', require('./settings/views'));
routes.use('/readings', require('./readings/views'));

module.exports = routes;
