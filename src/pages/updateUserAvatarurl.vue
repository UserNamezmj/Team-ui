<template>
    <div class="upload_content">
        <van-uploader v-model="fileList" :preview-size="[300, 300]" :show-upload="false" :deletable="false">
            <template #preview-cover="{ file }">
                <div class="preview-cover van-ellipsis">{{ file }}</div>
            </template>
        </van-uploader>
    </div>
</template>

<script setup>
import { getCurrentUser } from "@/api/login.js";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
//获取路由参数
const route = useRoute()
//文件参数
const fileList = ref([
    {
        url: '',
    },
]);
//挂在前钩子
onMounted(() => {
    let userId = route.query.user
    getCurrentUser(userId).then((response) => {
        if (response.code === 2000) {
            fileList.value[0].url = response.data.avatarUrl
            // showSuccessToast('获取用户信息成功')
        } else {
            // showSuccessToast('获取用户信息失败')
        }
    })
})

</script>

<style>
.upload_content {
    display: flex;
    align-content: center;
    justify-content: center;
}

.van-image__img {
    width: 100%;
    height: 100%;
}

.van-swipe__track {
    height: 100%;
}
</style>