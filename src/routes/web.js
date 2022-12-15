import express from "express";
import homeController from "../controller/homeController";
import apiController from '../controller/apiController';


const router = express.Router();
const initWebRoutes = (app) => {
    router.get('/', homeController.handleTest);
    router.get('/user', homeController.handleUserPage);

    router.post('/create-user', homeController.handleCreateNewUser);
    router.get('/delete-user/:id', homeController.handleDeleteUser);
    router.get('/get-update-user/:id', homeController.handleGetInfoUpdateUser);
    router.post('/post-update-user', homeController.handlePostInfoUpdateUser);

    router.get('/api/test-api', apiController.testAPI)

    //rest api

    return app.use("/", router)
}

export default initWebRoutes;