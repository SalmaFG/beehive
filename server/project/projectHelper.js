var Image = require('../image/imageModel');
var ImageController = require('../image/imageController');
var async = require('async');
var fs = require('fs');
var unzip = require('unzip');

exports.uploadDataSet = function (read_path, project, callback) {
    var write_path = './images/' + project._id;
    var imageIds = [];
    async.waterfall([
        function (next) {
            if (!fs.existsSync('./images')) {
                fs.mkdir('./images/', function(){
                    fs.mkdir(write_path, function(){
                        next();
                    });
                });
            } else if (!fs.existsSync(write_path)) {
                fs.mkdir(write_path, function(){
                    next();
                });
            }
            else next();
        }, function (next) {
            var readStream = fs.createReadStream(read_path)
            .pipe(unzip.Extract({ path: write_path }));
            readStream
            .on('data', function (chunk) {
                console.log(chunk);
                readStream.destroy();
                next();
            })
            .on('end', function () {
                console.log('All the data in the file has been read');
                next();
            })
            .on('close', function (err) {
                console.log('Stream has been destroyed and file has been closed');
                next();
            });
        }, function (next) {
            fs.readdir(write_path, 'utf8', function (err, filenames) {
                if (err) return callback(err);
                else {
                    filenames.forEach(function (filename) {
                         var imagePath = write_path + '/' + filename;
                            ImageController.create(imagePath, filename, function(err, imageId) {
                                if (err) return callback(err);
                                console.log("IMAGE SUCCESSFULLY SAVED: ", imageId);
                                project.images.push(imageId);
                                project.save(function (err) {
                                    if (err) return callback(err);
                                });
                                
                            });
                    });
                    return callback(null, project);
                }
            });
        }]);
};