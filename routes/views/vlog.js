var keystone = require('keystone');
var Index = keystone.list('Index');
var Video = keystone.list('Video');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = '/vlog';
    locals.validationErrors = {};
    // Load the current post
    view.on('init', function (next) {
        Video.paginate({
            page: req.query.page || 1,
            perPage: 10,
            maxPages: 10
        })
            .where('state', 'published')
            .sort('-publishedDate')
            .exec(function(err, results) {
                locals.videos = results;
            });

        Index.model.findOne()
            .exec(function(err, results) {
                locals.data = results;
                    var v = keystone.list('Video').model.findById(req.params.video);
                    v.exec(function(err, result){
                        locals.video = result;
                        next(err);
                });
            });
    });


    view.render('index');
};

