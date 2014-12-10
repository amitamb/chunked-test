var http = require('http');
var fs = require('fs');
var url = require('url');

var scriptContent = fs.readFileSync('script.js', 'utf8');

var first =
  '<!DOCTYPE html>' +
  '<html lang="en">' +
    '<head>' +
      '<meta charset="utf-8">' +
      '<title>Chunked transfer encoding test</title>' +
      '<script>' +
      scriptContent +
      '</script>' +
    '</head>' +
  '<body>';

  first += 'Partial sentence is sent initially';

var second = ' which is completed later in 3 seconds.'

var total = first + second;

http.createServer(function (request, response) {

  // Don't know why it gets executed twice
  // console.log("I got executed for IP " + request.connection.remoteAddress);

  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;

  response.setHeader('Content-Type', 'text/html; charset=UTF-8');

  if (query.normal != undefined) {
    response.setHeader('Content-Length', Buffer.byteLength(total, 'utf8'));
  }
  else {
    response.setHeader('Transfer-Encoding', 'chunked');
  }

  response.write(first);

  // this chunk is sent after 3 seconds
  setTimeout(function(){
      
    response.end(second);
  }, 3000);

}).listen(process.env.PORT || 1337, null);