var keystone = require('keystone');
var Index = keystone.list('Index');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = '/blog';
	locals.validationErrors = {};
	// Load the current post
	view.on('init', function (next) {
		Index.model.findOne()
			.exec(function(err, results) {
				locals.data = results;
					var p = keystone.list('Post').model.findById(req.params.post);
					p.exec(function(err, result){
						locals.post = result;
						next(err);
					});
			});
	});


	view.render('index');
};
