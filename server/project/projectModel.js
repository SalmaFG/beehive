var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    path: {
        type: String
    }
});

var Project = mongoose.Schema({
    businessUser: {
        type: Schema.ObjectId,
        ref: 'BusinessUser'
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    usedStorage: {
        type: Number
    },
    labelNames: {
        type: [String]
    },
    package: {
        type: Schema.ObjectId,
        ref: 'Package'
    },
    numberOfAnnotations: {
        type: Number
    },
    tutorial: {
        data: Buffer,
        content_type: String
    },
    images: {
        type: [imageSchema]
    }
});

module.exports = mongoose.model('Project', Project);