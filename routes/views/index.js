var keystone = require('keystone');
var Post = keystone.list('Post');
var Index = keystone.list('Index');
var Video = keystone.list('Video');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = '/';
	locals.validationErrors = {};
	// Load the current post
	view.on('init', function (next) {
		Post.paginate({
			page: req.query.page || 1,
			perPage: 2,
			maxPages: 10
		})
			.where('state', 'published')
			.sort('-publishedDate')
			.exec(function(err, results) {
				locals.posts = results;
				next(err);
			});
		next();
	});

	// code for displaying video posts
	locals.section = '/';
	locals.validationErrors = {};
	view.on('init', function (next) {
		Video.paginate({
			page: req.query.page || 1,
			perPage: 2,
			maxPages: 10
		})
			.where('state', 'published')
			.sort('-publishedDate')
			.exec(function(err, results) {
				locals.videos = results;
				next(err);
			});

	});
	view.render('index');
};
