import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './routes/web';
import connection from './config/connectDB';

require('dotenv').config()

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// config bordyParser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// config view engine
viewEngine(app)
// init web routes
initWebRoutes(app)
// connect database
connection();

const PORT = process.env.PORT || 6969;
// port === undefined => port = 6969

app.listen(PORT, () => {
    console.log("JWT Backend Nodejs is runing on the port:" + PORT)
})