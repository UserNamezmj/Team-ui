<template>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="创建的房间">
            <vanCardList :formData="formData" :result="result" @getList="getList"></vanCardList>
        </van-tab>
        <van-tab title="加入的房间">
            <vanCardList :formData="formData" :result="result" @getList="HandlejoinTeam"></vanCardList>
        </van-tab>
    </van-tabs>
</template>
  
<script setup>
import useStore from "@/utils/pinia.js";
import { treamList, joinTeam, joinTeamList, outTeamList } from "@/api/tream.js";
import { onMounted, ref } from "vue";
import { showSuccessToast, showFailToast, showToast } from 'vant';
import vanCardList from "@/component/vanCardList.vue";
//定义store的实列
const store = useStore()
store.name = '我的房间'
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
//标签页指定
const active = ref(0);

const formJoin = ref({
    teamId: 0,
    password: ""
})
const result = ref()
//房间卡片数据
const formData = ref([])
onMounted(() => {

})

//查询各个房间
function getList() {
    let data = JSON.parse(sessionStorage.getItem("session"));
    result.value = data
    form.value.userId = data.id
    treamList(form.value).then(res => {
        formData.value = res.data.records
    })
}
getList()



//标签页的点击事件
const onClickTab = ({ title }) => {
    if (title === '创建的房间') {
        getList()
    } else {
        HandlejoinTeam()
    }
};

//查询用户加入的房间
function HandlejoinTeam() {
    let data = JSON.parse(sessionStorage.getItem("session"));
    result.value = data
    joinTeam({}).then(res => {
        formData.value = res.data.records
    })
}

</script>
  
<style lang="scss">
.van-card:last-child {
    .van-card__footer {
        margin-bottom: 50px !important;
    }
}
</style>