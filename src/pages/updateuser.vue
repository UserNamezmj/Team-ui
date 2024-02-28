<template>
    <div>
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="user.username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="user.userAccount" name="账号" label="账号" placeholder="账号"
                    :rules="[{ required: true, message: '请填写账号' }]" />
                <van-field label="性别">
                    <template #input>
                        <van-radio-group v-model="user.gender" direction="horizontal">
                            <van-radio :name="0">男</van-radio>
                            <van-radio :name="1">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="user.phone" name="手机号" label="手机号" placeholder="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]" />
                <van-field v-model="user.email" name="邮箱" label="邮箱" placeholder="邮箱"
                    :rules="[{ required: true, message: '请填写邮箱' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useStore from "@/utils/pinia.js";
import { userUpdate } from "@/api/user.js";
import { showSuccessToast } from 'vant';
//定义store实列
const store = useStore()
store.name = '修改用户'
//定义route实列 接受路由传参
const route = useRoute();
const router = useRouter()
const user = ref({})
const avatarUrl = ref([
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
]);
onMounted(() => {
    user.value = JSON.parse(route.query.userInfo)
})
function onSubmit(params) {
    userUpdate(user.value).then((res) => {
        if (res.code === 2000) {
            showSuccessToast('修改信息成功')
            router.push('/usercenter')
        }
    })
}
</script>

<style></style>