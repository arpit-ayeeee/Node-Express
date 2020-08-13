//In react.js we used to import files, but here we REQUIRE the node modules
const express = require('express');
const http = require('http');
const morgan= require('morgan');

const hostname = 'localhost';
const port = 3000;


const app = express();      //Now express provides us various methods to construct a web server
app.use(morgan('dev'));     //Morgan is used to print out additional info to the screen
//To display html files
app.use(express.static(__dirname + '/public'));      //This tell express to serve static files from public from the root folder of this project ie __dirname
//Using express, we can simply display the files in our folder
//For usual display
app.use((req, res, next) => {       //Here, we'll declare a function that'll be called to set up a server. Next is used when we have to invoke an additional middleware
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express server.</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})
