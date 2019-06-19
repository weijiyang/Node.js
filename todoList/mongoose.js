const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/runoob', { useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connnect successful!');
});
const Schema = mongoose.Schema;
const Comment = new Schema({
    title: { type: String, default: '这里是默认title' },
    desc: { type: String, default: '这里是默认desc'},
    isFinished: { type: Boolean, default: false }
});

const myModel = mongoose.model('site', Comment);

const insert = function (item) {
    return new Promise((resolve, reject) => {
        var content = new myModel(item);
        content.save(function (err, items) {
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
};

const del = function (_id) {
    return new Promise((resolve, reject) => {
        myModel.deleteOne({ _id: _id }, function (err, items) {
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
};
const get = function (text) {
    let reg = new RegExp(text, 'i');
    return new Promise((resolve, reject) => {
        myModel.find({
            $or : [
                {title : {$regex : reg}},
                {desc : {$regex : reg}}
            ]}).find(function(err, items) {
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });

};

exports.get = get;
exports.insert = insert;
exports.del = del;




