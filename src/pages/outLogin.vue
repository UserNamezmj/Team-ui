<template>
    <div class="content">
        <div class="button_size_class">
            <van-button size="large" @click="handleOutLogin">退出</van-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "../utils/pinia";
//定义标题
const store = useStore()
store.name = '更改图片'
//路由跳转接收参数
const route = new useRoute()
const router = new useRouter()
//挂载前
onMounted(() => {
    console.log(route.query.user);
})
//图片上传方法
const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器
    console.log(file);
};

//退出登录
const handleOutLogin = () => {
    router.push('/login')
}
</script>

<style scoped>
.content {
    height: auto;
    background-color: rgb(230, 230, 230);
    margin-top: 46px;
}

.button_size_class {
    padding: 5px 0px 5px 0px;
}
</style>