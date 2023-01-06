import db from "../models";
import _ from 'lodash';

const createNewRoles = async (roles) => {
    try {

        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        //console.log('>>>>>>>>>>> array2: ', currentRoles)
        const array1 = roles;
        const array2 = currentRoles;
        const difference = _.differenceWith(array1, array2, (obj1, obj2) => obj1.url === obj2.url);
        //console.log('>>>>>>>>>>>>>>check difference array', difference);
        if (difference.length === 0) {
            return {
                EM: 'Nothing to create',
                EC: 0,
                DT: [],
            }
        } else {
            await db.Role.bulkCreate(difference)
            return {
                EM: `Create roles succeeds: ${difference.length} roles`,
                EC: 0,
                DT: [],
            }
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from createNewGroups service',
            EC: 1,
            DT: [],
        }
    }
}

const getAllRoles = async () => {
    try {
        let roles = await db.Role.findAll({
            attributes: ["id", "url", "description"],
            order: [
                ['url', 'DESC']
            ],
            raw: true,
            nest: true,
        })
        //console.log('check user: ', roles)
        if (roles) {
            return {
                EM: 'Get Roles success',
                EC: 0,
                DT: roles,
            }
        } else {
            return {
                EM: 'Role empty',
                EC: 0,
                DT: [],
            }
        }

    } catch (e) {
        console.log('>>>>> check error Get Roles success from roleApiService:', e)
        return {
            EM: 'Get Roles error',
            EC: 1,
            DT: [],
        }
    }
}

const deleteRole = async (id) => {
    try {
        console.log('>>>>>>>>>>>>>>> id', id)
        let role = await db.Role.findOne({
            // Role này không phải là role bảng trong database
            // Role này là component Role trong models role.js
            where: { id: id }
        })
        if (role) {
            await role.destroy()
            return {
                EM: 'Xóa role thành công !',
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: 'Role not exist',
                EC: 2,
                DT: [],
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from delete role service',
            EC: 1,
            DT: [],
        }
    }
}

const getAllRolesByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Role empty',
                EC: 0,
                DT: [],
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            },

        })

        if (roles) {
            return {
                EM: 'Get Roles by group success',
                EC: 0,
                DT: roles,
            }
        } else {
            return {
                EM: 'Role empty',
                EC: 0,
                DT: [],
            }
        }

    } catch (e) {
        console.log('>>>>> check error Get Roles by group from roleApiService:', e)
        return {
            EM: 'Get Roles error',
            EC: 1,
            DT: [],
        }
    }
}

const assignRoleToGroup = async (data) => {
    try {
        // console.log('>>>>> check data from front end >>>>>>>>>', data)
        // console.log('>>>>> check data assign roles', data.groupRoles)

        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })

        await db.Group_Role.bulkCreate(data.groupRoles)

        return {
            EM: `Assign roles to group succeeds`,
            EC: 0,
            DT: [],
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Error from assignRoleToGroup service',
            EC: 1,
            DT: [],
        }
    }
}

module.exports = {
    createNewRoles, getAllRoles, deleteRole, getAllRolesByGroup, assignRoleToGroup
}