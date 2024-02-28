import request from "@/axios/request.js";



/**添加队伍 */
export const addTeam = (data) => {
    return request({
        url: '/team/add',
        method: 'POST',
        data
    })
}

/**修改队伍 */
export const updateTeam = (data) => {
    return request({
        url: '/team/update',
        method: 'POST',
        data
    })
}