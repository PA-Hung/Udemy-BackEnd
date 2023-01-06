const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
import jwt from 'jsonwebtoken';

const nonSercurePaths = ['/', '/register', '/login', '/logout'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (e) {
        console.log(e)
    }

    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (e) {
        console.log(e)
    }
    return decoded
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const checkUserJWT = (req, res, next) => {
    if (nonSercurePaths.includes(req.path)) { return next() }
    let tokenFromHeader = extractToken(req)
    let cookies = req.cookies;
    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated the user'
            })
        }
        //console.log('>>>>> my jwt: ', cookies.jwt)
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSercurePaths.includes(req.path) || req.path === '/account') { return next() }
    if (req.user) {
        //let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentURL = req.path
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Bạn không có quyền truy cập roles'
            })
        }
        let canAccess = roles.some(item => item.url === currentURL || currentURL.includes(item.url))
        // console.log('>>>>>>>>>>>>>>>>>>>XXXXXXXXXXXXXXXXXXXXXXXXXX>>>>>>>>>>>>>>>>')
        // console.log('>>> decoded URL : ', req.user.groupWithRoles.Roles)
        // console.log('>>> current URL : ', req.path)

        if (canAccess === true) {
            next()
        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'Bạn không có quyền truy cập url'
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
        })
    }
}

module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}