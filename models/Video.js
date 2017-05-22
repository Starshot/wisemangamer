var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Video Model
 * ==========
 */

var Video = new keystone.List('Video', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});
