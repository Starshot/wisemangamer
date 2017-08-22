var keystone = require('keystone');
var Index = keystone.list('Index');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = '/blog';
    locals.validationErrors = {};
    // Load the current post
    view.on('init', function (next) {
        Post.paginate({
            page: req.query.page || 1,
            perPage: 3,
            maxPages: 10
        })
            .where('state', 'published')
            .sort('-publishedDate')
            .exec(function(err, results) {
                locals.posts = results;
            });

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