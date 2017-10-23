var keystone = require('keystone');
var Index = keystone.list('Index');
var AboutUs = keystone.list('AboutUs');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = '/aboutus';
    locals.validationErrors = {};
    // Load the current post
    view.on('init', function (next) {
        Index.model.findOne()
            .exec(function(err, results) {
                locals.data = results;
                console.log('does this work ');
                AboutUs.model.findOne()
                    .exec(function(err, results){
                        console.log(results);
                        locals.aboutus = results;
                        next(err);
                    });
            });
    });


    view.render('index');
};

