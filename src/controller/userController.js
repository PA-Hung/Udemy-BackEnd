import userApiService from '../service/userApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page
            let limit = req.query.limit

            let data = await userApiService.getAllUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        } else {
            let data = await userApiService.getAllUser();
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }

    } catch (e) {
        console.log('>>>>> error from get all user :', e)
        return res.status(500).json({
            EM: 'Error from server', // Error Message
            EC: '-1', // Error Code
            DT: '', // Data
        })
    }

}

const createFunc = async (req, res) => {
    try {
        // validate
        let data = await userApiService.createUser(req.body);
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

const updateFunc = (req, res) => {
    try {

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
        console.log('Check user id from front end', req.body)
        let data = await userApiService.deleteUser(req.body.id)
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (e) {
        console.log('>>>>> error from detele user controller:', e)
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


