var http = require('http');
var url = require('url');
 
function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('request for ' + pathname + ' received.');
        route(handle, pathname, response);
        response.writeHead(200, {'Content-Type' : 'text/plain'});
        response.write('UnivTable');
        
    }
    http.createServer(onRequest).listen(8001);
    console.log('server has started.');
}

exports.start = start;
