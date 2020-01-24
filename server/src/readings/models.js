const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../db');

class Reading extends Model {}

Reading.init(
	{
		Location: DataTypes.STRING,
		DeviceID: DataTypes.STRING,
		Voltage: DataTypes.FLOAT,
		Current: DataTypes.FLOAT,
		Alarm: DataTypes.STRING,
		Gateway: DataTypes.STRING,
		Temperature: DataTypes.FLOAT,
		Code: DataTypes.STRING,
	},
	{ sequelize, modelName: 'reading' }
);

sequelize.sync();
module.exports = Reading;
