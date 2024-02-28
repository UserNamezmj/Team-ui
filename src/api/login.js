import request from "@/axios/request.js";

export const login = (data) => {
    return request({
        url: 'user/login',
        method: 'post',
        data
    })
}


export const getCurrentUser = (userId) => {
    return request({
        url: 'user/current/' + userId,
        method: 'GET',
    })
}




