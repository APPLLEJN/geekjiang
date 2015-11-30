/**
 * Created by jiangnan on 15/11/25.
 */
import express from 'express'
import http from 'http'
import render from './render'
const webpackConfig = require('../../../webpack.config.js')
const webpack  = require('webpack')
const compiler = webpack(webpackConfig)

var app = express();
//var mongoose = require('mongoose');
console.log(render)

const server = http.createServer(app)

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

// Do anything you like with the rest of your express application.

app.get("/", function(req, res) {
    //res.sendFile( process.cwd()+'/index.html');
    render()
});


//mongoose.connect('mongodb://localhost/geekjiang');
//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function (callback) {
//    // yay!
//    console.log('success')
//    var PersonSchema = new mongoose.Schema({
//        name:String   //定义一个属性name，类型为String
//    });
//    var PersonModel = db.model('Person',PersonSchema);
//    var personEntity = new PersonModel({name:'geekjiang'});
//    console.log(personEntity.name); //Krouky
//});


server.listen(8080, err => {
    if(err) console.log(`error ${err}`)
    console.log('server at localhost:8080')
})