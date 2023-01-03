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

module.exports = {
    createNewRoles
}