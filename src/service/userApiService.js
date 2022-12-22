import db from "../models";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashUserPassword = bcrypt.hashSync(userPassword, salt);
    return hashUserPassword
}

const getAllUser = async () => {

    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            raw: true,
            nest: true,

            include: {
                model: db.Group,
                attributes: ["name", "description"]
            },
        })
        //console.log('check user: ', users)
        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users,
            }
        } else {
            return {
                EM: 'Data empty',
                EC: 0,
                DT: [],
            }
        }

    } catch (e) {
        console.log('>>>>> check error get all user from userApiService:', e)
        return {
            EM: 'Get data error',
            EC: 1,
            DT: [],
        }
    }
}

const getAllUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            raw: true,
            nest: true,
            include: {
                model: db.Group,
                attributes: ["name", "description"]
            },
        },)

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        //console.log('check data:', rows)
        return {
            EM: 'Get data success',
            EC: 0,
            DT: data,
        }
    } catch (e) {
        console.log(e)
    }
}

const createUser = async (data) => {
    let hashPass = hashUserPassword(data.password)
    try {
        await db.User.create({
            email: data.email,
            password: hashPass,
            username: data.username
        })
    } catch (e) {
        console.log(e)
    }
}

const updateUser = async (data) => {
    try {
        let user = db.User.update(
            { email: data.email, username: data.username },
            { where: { id: data.id } })

    } catch (e) {
        console.log(e)
    }

}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy()
            return {
                EM: 'Xóa người dùng thành công !',
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'User not exist',
                EC: 2,
                DT: [],
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from delete user service',
            EC: 1,
            DT: [],
        }
    }

}

module.exports = {
    getAllUser, createUser, updateUser, deleteUser, getAllUserWithPagination
}