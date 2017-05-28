var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'videocollection';
    locals.filters = {
        video: req.params.video,
    };
    locals.data = {
        videos: [],
    };

    // Load the current post
    view.on('init', function (next) {

        var v = keystone.list('Video').model.findOne({
            state: 'published',
            slug: locals.filters.video,
        }).populate('author categories');

        v.exec(function (err, result) {
            locals.data.video = result;
            next(err);
        });

    });

    // Load other posts
    view.on('init', function (next) {

        var v = keystone.list('Video').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

        v.exec(function (err, results) {
            locals.data.videos = results;
            next(err);
        });

    });

    // Render the view
    view.render('video');
};

