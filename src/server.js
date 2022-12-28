import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './routes/web';
import initApiRoutes from "./routes/api";
import connection from './config/connectDB';
import configCORS from './config/cors';
import cookieParser from "cookie-parser";

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
//console.log(require("dotenv").config({ path: path.resolve(__dirname, './.env') }));

const app = express();
// config CORS
configCORS(app)
// config bordyParser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// config view engine
viewEngine(app)

// congif cookieParser
app.use(cookieParser())

// init web routes
initWebRoutes(app)
initApiRoutes(app)
// connect database
connection();

const PORT = process.env.PORT || 6969;
// port === undefined => port = 6969

app.use((req, res,) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log("JWT Backend Nodejs is runing on the port:" + PORT)
})