var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;
var cors_proxy = require('cors-anywhere');

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});