import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';

const router = express.Router();
const initApiRoutes = (app) => {
    // path, handler
    // rest api
    // Get - R, POST - C, PUT - U, DELETE - D
    router.get('/test-api', apiController.testAPI)

    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)

    //Get - R
    router.get('/user/read/', userController.readFunc)
    //POST - C
    router.post('/user/create', userController.createFunc)
    //PUT - U
    router.put('/user/update', userController.updateFunc)
    //DELETE - D
    router.delete('/user/delete', userController.deleteFunc)

    router.get('/group/read/', groupController.readFunc)

    return app.use("/api/v1/", router)
}

export default initApiRoutes;