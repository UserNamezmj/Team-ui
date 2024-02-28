import request from "@/axios/request.js";


//查看消息内容
export const list = (data) => {
    return request({
        url: 'chat/list',
        method: 'post',
        data
    })
}

//获取自己的关注用户
export const chatUser = (userId) => {
    return request({
        url:"/chat/chatUser/" + userId,
        method:'GET'
    })
}