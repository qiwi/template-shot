/** this example renders the template into a stream
 * and then returns this image sream as a response for http request */


const {TemplateShot} =require( '../build/index');
// Load the http module to create an http server.
var http = require('http');

const templatePath = __dirname+'/templates';
console.log('looking for templates in:\n' + templatePath);

// initialize the library
const ts = new TemplateShot(templatePath);


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    // return the header for image
    response.writeHead(200, {"Content-Type": "image/png"});

    console.log('rendering template index.html\
        with "paragraph_text" parameter value set as "Test text"\
        with custom screen size\
        to stream and then piping the stream to http response');

    // render stream init
    const renderStream = ts.renderStream(
        'index.html',
        {'paragraph_text' : 'Stream is rendered to http'},
        {   
            screenSize: {
                width: 540,
                height: 900
            },
            shotSize: {
                width: 540,
                height: 'all'
            }
        });
    renderStream.pipe(response);
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
console.log("Open http://localhost:8000 in browser");
console.log("Or run `curl http://localhost:8000 > example4.png`\n in your linux comand prompt");

