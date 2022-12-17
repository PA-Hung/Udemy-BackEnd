import udemyService from '../service/udemyService';


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
        let data = await udemyService.registerNewUser(req.body)
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

module.exports = {
    testAPI: testAPI,
    handleRegister: handleRegister
}