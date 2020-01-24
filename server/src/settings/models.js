const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

class Settings extends Model {}

Settings.init(
	{
		name: DataTypes.STRING,
		value: DataTypes.STRING,
	},
	{ sequelize, modelName: 'settings' }
);

sequelize.sync();
/*.then(() => {
		Settings.create({
			name: 'Version',
			value: '1.0.0',
		});
	})
	.then(set => {
		console.log(set);
	});*/

module.exports = Settings;
