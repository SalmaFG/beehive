var mongoose = require('mongoose');

var activity = new mongoose.Schema({
    annotatedImageCount: {
        type: Number
    },
    credit: {
        type: Number,
        contentType: String
    },
    timestamp: {
        type: Date
    },
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    },
    workerUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'WorkerUser'
    }
});

module.exports = {
    model: mongoose.model('Activity', activity)
};