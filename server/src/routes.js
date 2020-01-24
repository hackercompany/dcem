const express = require('express');

const routes = express.Router();

routes.use('/settings', require('./settings/views'));

module.exports = routes;
