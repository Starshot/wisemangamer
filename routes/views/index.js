var keystone = require('keystone');
var Post = keystone.list('Post');
var Index = keystone.list('Index');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = req.url;
	locals.validationErrors = {};
	// Load the current post
	view.on('init', function (next) {
		Index.model.findOne()
			.exec(function(err, results) {
				locals.data = results;
				if(locals.section == '/blog') {
					Post.paginate({
						page: req.query.page || 1,
						perPage: 10,
						maxPages: 10
					})
						.where('state', 'published')
						.sort('-publishedDate')
						.exec(function(err, results) {
							locals.posts = results;
							next(err);
						});
				} else {
					Post.model.find()
						.where('state', 'published')
						.sort('-publishedDate')
						.limit(5)
						.exec(function(err, results) {
							locals.posts = results;
							next();
						});
				}
			});
	});
	view.render('index');
};
