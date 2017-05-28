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

Video.add({
    title: { type: String, required: true },
    subTitle: { type: String },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    author: { type: Types.Relationship, ref: 'User', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
    image: { type: Types.CloudinaryImage },
    content: {

        extended: { type: Types.Code, height: 400,language: 'html' },
    },
    categories: { type: Types.Relationship, ref: 'PostCategory', many: true },  
});

Video.schema.virtual('content.full').get(function () {
    return this.content.extended || this.content.brief;
});

Video.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Video.register();
