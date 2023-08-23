// We're using the https module to make HTTP requests
const https = require('https');

// This function retrieves data from the Techy API
function getTechy(callback) {

    // These are the options for the HTTP request
    const options = {
        hostname: 'techy-api.vercel.app',
        port: 443,
        path: '/api/text',
        method: 'GET'
    };

    // This is where we make the request
    const req = https.request(options, function(res) {
        let data = '';

        // We collect the data as it comes in
        res.on('data', function(chunk) {
            data += chunk;
        });

        // Once the data is fully received, we pass it to the callback
        res.on('end', function() {
            callback(null, `<p>${data}</p>`);
        });
    });

    // If there's an error with the request, we pass that to the callback
    req.on('error', function(error) {
        callback(error);
    });

    // This finalizes the request
    req.end();
}

// This function sends data to the Tisane API
function postTisnae(input, callback) {

    // These are the options for the HTTP request
    const options = {
        hostname: 'api.tisane.ai',
        port: 443,
        path: '/helper/extract_text',
        method: 'POST',
        headers: {
            'Content-Type': 'text/html',
            'Ocp-Apim-Subscription-Key': 'ef26fb42b50f477f8ba0fe' // You can get your own authentication key through the Api's website
        }
    };

    // This is where we make the request
    const req = https.request(options, function(res) {
        let data = '';

        // We collect the data as it comes in
        res.on('data', function(chunk) {
            data += chunk;
        });

        // Once the data is fully received, we pass it to the callback
        res.on('end', function() {
            callback(null, data);
        });
    });

    // If there's an error with the request, we pass that to the callback
    req.on('error', function(error) {
        callback(error);
    });

    // This sends our input data with the request
    req.write(input);

    // This finalizes the request
    req.end();
}

// We export our two API functions so they can be used elsewhere
module.exports = { getTechy, postTisnae };

