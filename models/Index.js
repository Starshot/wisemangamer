var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Index = new keystone.List('Index', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

Index.add({
    title: { type: String, required: true },
    logo: { type: Types.CloudinaryImage },
    phoneNumber: { type: String },
    stateZip: {type: String },
    contactEmail: {type: String },
    heroImage: { type: Types.CloudinaryImage },
    heroText: { type: String },
});


Index.defaultColumns = 'contactEmail, heroText, phoneNumber';
Index.register();

