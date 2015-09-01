var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');
var request = require('request');

var app = express();

var conf = {
    ip: '192.168.33.10',
    host_header: 'testing.feedhenry.me'
};

app.all('/configure', function( req, resp ) {
    if (req.query['ip']) {
        conf.ip = req.query['ip'];
    }
    if (req.query['host_header']) {
        conf.host_header = req.query['host_header'];
    }
    resp.status(200).json(conf);
});

app.all('/*', function( req, resp ) {
    req.pipe( request(  {
        url: 'https://' + conf.ip + req.originalUrl,
        headers: { 'Host': conf.host_header  }
    } ) ).pipe( resp );
});
// fhlint-end

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
module.exports = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port); 
});