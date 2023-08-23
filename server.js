// Command to run the program: node server.js




// We're using the http module to create an HTTP server
const http = require('http');

// The url module will help us parse URLs
const url = require('url');

// We're importing our API functions from api.js
const api = require('./api.js');

// This creates the server
const server = http.createServer(function(req, res) {
    // We parse the URL of the incoming request
    const parsed = url.parse(req.url, true);

    // If we're at the root URL and the method is GET...
    if (parsed.pathname === '/' && req.method === 'GET') {

        // We send back an HTML form for the user to fill out
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form method="post">First name: <input type="text" name="firstname"><br>Last name: <input type="text" name="lastname"><br><input type="submit" value="Get Data"></form>');
        res.end();
    } else if (req.method === 'POST') {  // If the method is POST...
        let body = '';

        // We collect the data from the request
        req.on('data', function(chunk) {
            body += chunk.toString();
        });

        req.on('end', function() {
            // We parse the body of the request to get the form data
            let urlSearch = new url.URLSearchParams(body);
            let firstname = urlSearch.get('firstname');
            let lastname = urlSearch.get('lastname');

            // We use the getTechy function to get data from the Techy API
            api.getTechy(function(error, techyResult) {
                if (error) {
                    // If there's an error, we return a 500 status code
                    res.writeHead(500);
                    res.end();
                    return;
                }
                // We then send the result to the Tisane API
                api.postTisnae(techyResult, function(error, tisaneResult) {
                    if (error) {
                        // If there's an error, we return a 500 status code
                        res.writeHead(500);
                        res.end();
                        return;
                    }
                    // If everything went well, we return the results to the user
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(`Hi ${firstname} ${lastname}, here are your outputs from Techy and Tisane APIs:<br/>Received text from Techy API: ${techyResult}<br/>Text extracted by Tisane API: ${tisaneResult}`);
                    res.end();
                });
            });
        });
    }
});

// We set the server to listen on port 3000
server.listen(3000, function() {
    console.log('Server is listening on port 3000');
});

