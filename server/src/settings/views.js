const express = require('express');
const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const Settings = require('./models');

const route = express.Router();

route.get('/', (req, res) => {
	try {
		Settings.findAll().then(data => {
			// console.log(data);
			res.send(data);
		});
	} catch (error) {
		// console.log(error);
		res.status(500).send({ error: true, message: 'Some Error occured', error: error });
	}
});

route.post('/', (req, res) => {
	try {
		// console.log(req.body);
		Settings.create({
			name: req.body.name,
			value: req.body.value,
		}).then(val => {
			res.send(val);
		});
	} catch (error) {
		res.status(500).send({ error: true, message: 'Some Error occured', error: error });
	}
});

route.get('/:id', (req, res) => {
	try {
		console.log(req.params.id);

		Settings.findAll({
			where: {
				id: req.params.id,
			},
		}).then(data => {
			res.send(data);
		});
	} catch (error) {
		res.status(500).send({ error: true, message: 'Some Error occured', error: error });
	}
});

module.exports = route;
