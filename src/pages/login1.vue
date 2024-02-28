<template>
    <div class="box">
        <div ref="vantaRef" style="width: 100%; height: 100vh"></div>
        <div class="banner">
            <div class="form_style_class">
                <van-form @submit="onSubmit">
                    <h2 class="title">交友伴我行</h2>
                    <van-cell-group inset>
                        <van-field v-model="user.userAccount" name="用户名" label="用户名" placeholder="用户名"
                            :rules="[{ required: true, message: '请填写用户名' }]" />
                        <van-field v-model="user.userPassword" type="password" name="密码" label="密码" placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]" />
                    </van-cell-group>
                    <div style="margin-top: 20px; width: 268px; margin-left: 12px;">
                        <van-button round block type="primary" native-type="submit" color="#7232dd" loading-type="spinner">
                            登录
                        </van-button>
                    </div>
                    <div class="password_class">
                        <p style="margin-left: 16px;font-size: small;"> <van-checkbox v-model="checked" icon-size="14px">
                                <a href="javascript:;" style="color: aliceblue;">记住我</a>
                            </van-checkbox>
                        </p>
                        <p href="javascript:;" style="margin-left: 130px;  font-size: small;">
                            <a href="javascript:;" style="color: aliceblue;">忘记密码?</a>
                        </p>
                    </div>
                </van-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue';
import { login } from "@/api/login.js";
import { showSuccessToast, showFailToast } from 'vant';
import { useRouter } from 'vue-router'
import useStore from "@/utils/pinia.js";
import * as THREE from 'three'//导入样式
import BIRDS from 'vanta/src/vanta.birds'//导入动态样式逻辑
//生命周期钩子
onMounted(() => {
    console.log(vantaRef.value);
    vantaEffect = BIRDS({
        el: vantaRef.value,
        THREE: THREE
    })
    VANTA.BIRDS({
        el: vantaRef.value,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xc7d1e8,
        backgroundColor: 0x400bb1,
        points: 13.0,
        maxDistance: 21.0,
        spacing: 16.0,
    });
})
onBeforeUnmount(() => {
    if (vantaEffect) {
        vantaEffect.destroy()
    }
})
//定义store的实列
const store = useStore()
store.name = '登录'
//定义router实列
const router = useRouter()
const username = ref('');
const password = ref('');
const checked = ref(true)
const user = reactive({})
const vantaRef = ref()
const vantaEffect = reactive({})
const onSubmit = () => {
    login(user).then((response) => {
        if (response.code === 2000 && response.data.id != null) {
            sessionStorage.setItem('session', JSON.stringify(response.data))
            showSuccessToast('登录成功');
            router.replace('/index')
        } else {
            showFailToast('登录失败')
        }
    })
};
</script>

<style lang="scss" scoped>
.box {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-size: 100% 100%;

    .banner {
        z-index: 999;
        position: absolute;
        top: 30%;
        left: 10%;
        color: #ffffff;

        .title {
            text-align: center;
            margin: 25px 0 30px 20px;
            color: #ffffffc9
        }

        .form_style_class {
            border-radius: 6px;
            width: 300px;
            // padding: 0 0 0 25px;
            margin-top: -20%;
        }

        .password_class {
            margin-top: -50px;
            display: flex;
        }

    }
}

h1 {
    font-size: 66px;
}

p {
    margin-top: 60px;
    font-size: 18px;
}
</style>