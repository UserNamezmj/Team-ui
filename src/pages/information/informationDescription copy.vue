<template>
    <!--对话总体-->
    <div class="app">
        <div class="wrap">
            <div ref="scrollBox">
                <div class="delete_style_click" :style="{ '--fontSize': fontSize, '--marginLeft': marginLeft }"
                    v-if="isshow">
                    <van-icon name="delete-o" color="#fff" @click="handledelInformation" />
                    <div class="h"></div>
                </div>
                <div class="content_box" :style="{ '--height': arrheight }" id="box" @click="HandleSmeill">
                    <div class="timer">{{ new Date().toLocaleString() }}</div>
                    <div :class="item.userId == store.userId ? 'userbox' : 'userbox2'" v-for="( item, index ) in  chatList "
                        class="item" :key="index">
                        <div :class="item.userId == store.userId ? 'nameInfo' : 'nameInfo2'">
                            <div style="font-size: 14px">{{ item.username }}</div>
                            <div :class="item.userId == store.userId ? 'contentText' : 'contentText2'" id="content"
                                @touchstart="handleContent(item)" @touchend="handleCancel"
                                @click="handleClick(index, item)">
                                {{ item.content }}
                            </div>
                            <!-- <p><van-icon name="delete-o" /></p> -->
                        </div>
                        <div>
                            <van-image round width="50px" height="50px" :src="item.avatarUrl" />
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <van-field v-model="form.inputValue" center type="textarea" ref="input"
                        :autosize="{ maxHeight: 100, minHeight: 25 }" placeholder="请输入内容" rows="1" right-icon="smile-o"
                        @click-right-icon="handleRightIcon" @keyup.enter="sendOut">
                        <template #button>
                            <van-button size="small" color="#E9E9E9" @click="sendOut" plain>
                                <span style="color: #07C160;">发送</span>
                            </van-button>
                        </template>
                    </van-field>
                    <div v-if="isimlle" class="is_style_simlle" @click.stop="chooseSimlle">
                        <ul class="ul_style_simlle">
                            <li v-for=" item  in  simlleList " :key="item">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useStore from "@/utils/pinia.js";
import { onMounted, ref, reactive, onUpdated, watchEffect } from "vue";
import { showToast } from 'vant';
import { list } from "@/api/chat.js";
import { deleteInformation } from "@/api/user.js";
import { useRoute } from "vue-router";
import { nextTick } from "process";
import { simlle } from '@/utils/simlle.js'
import copy from '@/utils/onmouse.js'
const store = useStore()
const route = useRoute()
const isshow = ref(false)
store.name = '我的好友'
//  //用户名
const userName = ref("张三")
//输入内容
const inputValue = ref("")
//滚动条距离顶部距离
const scrollTop = ref(0)
const scrollBox = ref()
const form = ref({

})
const socket = ref()
const queryForm = ref({
    anotherId: '',
    userId: ''
})
//表情包
const simlleList = ref([
])
//是否展示
const isimlle = ref(false)
const chatList = ref([
    // {
    //     url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    //     username: "张三",
    //     content: "模拟数据123模拟数据123模拟数据123模拟数据123",
    //     position: "left",
    // }
])

//加载数据
const count = ref(0);
const loading = ref(false);

const websocketCount = ref(-1)
const message = ref({
    userId: store.userId,
    anotherId: '',
    avatarUrl: '',
    username: '',
    content: form.value.inputValue,
    time: new Date(),    // 使用moment包生成一个时间戳
})
const input = ref()
let arrheight;
onMounted(() => {
    let socketUrl = "ws://localhost:8080/api/user/" + store.userId;
    // 开启一个websocket服务
    socket.value = new WebSocket(socketUrl);
    socket.value.onopen = function () {
        console.log("websocket已打开");
    };
    form.value = JSON.parse(route.query.user)
    queryForm.value.anotherId = form.value.id
    message.value.anotherId = form.value.id
    simlleList.value = simlle().toString().split(',')
    getList()
    setPageScrollTo()
    arrheight = (document.getElementById('app').offsetHeight)
        - (document.getElementsByClassName('van-nav-bar__content')[0].offsetHeight
            + document.getElementsByClassName('van-cell van-cell--center van-field')[0].offsetHeight)
})

//查看消息内容
const data = ref([])
function getList() {
    queryForm.value.userId = store.userId
    list(queryForm.value).then(res => {
        chatList.value = res.data
        console.log(store.data);
    })
    socket.value.onmessage = function (msg) {
        console.log("收到数据====" + msg.data)
        store.data = JSON.parse(msg.data)
        console.log(msg);
        chatList.value.push(store.data)
    }
    setPageScrollTo()
}
// getList()

//滚动条达到最底部
function srTop() {
    if (scrollBox.value.scrollTop == 0) {
        console.log("到顶了,滚动条位置", scrollBox.value.scrollTop);
    }
}

//滚动条默认滚到最底部
function setPageScrollTo(s, c) {
    setTimeout(() => {
        window.scrollTo({
            top: document.querySelector("#box").offsetHeight,
            behavior: "instant"
        })
    }, 200)
}
//发送信息
function sendOut() {
    isimlle.value = false
    setPageScrollTo()
    message.value.userId = store.userId
    message.value.content = form.value.inputValue
    message.value.anotherId = form.value.id
    message.value.avatarUrl = form.value.avatarUrl
    message.value.username = form.value.username
    if (form.value.inputValue !== undefined) {
        socket.value.send(JSON.stringify(message.value));
        form.value.inputValue = ''
        setTimeout((res) => {
            //加个定时器，防止没有获取数据。
            getList()
        }, 300);
        setPageScrollTo()
    }

}

// const onRefresh = () => {
//     setTimeout(() => {
//         showToast('刷新成功');
//         getList()
//         loading.value = false;
//     }, 300);
// };

function websocketOnMessage(event) {
    sendOut()
    isimlle.value = false
}

//点击左侧图标触发
let index = 0
function handleRightIcon() {
    setPageScrollTo()
    index++
    isimlle.value = true
    if (index >= 2) {
        isimlle.value = false
        index = 0
    }
    input.value.focus()
}
function HandleSmeill() {
    console.log('handleSmeill', isshow.value);
    isimlle.value = false
    isshow.value = false
}
//选择图标
function chooseSimlle(e) {
    form.value.inputValue = e.target.textContent
}

//信息点击事件
let time1;
let fontSize;
let marginLeft;

watchEffect(() => {
    console.log(fontSize);
})
function handleContent(val) {
    // fontSize = (content.offsetHeight - 120) + 'px'
    // time1 = setTimeout(function () {//外层延时器

    // }, 1000);//2秒过后执行内部定时器
}

//删除消息
function handledelInformation(e) {
    if (store.id) {
        deleteInformation(store.id).then(res => {
            console.log(res);
            getList()
        })
        isshow.value = false
        getList()
    }
}

function handleClick(e, val) {
    time1 = setTimeout(function () {//外层延时器
        let content = document.getElementsByClassName('item')
        fontSize = (e) * (content[e].offsetHeight + 10) - 8 + 'px'
        if (content[e].className == 'userbox item') {
            marginLeft = content[e].offsetWidth / 2 + 'px'
        } else {
            marginLeft = 0 + 'px'
        }
        isshow.value = true
        store.id = val.id
    }, 1000);//2秒过后执行内部定时器

}

function handleCancel() {
    clearTimeout(time1)
}
</script>

<style lang="scss" scoped>
// .app {
//     width: 100%;
//     height: 100%;
//     background: #c6c6c6;
// }

.wrap {
    position: relative;
    height: 100%;
    width: 100%;
}

.title {
    height: 40px;
    width: 100%;
    background-color: #f5f3f3ce;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bottom {
    min-height: 50px;
    width: 100%;
    border-top: 1px solid #ffffff;
    position: fixed;
    bottom: 0px;
}

.content_box {
    /* 
  中间栏计算高度，110是包含了上下固定的两个元素高度90
  这里padding：10px造成的上下够加了10，把盒子撑大了，所以一共是20要减掉
  然后不知道是边框还是组件的原因，导致多出了一些，这里再减去5px刚好。不然会出现滚动条到顶或者底部的时候再滚动的话就会报一个错，或者出现滚动条变长一下的bug
  */
    height: calc(100% - 95px);
    overflow: auto;
    padding: 10px;

}

.timer {
    text-align: center;
    color: #d6d4d4;
}

/* 发送的信息样式 */
/* 
右边消息思路解释：首先大盒子userbox内放两个盒子，一个放头像，一个放用户名和发送的内容，我们先用flex让他横向排列。
然后把写文字的大盒子设置flex：1。这个属性的意思就是让这个元素撑满父盒子剩余位置。然后我们再把文字盒子设置flex，并把他对齐方式设置为尾部对齐就完成了基本的结构，然后微调一下就可以了
*/
.userbox {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    /* color: #9eea6a; */
}

.nameInfo {
    /* 用flex：1把盒子撑开 */
    flex: 1;
    margin-right: 10px;
    /* 用align-items把元素靠右对齐 */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.contentText {
    background-color: #9eea6a;
    /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
    display: inline-block;
    /* 这四句是圆角 */
    border-top-left-radius: 10px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    /* 最大宽度限定内容输入到百分61换行 */
    max-width: 61%;
    padding: 5px 10px;
    /* 忽略多余的空白，只保留一个空白 */
    white-space: normal;
    /* 换行显示全部字符 */
    word-break: break-all;
    margin-top: 3px;
    font-size: 14px;
}

/* 接收的信息样式 */
/* 
左边消息思路解释：跟上面一样，就是换一下位置，首先通过把最外层大盒子的排列方式通过flex-direction: row-reverse;属性翻转，也就是头像和文字盒子换位置
然后删除掉尾部对齐方式，因为不写这个默认是左对齐的。我们写的左边就没必要再写了。
*/
.userbox2 {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
    /* color: #ffffff; */
}

.nameInfo2 {
    /* 用flex：1把盒子撑开 */
    flex: 1;
    margin-left: 10px;
}

.contentText2 {
    background-color: #fef9f9;
    /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
    display: inline-block;
    /* 这四句是圆角 */
    border-top-left-radius: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    /* 最大宽度限定内容输入到百分61换行 */
    max-width: 61%;
    padding: 5px 10px;
    /* 忽略多余的空白，只保留一个空白 */
    white-space: normal;
    /* 换行显示全部字符 */
    word-break: break-all;
    margin-top: 3px;
    font-size: 14px;
}

.van-cell {
    background: #fef1f170;
}

.is_style_simlle {
    z-index: 999;
    position: relative;
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    background-color: #d6d4d4;
}

.ul_style_simlle {
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
}

li {
    flex-basis: 10%;
    /* 每个项的基础宽度为20%，即每行显示5列 */
}

.delete_style_click {
    z-index: 999;
    position: absolute;
    width: 100px;
    height: 50px;
    margin-left: var(--marginLeft);
    /* margin-left: 50%;
    margin-right: -100px; */
    background-color: rgba(0, 0, 0, .5);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-top: var(--fontSize);
}

.h {
    float: right;
    margin-top: 49px;
    width: 0px;
    height: 0px;
    border: 8px solid transparent;
    border-top-color: rgba(0, 0, 0, .5);
}
</style>