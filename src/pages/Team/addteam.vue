<template>
    <div>
        <div id="content">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="form.name" name="房间名" label="房间名" placeholder="房间名"
                        :rules="[{ required: true, message: '请填写房间名' }]" />
                    <van-field name="stepper" label="房间最大人数">
                        <template #input>
                            <van-stepper v-model="form.maxNum" />
                        </template>
                    </van-field>
                    <van-field name="radio" label="状态">
                        <template #input>
                            <van-radio-group v-model="form.status" direction="horizontal">
                                <van-radio :name=0>公开</van-radio>
                                <van-radio :name=1>私密</van-radio>
                                <van-radio :name=2>加密</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <van-field v-if="form.status === 2" v-model="form.password" :type="paswordType" name="密码" label="密码"
                        placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" maxlength="12"
                        :right-icon="rightIcon" @click-right-icon="HandleRightIcon" />
                    <van-field v-model="form.expireTime" is-link readonly name="calendar" label="到期时间"
                        placeholder="点击选择到期时间" @click="showCalendar = true" />
                    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" />
                    <van-field v-model="form.description" rows="2" autosize label="房间描述" type="textarea" maxlength="150"
                        placeholder="请输入房间描述" show-word-limit />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useStore from "@/utils/pinia.js";
import { addTeam, updateTeam } from "@/api/addteam.js";
import { formatDate } from "@/utils/formDate.js";
import { showSuccessToast, showFailToast } from 'vant';
import { useRouter, useRoute } from 'vue-router'
//创建router实例
const router = useRouter()
const route = useRoute()
const store = useStore()
//ref
//创建队伍表单数据
const form = ref({
    description: "",
    expireTime: "",
    maxNum: 5,
    name: "test",
    password: "",
    // status: 0,

})
//密码标志
const rightIcon = ref('closed-eye')
const paswordType = ref('password')
//生命周期钩子挂载前
onMounted(() => {
    if (route.query.teamInfo) {
        form.value = JSON.parse(route.query.teamInfo)
        form.value.userId = form.value.userVo.id
    }
    if (form.value.id) {
        store.name = '更新房间'
    } else {
        store.name = '创建房间'
    }

})
//点击图标的方法
function HandleRightIcon() {
    if (paswordType.value === "password") {
        paswordType.value = ""
        rightIcon.value = "eye-o"
    } else {
        paswordType.value = "password"
        rightIcon.value = "closed-eye"
    }
}
//日历选择数据
const showCalendar = ref(false);
const onConfirm = (date) => {
    form.value.expireTime = `${date.getFullYear() + "-"}${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "-" : date.getMonth() + 1 + "-"}${date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) + " " : date.getDate() + 1 + " "}${date.getHours() + ":"}${date.getMinutes() + ":"}${date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds()}`;
    showCalendar.value = false;
};


//提交队伍数据
const onSubmit = () => {
    if (form.value.id) {
        updateTeam(form.value).then(response => {
            if (response.data) {
                showSuccessToast('修改成功');
                router.replace({ path: '/Tream' })
            }
        })
    } else {
        addTeam(form.value).then(response => {
            if (response.data) {
                showSuccessToast('创建成功');
                router.replace({ path: '/Tream' })
            }
        })
    }

};
</script>

<style></style>