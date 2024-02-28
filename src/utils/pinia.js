import { defineStore } from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
// let session = sessionStorage.getItem('session')
// let islogin = JSON.parse(session)
// console.log(islogin);
const useStore = defineStore('main', {
    state: () => ({
        userId: '',
        isroute: true,
        isheader: true
    })
})



export default useStore