const Sequelize = require('sequelize');
class Settings extends Sequelize.Model {}
const SettingsSchema = {
	name: Sequelize.DataTypes.STRING,
	value: Sequelize.DataTypes.STRING,
};

const sequelize = require('../db');
Settings.init(SettingsSchema, { sequelize, modelName: 'settings' });
Settings.sync();

module.exports = Settings;
