<template>
  <van-tabs v-model:active="active" @click-tab="onClickTab">
    <van-tab title="我的好友">
      <div class="information_style_class">
        <div class="item" v-for="user in userList" :key="user" @click="searchInformation(user)">
          <img class="face" round :src="user.avatarUrl" />
          <div class="des">
            <div class="nickName"><span>{{ user.username }}</span></div>
            <div class="signature"><span>{{ user.content }}</span></div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="好友申请">内容 2</van-tab>
  </van-tabs>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { pageList, chatUserList } from "@/api/user.js";
import { chatUser } from "@/api/chat.js";
import useStore from "@/utils/pinia.js";
//ref
//定义store的实列
const store = useStore()
store.name = '好友列表'
store.isadd = false
const route = useRoute()
const router = useRouter()
const user = reactive({
  username: 'yupao',
  userAccount: "yupao",
  avatarUrl: "https://mybatis.plus/img/relationship-with-mybatis.png",
  gender: 1 ? '男' : '女',
  userId: '1725402524714061826',
  phone: "1787987668",
  email: "299348384@qq.com",
})
const userList = ref([])
const queryParams = ref({
  // userId: store.userId
  pageNum: 1,
  pageSize: 2,
  userId: ''
})
function getList() {
  console.log(store.userId);
  queryParams.value.userId = store.userId
  chatUser(queryParams.value.userId).then(res => {
    userList.value = res.data
  })
}
getList()
//查看消息
function searchInformation(row) {
  router.push({
    path: "/information/informationDescription",
    query: {
      user: JSON.stringify(row)
    }
  })
}

</script>

<style lang="scss" scoped>
.information_style_class {
  // margin-top: 46px;
}

.item {
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  display: flex;
}

.face {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  margin-top: 8px;
  object-fit: cover;
}

.des {
  height: 60px;
  display: inline-block;
  margin-left: 70px;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.nickName {
  /*height: 30px;*/
  margin-top: 10px;
}

.nickName span {
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.signature {
  /*height: 30px;*/
  margin-top: -5px;
}

.signature span {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: gray;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>