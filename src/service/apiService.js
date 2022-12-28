import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService';
import { createJWT } from '../middleware/JWTAction'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

const hashUserPassword = (userPassword) => {
    let hashUserPassword = bcrypt.hashSync(userPassword, salt);
    return hashUserPassword
}

const checkEmailExist = async (userEmail) => {
    let userE = await db.User.findOne({
        where: { email: userEmail }
    })
    if (userE) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let userP = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (userP) {
        return true;
    }
    return false;
}

const registerNewUser = async (rawUserData) => {
    try {
        // check email/phone đã tồn tại chưa ?
        let isEmailExist = await checkEmailExist(rawUserData.email)
        //console.log('check email ton tai >>>>>>', isEmailExist)
        if (isEmailExist === true) {
            return {
                EM: 'Email đã tồn tại', // Error Message
                EC: 1, // error code
                DT: 'email',
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone)
        if (isPhoneExist === true) {
            return {
                EM: 'Phone đã tồn tại', // Error Message
                EC: 1, // error code
                DT: 'phone',
            }
        }
        // hash password
        let hashPass = hashUserPassword(rawUserData.pass)

        /// create new user
        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: hashPass,
            groupId: 4
        })
        return {
            EM: 'Đã tạo thành công người dùng', // Message
            EC: 0 // error code
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from server', // Error Message
            EC: -2, // error code
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true
}

const handleUserLogin = async (rawLoginData) => {
    //console.log('>>>>>>>> check raw Login data', rawLoginData)
    try {
        let userLogin = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawLoginData.valueLogin },
                    { phone: rawLoginData.valueLogin }
                ]
            }
        })

        if (userLogin) {
            let isCorrectPassword = checkPassword(rawLoginData.password, userLogin.password)
            if (isCorrectPassword === true) {
                // let token

                // test roles
                let groupWithRoles = await getGroupWithRoles(userLogin)
                let payload = {
                    email: userLogin.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload)
                return {
                    EM: 'User login succeed', // Error Message
                    EC: 0, // error code
                    DT: {
                        access_token: token,
                        groupWithRoles: groupWithRoles
                    },
                }
            }

        }

        console.log('Không tìm thấy người dùng có User:', rawLoginData.valueLogin, '/Password:', rawLoginData.password)
        return {
            EM: 'Email/điện thoại hoặc mật khẩu không đúng', // Error Message
            EC: 1, // error code
            DT: '',
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from server', // Error Message
            EC: -2, // error code
        }
    }
}

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExist,
    checkPhoneExist,
    checkPassword
}