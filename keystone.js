// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

process.env.CLOUDINARY_URL = process.env.CLOUDINARY_URL || 'cloudinary://431195557586964:AqZvK1egKeayDruNd6uME4YWKQw@hc7gvvqtz'

process.env.COOKIE_SECRET = process.env.COOKIE_SECRET || '4a2f33310b983472078fb8297333d49292413104c508fa43a55bb3b2be6f7cffdf5ff15babcca056bfd142d97e3a4cd7f28e11cc999067b37e881da80c037e40';

// Require keystone
var keystone = require('keystone');

keystone.init({
	'name': 'Wisemangamer',
	'brand': 'Wisemangamer',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

keystone.set('cloudinary secure', true);

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	users: 'users',
});


keystone.start();
