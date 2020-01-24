const Sequalize = require('sequelize');

const sequalize = new Sequalize({
	dialect: 'sqlite',
	storage: 'db/database.sqlite',
	pool: {
		max: 5,
		min: 0,
		aquire: 30000,
		idle: 10000,
	},
});

module.exports = sequalize;
