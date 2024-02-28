<template>
    <div class="login">
        <div class="form_style_class">
            <van-form @submit="onSubmit">
                <h2 class="title">交友伴我行</h2>
                <van-cell-group inset>
                    <van-field v-model="user.userAccount" name="用户名" label="用户名" placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="user.userPassword" type="password" name="密码" label="密码" placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>

                <div class="password_class">
                    <p style="margin-left: 20px; font-size: small;"> <van-checkbox v-model="checked" icon-size="14px">
                            <a href="javascript:;" style="color: aliceblue;">记住我</a>
                        </van-checkbox>
                    </p>
                    <p href="javascript:;" style="margin-left: 70px;  font-size: small;">
                        <a href="javascript:;" style="color: aliceblue;">忘记密码,请联系管理员</a>
                    </p>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit" color="rgb(114 50 221 / 60%)"
                        loading-type="spinner">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { login } from "@/api/login.js";
import { showSuccessToast, showFailToast } from 'vant';
import { useRouter } from 'vue-router'
import useStore from "@/utils/pinia.js";
//定义store的实列
const store = useStore()
store.name = '登录'
//定义router实列
const router = useRouter()
const username = ref('');
const password = ref('');
const checked = ref(true)
const user = reactive({})
const onSubmit = () => {
    login(user).then((response) => {
        if (response.code === 2000 && response.data.id != null) {
            sessionStorage.setItem('session', JSON.stringify(response.data))
            showSuccessToast('欢迎回来');
            router.replace('/index')
        } else {
            showFailToast(response.message)
        }
    })
};

console.log(import.meta.env);
</script>

<style scoped>
.title {
    text-align: center;
    margin: 0 auto 50px 0;
    color: rgb(0, 148, 240)
}

.login {
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
    justify-content: center;
    align-items: center;
    background: url("../assets/OIP-C3.gif") no-repeat;
    background-size: 100% 100%;
}

.form_style_class {
    border-radius: 6px;
    position: relative;
    width: 300px;
    margin-top: -35px;
}

.password_class {

    display: flex;
}
</style>