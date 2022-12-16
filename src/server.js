import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './routes/web';
import initApiRoutes from "./routes/api";
import connection from './config/connectDB';
import configCORS from './config/cors';

require('dotenv').config()

const app = express();
// config CORS
configCORS(app)
// config bordyParser 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// config view engine
viewEngine(app)
// init web routes
initWebRoutes(app)
initApiRoutes(app)
// connect database
connection();

const PORT = process.env.PORT || 6969;
// port === undefined => port = 6969
console.log('>>>>>>>>> check port:', process.env.PORT)

app.listen(PORT, () => {
    console.log("JWT Backend Nodejs is runing on the port:" + PORT)
})