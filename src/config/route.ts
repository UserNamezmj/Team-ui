import login from '../pages/login.vue';
import BasciLayout from "../layouts/BasciLayout.vue";
import Index from '../pages/index.vue';
import Tream from '../pages/Tream.vue';
import User from '../pages/user.vue';
import userCenter from '../pages/usercenter.vue';
import searchPage from '../pages/searchPage.vue';
import updateUser from '../pages/updateuser.vue';
import addTeam from '../pages/Team/addteam.vue'
import useTeam from '../pages/Team/useTeam.vue'
import information from '../pages/information/informationDescription.vue'
import outLogin from '../pages/outLogin.vue'
import UpdateUserAvatarurl from '../pages/updateUserAvatarurl.vue'

// 定义一些路由
const routes = [
    {
        path: '/', redirect: '/login',
    },
    {
        path: '/login', name: 'login', component: login,
        // redirect: to => {
        //     // 该函数接收目标路由作为参数
        //     // 相对位置不以`/`开头
        //     // 或 { path: 'profile'}
        //     return 'login'
        //   },
    },
    {
        path: '/BasciLayout', name: 'BasciLayout', component: BasciLayout,
        children: [
            { path: '/index', component: Index },
            { path: '/tream', component: Tream },
            { path: '/user', component: User },
            { path: '/usercenter', component: userCenter },
            { path: '/searchPage', component: searchPage },
            { path: '/updateUser', component: updateUser },
            { path: '/Team/addteam', component: addTeam },
            { path: '/Team/useTeam', component: useTeam },
            { path: '/information/informationDescription', component: information },
            { path: '/outLogin', component: outLogin },
            { path: '/updateUserAvatarurl', component: UpdateUserAvatarurl }
        ],
    },
]



export default routes