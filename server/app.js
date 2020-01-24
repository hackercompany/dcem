const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const homeRoute = require('./src/homeroute');
const smRoute = require('./src/single-monitor');
const db = require('./src/db');
const updater = require('./src/readings/updater');

const apiRoute = require('./src/routes');

/**DB Connection test */
db.authenticate()
	.then(() => {
		// db.initModels(db.seq);
		updater();
		console.log('Database Connected Successfully');
		app.use(cors());
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use('/api', apiRoute);
		app.use('/dcem', express.static(path.join(__dirname, 'dcem')));
		app.get('/', (req, res) => {
			res.send('Working');
		});
		app.use('/home', homeRoute);
		app.use('/single-monitor', smRoute);
		app.use(function(req, res) {
			return res.status(404).redirect('/dcem/');
		});
		port = process.env.PORT || 8000;
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
