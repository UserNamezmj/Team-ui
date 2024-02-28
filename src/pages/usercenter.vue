<template>
    <div>
        <van-cell is-link title="用户呢称" :value="user.username" @click="updateUserInfo(user.value)" />
        <van-cell is-link title="账户" :value="user.userAccount" label="快来认识我吧" @click="updateUserInfo(user.value)" />
        <van-cell is-link title="头像" @click="updateUserAvatarUrl">
            <van-uploader :before-read="beforeRead" :max-size="1000 * 1024">
                <img :src="user.avatarUrl + '?' + Date.now()" style="height: 45px;">
            </van-uploader>
        </van-cell>
        <van-cell is-link title="性别" :value="user.gender == 0 ? '男' : '女'" @click="updateUserInfo(user.value)" />
        <van-cell is-link title="手机号" :value="user.phone" @click="updateUserInfo(user.value)" />
        <van-cell is-link title="邮箱" :value="user.email" label="一起交流吧" @click="updateUserInfo(user.value)" />
        <van-cell title="创建时间" :value="user.createTime" />
        <van-cell is-link @click="handleOutLogin"> <span class="icon_style_class"><van-icon name="setting" /><span
                    style="margin-left: 12px;">设置</span></span></van-cell>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getCurrentUser } from "@/api/login.js";
import { upload } from "@/api/user.js";
import { showSuccessToast, showFailToast } from 'vant';
import useStore from "@/utils/pinia.js";
import { useRouter } from 'vue-router'
import { nextTick } from 'process';
//定义ruoter实列
const router = useRouter()
//定义store实列
const store = useStore()
store.name = '个人中心'
const user = ref({
})
const fileList = ref([
    { url: user.avatarUrl }
])
function getList() {
    user.value.userId = store.userId
    getCurrentUser(user.value.userId).then((response) => {
        if (response.code === 2000) {
            user.value = response.data
            // showSuccessToast('获取用户信息成功')
        } else {
            // showSuccessToast('获取用户信息失败')
        }
    })
}
getList()
//修改用户信息
function updateUserInfo(value) {
    router.push({
        path: '/updateUser',
        query: { userInfo: JSON.stringify(user.value) }
    })
}

//更多设置
function handleOutLogin() {
    router.push({
        path: '/outLogin',
        query: { user: user.value.id }
    })
}

//图片前置方法
const beforeRead = (file) => {
    console.log(file);
    var reg = /\.(git|jpeg|GIF|JPG|PNG)$/;
    if (reg.test(file.name)) {
        showFailToast('请上传png/jpg格式图片');
        return false;
    }
    const formData = new FormData()
    formData.append('file', file)
    upload(formData).then(res => {
        if (res.data) {
            showSuccessToast('上传头像成功')
        }
        getList()
        router.push({
            path: '/usercenter'
        })
    })
    return true;
};
//图片限制大小
const onOversize = (file) => {
    showToast('文件大小不能超过 1MB');
};
const updateUserAvatarUrl = () => {
    router.push({
        path: '/updateUserAvatarUrl',
        query: { user: user.value.id }
    })
}
</script>

<style scoped>
.icon_style_class {
    z-index: 999;
    position: fixed;
    margin-left: -87%;
}
</style>