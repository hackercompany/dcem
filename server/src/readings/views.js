const express = require('express');
const Model = require('./models');

const route = express.Router();

route.get('/', (req, res) => {
	try {
		Model.findAll().then(data => {
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
		Model.create({
			Location: req.body.Location,
			DeviceID: req.body.DeviceID,
			Voltage: req.body.Voltage,
			Current: req.body.Current,
			Alarm: req.body.Alarm,
			Gateway: req.body.Gateway,
			Temperature: req.body.Temperature,
			Code: req.body.Code,
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

		Model.findAll({
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
