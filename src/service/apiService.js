import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import { Op } from 'sequelize';

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
            password: hashPass
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
    console.log('>>>>>>>> check raw Login data', rawLoginData)
    try {
        let userLogin = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawLoginData.valueLogin },
                    { phone: rawLoginData.valueLogin }
                ]
            }
        })

        // console.log('>>>>>>> check user login javascript object', userLogin.get({ plain: true }))
        // console.log('>>>>>>> check user login sequelize object', userLogin)
        if (userLogin) {
            let isCorrectPassword = checkPassword(rawLoginData.password, userLogin.password)
            if (isCorrectPassword === true) {
                return {
                    EM: 'User login succeed', // Error Message
                    EC: 0, // error code
                    DT: '',
                }
            }

        }

        console.log('Không tìm thấy người dùng có User:', rawLoginData.valueLogin, '/Password:', rawLoginData.password)
        return {
            EM: 'Email/điện thoại hoặc mật khẩu không đúng', // Error Message
            EC: 1, // error code
            DT: '',
        }




        if (isPhoneExist === true) {
            return {
                EM: 'Email hoặc số điện thoại không đúng', // Error Message
                EC: 1, // error code
                DT: '',
            }
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