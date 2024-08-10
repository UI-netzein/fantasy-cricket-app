


require('dotenv').config();

// config.js
module.exports = {
	app: {
		port: process.env.PORT || 3000,
		appName: process.env.APP_NAME || 'fantasy-team',
		env: process.env.NODE_ENV || 'development',
	},
	db: {
		uri:process.env.MONOGO_URI
	},
};
