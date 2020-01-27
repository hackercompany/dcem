const express = require('express');
const Readings = require('./models');
const CSV = require('csv-string');
const route = express.Router();
const btPc = require('./batterypercentage');
const { latestReadings } = require('./updater');
route.get('/', (req, res) => {
	try {
		Readings.findAll().then(data => {
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
		Readings.findAll().then(data => {
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
		Readings.create({
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

route.post('/new-readings/', (req, res) => {
	let response_body = {};
	try {
		console.log(req.body);

		response_body = req.body.json;

		response_body = response_body.replace(RegExp('(?::\\s*0*)([0-9])([0-9]*)(.[0-9])([0-9]*)', 'g'), ':$1$2$3$4'); // This prevents leading zeroes 😎

		const parsed_response = JSON.parse(response_body);
		latestReadings.value = response_body;
		Readings.bulkCreate(
			parsed_response.DCEM,
			result => {
				// console.log(res);
				res.send({
					error: false,
					message: 'Records Added to database',
					result: result,
				});
			},
			error => {
				console.log(error);

				throw error;
			}
		).then(result => {
			res.send({
				error: false,
				message: 'Records Added to database',
				result: result,
				latest_readings: latestReadings,
			});
		});
	} catch (error) {
		res.status(500).send({
			error: true,
			message: 'Some error occured during executing your result',
			response_body: response_body,
			error_object: error,
			request_body: req.body,
		});
		console.log('Error in parsing data', response_body);
	}
});

route.get('/:id', (req, res) => {
	try {
		console.log(req.params.id);

		Readings.findAll({
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
