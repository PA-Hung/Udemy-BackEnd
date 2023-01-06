import db from "../models";
import apiService from '../service/apiService'

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
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            raw: true,
            nest: true,
            order: [['id', 'ASC']],
            include: {
                model: db.Group,
                attributes: ["name", "description", "id"]
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
    let hashPass = apiService.hashUserPassword(data.password)
    try {
        // check email/phone đã tồn tại chưa ?
        let isEmailExist = await apiService.checkEmailExist(data.email)
        //console.log('check email ton tai >>>>>>', isEmailExist)
        if (isEmailExist === true) {
            return {
                EM: 'Email đã tồn tại', // Error Message
                EC: 1, // error code
                DT: 'email',
            }
        }
        let isPhoneExist = await apiService.checkPhoneExist(data.phone)
        if (isPhoneExist === true) {
            return {
                EM: 'Phone đã tồn tại', // Error Message
                EC: 1, // error code
                DT: 'phone',
            }
        }
        await db.User.create({ ...data, password: hashPass })
        // copy lại cục data, riêng trường password thì ghi đè bằng hashPass
        return {
            EM: 'Create User success',
            EC: 0,
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from create user service',
            EC: 1,
            DT: [],
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Update error with empty group Id',
                EC: 1,
                DT: 'group',
            }
        }
        let user = await db.User.findOne(
            { where: { id: data.id } }
        )
        //console.log('>>>>>>>>>> check user data:', data)
        //console.log('>>>>>>>>>> check user:', user)
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: 'Update user succeeds',
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: 'Update error',
                EC: 1,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from update user service',
            EC: 1,
            DT: [],
        }
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