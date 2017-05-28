var keystone = require('keystone');
var Index = keystone.list('Index');
var Video = keystone.list('Video');
exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = '/videocollection';
    locals.validationErrors = {};
    // Load the current post
    view.on('init', function (next) {
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

