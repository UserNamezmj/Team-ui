import { createApp } from 'vue'
import { NavBar, Button, Icon, Tabbar, TabbarItem } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';
import App from './App.vue';
import * as VueRouter from 'vue-router'
import routes from './config/route.js'
import 'vant/es/toast/style'
import { createPinia } from 'pinia';
import useStore from "./utils/pinia.js";

//创建pinia
function SecretPiniaPlugin() {
    return { name: '' }
}
const pinia = createPinia()
pinia.use(SecretPiniaPlugin)



// 3. 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})




const app = createApp(App);
app.use(NavBar).use(Button).use(Icon).use(Tabbar).use(TabbarItem).use(router).use(pinia)
app.mount('#app')

const store = useStore()
//路由导航守卫
router.beforeEach((to, from, next) => {
    let session: any = sessionStorage.getItem('session')
    let islogin = JSON.parse(session)
    if (to.path === '/information/informationDescription') {
        store.isroute = false
        store.isheader = false
    } else {
        store.isroute = true
        store.isheader = true
    }
    if (to.path !== '/login' && !islogin) {
        next({ name: "login" })
    } else {
        next()
    }
    if (islogin) {
        store.userId = islogin.id
    }
})





