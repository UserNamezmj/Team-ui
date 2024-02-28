<template>
    <van-nav-bar :title="store.name" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true"
        v-if="store.isheader">
        <template #right>
            <van-space>
                <van-icon name="search" size="18" @click="onClickRight" />
                <van-icon name="add-o" size="18" @click="onClickAdd" />
            </van-space>
        </template>
    </van-nav-bar>
    <div class="isadd_style_class" v-if="store.isadd">
        <van-sticky :offset-top="50">
            <div class="team_style_class" @click="HandleAddTeam"><van-icon name="friends" />创建房间</div>
            <div class="team_style_class" @click="HandleUseTeam"><van-icon name="user" />我的房间</div>
            <div class="team_style_class" @click="HandleUseTeam"><van-icon name="user" />添加好友</div>
        </van-sticky>
    </div>
    <div id="content">
        <router-view style="margin-top: 46px;" />
    </div>
    <van-tabbar route v-if="store.isroute">
        <van-tabbar-item to="/index" icon="home-o" name="home">主页</van-tabbar-item>
        <van-tabbar-item to="/user" icon="chat-o" name="user">消息</van-tabbar-item>
        <van-tabbar-item to="/tream" icon="home-o" name="tream">房间</van-tabbar-item>
        <van-tabbar-item to="/usercenter" icon="setting-o" name="usercenter">个人中心</van-tabbar-item>
    </van-tabbar>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { showToast } from 'vant';
import Index from '../pages/index.vue'
import Tream from '../pages/Tream.vue'
import { useRouter } from 'vue-router'
import useStore from "@/utils/pinia.js";
import { storeToRefs } from 'pinia'
//定义store实列存储数据
const store = useStore()
// const { name } = storeToRefs(store)
const title = ref('')
const isroute = ref(true)
//定义路由router实列
const router = useRouter()
//查看队伍下拉选择
const isadd = ref(false);
const onClickLeft = () => {
    router.back()
    store.isadd = false
};
//查询队伍
const onClickRight = () => {
    router.push({ path: '/searchPage' })
    store.isadd = false
};

onMounted(() => {
    store.isadd = isadd.value

})

//创建队伍
let index = 0
const onClickAdd = () => {
    index++;
    store.isadd = true
    if (index >= 2) {
        store.isadd = false
        index = 0
    }
}

//监听切换事件
// const active = ref('home');
// const onChange = (index) => showToast(`${index}`);

//创建房间
function HandleAddTeam() {
    store.isadd = false
    router.push({ path: '/Team/addTeam' })
}

//我的房间
function HandleUseTeam() {
    store.isadd = false
    router.push({ path: '/Team/useTeam' })
}

</script>

<style lang="scss" scoped>
h5 {
    border-bottom: 1px solid rgb(220, 220, 220);
    margin-left: 6px;
}

.isadd_style_class {
    z-index: 999;
    position: fixed;
    display: flex;
    margin-top: -10px;
    margin-left: 67%;
    background-color: rgba(91, 91, 91, 0.628);
    border-bottom: 1px solid rgb(220, 220, 220);
    width: 100px;
    height: 96px;
    color: aliceblue;
    border-radius: 6px;
}

.team_style_class {
    width: 100%;
    border-bottom: 1px solid rgb(220, 220, 220);
    margin-bottom: 10px;
    font-family: 'Times New Roman', Times, serif;
}
</style>