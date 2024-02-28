<template>
    <div>
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <!-- {{ image }} -->
                <!-- <img :src="image" class="image_style_class" /> -->
                <img src="../assets/OIP-C (7).jpg" alt="" class="image_style_class">
            </van-swipe-item>
        </van-swipe>
    </div>
    <div class="content">
        <van-grid :column-num="3" :gutter="10">
            <van-grid-item>
                <span> <img src="../assets/13.jpg" alt="" class="image_class_year"></span>
                <p style="font-size: 12px; margin-bottom: 10px;">我的房间</p>
            </van-grid-item>
            <van-grid-item>
                <span> <img src="../assets/OIP-C (8).jpg" alt="" class="image_class_year"></span>
                <p style="font-size: 12px; margin-bottom: 10px;">星友查看</p>
            </van-grid-item>
            <van-grid-item>
                <span> <img src="../assets/13.jpg" alt="" class="image_class_year"></span>
                <p style="font-size: 12px; margin-bottom: 10px;">我的好友</p>
            </van-grid-item>
            <van-grid-item>
                <span> <img src="../assets/14.jpg" alt="" class="image_class_year"></span>
                <p style="font-size: 12px; margin-bottom: 10px;">个人信息</p>
            </van-grid-item>
            <van-grid-item>
                <span> <img src="../assets/14.jpg" alt="" class="image_class_year"></span>
                <p style="font-size: 12px; margin-bottom: 10px;">加入房间</p>
            </van-grid-item>
            <van-grid-item>
                <span> <img src="../assets/13.jpg" alt="" class="image_class_year"></span>
                <p style="font-size: 12px; margin-bottom: 10px;">创建房间</p>
            </van-grid-item>
        </van-grid>
    </div>
    <div class="footer">
        <vanCardpPerson :formList="formList" />
    </div>
    <van-floating-bubble v-model:offset="offset" axis="xy" icon="chat"></van-floating-bubble>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import useStore from "@/utils/pinia.js";
import { showSuccessToast } from "vant";
import { pageList, getTeamList } from "@/api/user.js";
import vanCardpPerson from "@/component/vanCardpPerson.vue";
const store = useStore()
store.name = '首页'
// ref
const queryPage = reactive(
    {
        pageSize: 10,
        pageNum: 1
    }

)
//分页数据
const pageSize = ref(10)
const pageNum = ref(1)
//轮播图数据
const images = [
    '../assets/OIP-C (7).jpg',
    '../assets/12.jpg',
    '../assets/OIP-C (5).jpg'
];
const offset = ref({ x: 200, y: 400 });
//星用户
const formList = ref([])

onMounted(() => {
    getTeamList().then((res) => {
        res.data.forEach(item => {
            item.tags = JSON.parse(item.tags)
        });
        formList.value = res.data
    })
})


</script>

<style lang="scss">
.van-grid-item__content {
    height: 118px;
}

.van-swipe__track {
    height: 180px;
}

.image_style_class {
    margin-top: 45px;
    width: 100%;
    height: 180px;
}

.content {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    // background-color: rgb(253, 253, 239);
}

.footer {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
}

.image_class_year {
    width: 100%;
    height: 90%;
}
</style>