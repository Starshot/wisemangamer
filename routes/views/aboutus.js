var keystone = require('keystone');
var Index = keystone.list('Index');
var AboutUs = keystone.list('AboutUs');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = '/aboutme';
    locals.validationErrors = {};
    // Load the current post
    view.on('init', function (next) {
        AboutUs.model.findOne()
            .exec(function(err, results){
                locals.aboutus = results;
                next(err);
            });
    });


    view.render('index');
};

