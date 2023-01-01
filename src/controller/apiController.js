import apiService from '../service/apiService';


const testAPI = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test API'
    })
}

const handleRegister = async (req, res) => {
    //console.log('>>>>>> check data truyen vao', req.body)
    try {
        // req.body: email,phone,username,password
        if (!req.body.email || !req.body.phone || !req.body.pass) {
            return res.status(200).json({
                EM: 'Missing required parameters', // Error Message
                EC: '1', // error code
                DT: '', //Data
            })
        }
        if (req.body.pass && req.body.pass.length < 4) {
            return res.status(200).json({
                EM: 'Mật khẩu phải có 4 ký tự trở lên', // Error Message
                EC: '1', // error code
                DT: '', //Data
            })
        }
        // services : create user
        let data = await apiService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // error code
            DT: data.DT, // Data
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'Error from server', // Error Message
            EC: '-1', // error code
            DT: '', //Data
        })
    }

}

const handleLogin = async (req, res) => {
    //console.log('>>>>>>>> check login', req.body)
    try {
        let data = await apiService.handleUserLogin(req.body)
        // set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
            })
        }
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error from server', // Error Message
            EC: '-1', // Error Code
            DT: '', // Data
        })
    }

}

module.exports = {
    testAPI, handleRegister, handleLogin
}