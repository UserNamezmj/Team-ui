import request from "@/axios/request.js";

/**查询所有未过期的房间 */
export const treamList = (data) => {
    return request({
        url: '/team/list',
        method: 'POST',
        data
    })
}

/**查询已加入的队伍 */
export const joinTeam = (data) => {
    return request({
        url: 'team/joinTeam',
        method: 'POST',
        data
    })
}


/**加入队伍 */
export const joinTeamList = (data) => {
    return request({
        url: '/team/addTeam',
        method: 'POST',
        data
    })
}

/**退出队伍 */
export const outTeamList = (teamId) => {
    return request({
        url: '/team/outTeam/' + teamId,
        method: 'GET',
    })
}
