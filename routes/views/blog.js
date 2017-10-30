var keystone = require('keystone');
var Index = keystone.list('Index');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = '/blogpost';
	locals.validationErrors = {};
	// Load the current post
	view.on('init', function (next) {
			var p = keystone.list('Post').model.findById(req.params.post);
			p.exec(function(err, result){
				locals.post = result;
				next(err);
			});

	});
	
	view.render('index');
};
