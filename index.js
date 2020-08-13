//In react.js we used to import files, but here we REQUIRE the node modules
const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;


const app = express();      //Now express provides us various methods to construct a web server

app.use((req, res, next) => {       //Here, we'll declare a function that'll be called to set up a server. Next is used when we have to invoke an additional middleware
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express server.</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})
