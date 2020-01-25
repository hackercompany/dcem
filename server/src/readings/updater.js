const http = require('http');

const Settings = require('../settings/models');
const Readings = require('./models');

let latestReadings = { value: '{"DCEM":[]}' };

async function wait(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

async function updater() {
	while (true) {
		try {
			const endpoint = await Settings.findAll({
				where: {
					name: 'endpoint',
				},
			});
			if (endpoint.length == 0) {
				console.log('Setting, endpoint not found, skipping fetch cycle');
			} else {
				const url = endpoint[0].value;
				console.log('Setting found, ', url, 'Sending get request');
				http.get(url, response => {
					let response_body = '';
					response.on('data', chunk => {
						response_body += chunk.toString();
					});
					response.on('end', () => {
						// console.log(JSON.parse(response_body));
						try {
							response_body.replace(
								RegExp('(?::\\s*0*)([0-9])([0-9]*)(.[0-9])([0-9]*)', 'g'),
								':$1$2$3$4'
							);
							const parsed_response = JSON.parse(response_body);
							latestReadings.value = response_body;

							Readings.bulkCreate(
								parsed_response.DCEM,
								res => {
									console.log(res);
								},
								error => {
									console.log('Some error occured', error);
								}
							);
						} catch (error) {
							console.log('Error in parsing data', response_body);
						}
					});
				});
			}
		} catch (error) {
			console.log('Some error occured', error);
		}
		await wait(4000);
	}
}

module.exports = { updater, latestReadings };
