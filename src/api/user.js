import request from "@/axios/request.js";

export const userUpdate = (data) => {
    return request({
        url: 'user/update',
        method: 'PUT',
        data
    })
}

//分页查询数据
export const pageList = (query) => {
    return request({
        url: '/user/pageList',
        method: 'GET',
        params: query
    })
}


//获取推荐用户数据
export const getTeamList = () => {
    return request({
        url: '/team/getTeamList',
        method: 'GET'
    })
}

//关注用户
export const connection = (userId) => {
    return request({
        url: '/user/connection/' + userId,
        method: 'GET'
    })
}

//获取好友数据
export const chatUserList = (data) => {
    return request({
        url: '/chat/chatUserList',
        method: 'POST',
        data
    })
}

//上传头像
export const upload = (data) => {
    return request({
        url: '/user/upload',
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data
    })
}


//删除用户聊天信息
export const deleteInformation = (id) => {
    return request({
        url: '/user/deleteInformation/' + id,
        method: 'DELETE',
    })
}