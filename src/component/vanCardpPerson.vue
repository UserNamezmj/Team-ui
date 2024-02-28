<template>
    <div>
        <div class="style_font_class"><van-icon name="replay" />星用户推荐</div>
        <van-card v-for="item in formList" :key="item.id" tag="标签" :title="item.userAccount" :thumb="item.avatarUrl">
            <template #tags>
                <van-tag plain type="primary" v-for="tags in  item.tags" :key="tags">{{ tags }}</van-tag>
            </template>
            <template #footer>
                <van-button size="mini">查看用户</van-button>
                <van-button size="mini" @click="handleConnection(item.id)">关注用户</van-button>
            </template>
        </van-card>
    </div>
</template>

<script setup>
import { connection } from "@/api/user.js";
//组件传值
const props = defineProps({
    formList: {
        required: true
    }
})

/**关注用户 */
function handleConnection(value) {

    connection(value).then(res => {
        console.log(res);
    })

}
</script>

<style>
.style_font_class {
    text-align: right;
    font-size: 14.5px;
    color: rgb(255, 119, 0);
}
</style>