const express = require('express');
const Model = require('./models');
const CSV = require('csv-string');
const route = express.Router();
const btPc = require('./batterypercentage');

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

route.get('/csv', (req, res) => {
	try {
		Model.findAll().then(data => {
			str = '';
			if (data.len == 0) return res.send(str);
			cols = [
				'Date',
				'Time',
				'DeviceID',
				'Current',
				'Voltage',
				'Temperature',
				'State',
				'Resistance',
				'Battery percentage',
			];
			str += CSV.stringify(cols);
			for (let row of data) {
				vals = {};

				createdAt = new Date(row['createdAt']).toString();
				vals.Date = createdAt.slice(4, 15);
				vals.Time = createdAt.slice(16, 24);
				vals.DeviceID = row['DeviceID'];
				vals.Current = row.Current;
				vals.Voltage = row.Voltage;
				vals.Temperature = row.Temperature;
				vals.State = { '0': 'Charging', '1': 'Discharging' }[row.Alarm[7]];
				vals.Resistance = vals.Voltage / vals.Current;
				vals['Battery Percentage'] = btPc(vals.Voltage);

				str += CSV.stringify(vals);
			}
			res.contentType('application/csv');
			res.setHeader('Content-disposition', 'attachment; filename="data.csv"');
			res.send(str);
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
