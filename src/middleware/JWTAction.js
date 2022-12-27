const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
import jwt from 'jsonwebtoken';

const createJWT = () => {
    let payload = { name: 'Anhhung', address: 'Vungtau' }
    let key = process.env.JWT_SECRET || 'anhhungth'
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log('>>>>>>> check token : ', token)
    } catch (e) {
        console.log(e)
    }

    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET || 'anhhungth'
    let data = null
    try {
        let decoded = jwt.verify(token, key)
        data = decoded
    } catch (e) {
        console.log(e)
    }
    return data
}

module.exports = {
    createJWT,
    verifyToken
}