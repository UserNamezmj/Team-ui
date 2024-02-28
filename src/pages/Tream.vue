<template>
  <!-- 密码确认弹窗 -->
  <div>
    <div>
      <van-search v-model="form.nameDescription" shape="round" placeholder="根据名称/描述搜索" @search="onSearch" />
    </div>
    <vanCardList :formData="formData" :result="result" @getList="getList"></vanCardList>
  </div>
</template>

<script setup>
import useStore from "@/utils/pinia.js";
import { treamList } from "@/api/tream.js";
import { ref } from "vue";
import { showSuccessToast, showFailToast } from 'vant';
import { useRouter } from 'vue-router'
import vanCardList from "@/component/vanCardList.vue";
// 引入兼容移动端的组件
import '@vant/touch-emulator';
//定义ruoter实列
const router = useRouter()
//定义store的实列
const store = useStore()
store.name = '房间'
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

const result = ref()


//房间卡片数据
const formData = ref([])

//查询各个房间
function getList() {
  let data = JSON.parse(sessionStorage.getItem("session"));
  result.value = data
  treamList(form.value).then(res => {
    formData.value = res.data.records
  })
}
getList()

//搜索
function onSearch() {
  treamList(form.value).then(res => {
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

.van-card:nth-child(5) .van-card__footer {
  margin-bottom: 0px !important;
}
</style>