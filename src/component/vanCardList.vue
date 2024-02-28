<template>
    <!-- 密码确认弹窗 -->
    <div>
        <van-dialog title="密码输入" v-model:show="show" show-cancel-button @confirm="showDialog">
            <van-cell-group inset>
                <van-field v-model="formJoin.password" :type="paswordType" name="密码" label="密码" placeholder="请输入房间密码"
                    :rules="[{ required: true, message: '请填写房间密码' }]" maxlength="12" :right-icon="rightIcon"
                    @click-right-icon="HandleRightIcon" />
            </van-cell-group>
        </van-dialog>
    </div>
    <van-card v-for="item in props.formData" :key="item.id" :desc="item.description" :title="item.name"
        thumb="https://tse3-mm.cn.bing.net/th/id/OIP-C._tChz5DTZrbg9IWwXljYngHaI4?w=203&h=243&c=7&r=0&o=5&dpr=1.5&pid=1.7">
        <template #tags>
            <p>
                <van-space>
                    <van-tag plain type="primary" :style="item.status === 0 ? 'color : green' : 'color : red'">
                        {{ item.status === 0 ? '公开' : '加密' }}</van-tag>
                    <van-tag plain type="primary" style="color: rgb(0, 106, 255); font-size: 12px;">
                        房间人数 {{ item.roomNum }}: <a style="color: rgb(187, 19, 19); font-size: 15px;"> {{
                            item.maxNum
                        }}</a>
                    </van-tag>
                </van-space>
            </p>
            <p>截止时间: {{ item.expireTime }}</p>
        </template>
        <template #footer>
            <van-button size="mini" @click="updateTeam(item)" color="green" plain
                v-if="item.userId == props.result.id">更新房间</van-button>
            <van-button size="mini" @click="joinTeam(item)" color="green" plain
                v-if="item.userId != props.result.id && item.isTeam !== true">加入房间</van-button>
            <van-button size="mini" @click="outTeam(item.id)" color="orange" plain
                v-if="item.userId != props.result.id && item.isTeam == true">退出房间</van-button>
            <van-button size="mini" @click="delTeam(item.id)" type="danger" plain
                v-if="item.userId == props.result.id">解散房间</van-button>
        </template>
    </van-card>
    <van-empty v-if="props.formData.length == 0" image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80" description="暂无数据" />
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue"
import { treamList, joinTeamList, outTeamList } from "@/api/tream.js";
import { showSuccessToast, showFailToast } from 'vant';
import { useRouter } from "vue-router";


//路由跳转
const router = useRouter()
//生命周期钩子挂载前
onMounted(() => {
    let data = JSON.parse(sessionStorage.getItem("session"));
    result.value = data
})


//密码标志
const rightIcon = ref('closed-eye')
const paswordType = ref('password')
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




// 定义触发事件
const emit = defineEmits(['getList'])
const props = defineProps({
    formData: {
        required: true,
    },
    result: {
        required: true
    }
})
const result = ref()

//查询房间条件
const form = ref({
    TeamId: 0,
    userId: 0,
    name: "",
    nameDescription: "",
    description: "",
    status: 0,
    expireTime: "",
    maxNum: 0,
    password: ""
})
//加入房间参数
const formJoin = ref({
    teamId: 0,
    password: ""
})
//弹窗是否关闭
const show = ref(false)
//密码输入框
const showKeyboard = ref(false)


//加入房间
function joinTeam(val) {
    formJoin.value.teamId = val.id
    if (val.status == 2) {
        show.value = true
    } else {
        joinTeamList(formJoin.value).then(res => {
            if (res.code == 2000) {
                showSuccessToast('房间加入成功')
            } else {
                showFailToast(res.message)
            }
            emit('getList')
        })
    }

}

//退出房间
function outTeam(val) {
    outTeamList(val).then(res => {
        if (res) {
            showSuccessToast('房间退出成功')
        } else {
            showFailToast('房间退出失败')
        }
        emit('getList')
    })
}
//加密
function showDialog() {
    joinTeamList(formJoin.value).then(res => {
        console.log(res);
        if (res.code == 2000) {
            showSuccessToast('房间加入成功')
            show.value = false
            formJoin.value.password = ''
        } else {
            showFailToast(res.message)
            show.value = false
        }
        emit('getList')
    })
}
//更新房间
function updateTeam(val) {
    if (val) {
        router.push({
            path: '/Team/addteam',
            query: { teamInfo: JSON.stringify(val) }
        })
    }
}
</script>

<style></style>