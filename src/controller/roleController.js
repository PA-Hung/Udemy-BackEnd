import userApiService from '../service/userApiService'
import roleApiService from '../service/roleApiService'

const readFunc = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (e) {
        console.log('>>>>> error from get all roles :', e)
        return res.status(500).json({
            EM: 'Error from roleController', // Error Message
            EC: '-1', // Error Code
            DT: '', // Data
        })
    }

}

const createFunc = async (req, res) => {
    try {
        // validate
        //console.log('>>>>>>>>> check data from frond end:', req.body)
        let data = await roleApiService.createNewRoles(req.body);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (e) {
        console.log('>>>>> error from get all user :', e)
        return res.status(500).json({
            EM: 'Error from server', // Error Message
            EC: '-1', // Error Code
            DT: '', // Data
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        // validate
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (e) {
        console.log('>>>>> error from get all user :', e)
        return res.status(500).json({
            EM: 'Error from server', // Error Message
            EC: '-1', // Error Code
            DT: '', // Data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id)
        console.log('check id role send from front end', req.body.id)
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (e) {
        console.log('>>>>> error from detele role controller:', e)
        return res.status(500).json({
            EM: 'Error from server', // Error Message
            EC: '-1', // Error Code
            DT: '', // Data
        })
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}


