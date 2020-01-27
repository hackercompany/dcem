const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const homeRoute = require('./src/homeroute');
const smRoute = require('./src/single-monitor');
const db = require('./src/db');
const { updater, latestReadings } = require('./src/readings/updater');
const Readings = require('./src/readings/models');

const apiRoute = require('./src/routes');

/**DB Connection test */
db.authenticate()
	.then(() => {
		// db.initModels(db.seq);
		// updater();
		console.log('Database Connected Successfully');
		app.use(cors());
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.post('', (req, res) => {
			let response_body = {};
			try {
				console.log(req.body);

				response_body = req.body.json;

				response_body = response_body.replace(
					RegExp('(?::\\s*0*)([0-9])([0-9]*)(.[0-9])([0-9]*)', 'g'),
					':$1$2$3$4'
				); // This prevents leading zeroes 😎

				const parsed_response = JSON.parse(response_body);
				latestReadings.value = response_body;
				Readings.bulkCreate(
					parsed_response.DCEM,
					result => {
						res.send({
							error: false,
						});
					},
					error => {
						throw error;
					}
				).then(result => {
					res.send({
						error: false,
					});
				});
			} catch (error) {
				res.status(500).send({
					error: true,
				});
				console.log(error);
			}
		});
		app.use('/api', apiRoute);
		app.use('/dcem', express.static(path.join(__dirname, 'dcem')));
		app.get('/latest-readings', (req, res) => {
			res.send(JSON.parse(latestReadings.value));
		});
		app.use('/home', homeRoute);
		app.use('/single-monitor', smRoute);
		app.use(function(req, res) {
			return res.status(404).redirect('/dcem/');
		});
		port = 8000;
		app.listen(port, () => {
			console.log(`base URL\t\t: http://localhost:${port}/`);
			console.log(`Front-end URL\t\t: http://localhost:${port}/dcem/`);
			console.log(`Home URL \t\t: http://localhost:${port}/home/`);
			console.log(`Single Monitor URL\t: http://localhost:${port}/single-monitor/`);
		});
	})
	.catch(e => {
		console.error('Database cannot be connected...', e);
	});
