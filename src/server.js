import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './routes/web';
import initApiRoutes from "./routes/api";
import connection from './config/connectDB';
import configCORS from './config/cors';
import { createJWT, verifyToken } from './middleware/JWTAction';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
//console.log(require("dotenv").config({ path: path.resolve(__dirname, './.env') }));

const app = express();
// config CORS
configCORS(app)
// config bordyParser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// test JWT
createJWT()
let decodedData = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5oaHVuZyIsImFkZHJlc3MiOiJWdW5ndGF1IiwiaWF0IjoxNjcyMTE0NDI0fQ.2iOeDfgNaTCW00mVCXKmkEq_-Q_a25dcHZeUkuAlvuA')
console.log(decodedData)
// config view engine
viewEngine(app)

// init web routes
initWebRoutes(app)
initApiRoutes(app)
// connect database
connection();

const PORT = process.env.PORT || 6969;
// port === undefined => port = 6969

app.listen(PORT, () => {
    console.log("JWT Backend Nodejs is runing on the port:" + PORT)
})