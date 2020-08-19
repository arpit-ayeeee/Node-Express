//In react.js we used to import files, but here we REQUIRE the node modules
const express = require('express');
const http = require('http');
const morgan= require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;


const app = express();      //Now express provides us various methods to construct a web server
//Whenever we have to use a middleware, we use app.use()
app.use(morgan('dev'));     //Morgan is used to print out additional info to the screen
app.use(bodyParser.json());   //This allows us to parse the body of the incoming req message in the form of req.body, which is formatted in json

//app.all will be executed for all the requests(get, put, post, delete)
app.all('/dishes', (req, res, next) => {       //It takes endpoints as first para and callback function as second.
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next(); //Next function will continue to look for additional spec functions below this app.all function
});

//OPERATION ON DISHES
//Get means we're fetching the dish from server
app.get('/dishes', (req, res, next) => {       //Now the modified co  value of res, will be passed to this function from app.all if get req is recieved
    res.end("Dishes will come from here!");
});

//Post means we're posting a new dish to the server
app.post('/dishes', (req, res, next) => {      //When we recive a post req, the value will come to this function from app.all
     res.end("Will add the dish : " + req.body.name + "with details : " + req.body.description);
});

//PUT
app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported of dishes");
});

//DELETE means we're deleting a dish from server
app.delete('/dishes', (req, res, next) => {     
    res.end("Deleting all the dishes ");
});

//OPERATION ON DISH ID
app.get('/dishes/:dishId', (req, res, next) => {      
    res.end("Will send details of the dish: " + req.params.dishId + "to you!"); //As we'll show the parameter value
});

app.post('/dishes/:dishId', (req, res, next) => {    //We cannot just post a dishid, cause it's a modification, so not supported  
    res.statusCode = 403;
    res.end("POST operation not supported of /dishes/" + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {   //We can modify using put operation
    res.write("Updating the dish: " + req.params.dishId + "\n");   //res.writeis used to add a line to response
    res.end("Will update the dish: " + req.body.name + "with details: " + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {     
    res.end("Deleting dish: " + req.params.dishId);
});

//To display static, using express we can simply display the files in our folder
app.use(express.static(__dirname + '/public'));      //This tell express to serve static files from public from the root folder of this project ie __dirname

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
