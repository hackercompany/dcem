const Sequalize = require('sequelize');

// This one works as well...
/*
const sequalize = new Sequalize('devicestatus', 'root', '', {
	dialect: 'mariadb',
	host: 'localhost',
});

/** */

const sequalize = new Sequalize({
	dialect: 'sqlite',
	storage: 'db/database.sqlite',
	pool: {
		max: 5,
		min: 0,
		aquire: 30000,
		idle: 10000,
	},
	logging: data => {
		console.log('------------------------------------New DB Call--------------------------------');
		console.log(data.slice(0, 60));
		console.log('-------------------------------------------------------------------------------');
	},
});
/**/
module.exports = sequalize;
