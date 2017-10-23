var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var AboutUs = new keystone.List('AboutUs', {

});

AboutUs.add({
    text: { type: Types.Html, wysiwyg: true, height: 400 },
    photo: {type: Types.CloudinaryImage },
});

AboutUs.defaultColumns = 'text, photo';
AboutUs.register();
