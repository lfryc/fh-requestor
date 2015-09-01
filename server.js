var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');
var request = require('request');

// list the endpoints which you want to make securable here
var securableEndpoints;
// fhlint-begin: securable-endpoints
securableEndpoints = [];
// fhlint-end

var app = express();

// TODO: Cors is disabled as of now, since it prevents /try route to proxy simply (see #3)
//app.use(cors());

// Note: the order which we add middleware to Express here is important!
//app.use('/sys', mbaasExpress.sys(securableEndpoints));
//app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
//app.use(express['static'](__dirname + '/public'));

// Note: important that this is added just before your own Routes
//app.use(mbaasExpress.fhmiddleware());

// fhlint-begin: custom-routes

var conf = {
    host: 'https://testing.feedhenry.me'
};

app.all('/configure', function( req, resp ) {
    conf.host = req.query['host'];
    resp.status(200).json(conf);
});

app.all('/*', function( req, resp ) {
    req.pipe( request(  conf.host + req.originalUrl ) ).pipe( resp );
});
// fhlint-end

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
module.exports = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port); 
});