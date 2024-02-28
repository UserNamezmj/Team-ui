<template>
    <div>
        <form action="/">
            <van-search v-model="textSearch" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
                @clear="clear" />
        </form>
        <van-divider content-position="left">热门搜索</van-divider>
        <div v-if="activeIds.length == 0">
            <h5>请选择标签</h5>
        </div>
        <van-tag v-for="item in activeIds " :key=item :show="true" closeable size="medium" type="primary"
            @close="close(item)">{{
                item }}</van-tag>
        <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagsTextList" />
        <div style="padding: 10px;">
            <van-button round type="primary" style="width: 100%;" @click="SearchUserList">搜索用户</van-button>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import useStore from "@/utils/pinia.js";
//定义store的实列
const store = useStore()
store.name = '搜索页'
const router = useRouter()
const activeIds = ref([]);
const activeIndex = ref();
const textSearch = ref()
const items = [
    {
        text: '城市',
        children: [
            { text: '杭州', id: '杭州' },
            { text: '温州', id: '温州' },
            { text: '宁波', id: '宁波' },
            { text: '北京', id: '北京' },
            { text: '上海', id: '上海' },
            { text: '南京', id: '南京' },
        ],
    },
    {
        text: '年龄阶段',
        children: [
            { text: '少年', id: '少年' },
            { text: '青年', id: '青年' },
            { text: '中年', id: '中年' },
            { text: '中老年', id: '中老年' },
            { text: '老年', id: '老年' },
        ],
    }
];
const tagsTextList = ref(items)


/**可关闭标签 */
const close = (val) => {
    activeIds.value = activeIds.value.filter(item => {
        return item !== val
    })
};
const onSearch = (val) => {
    if (val.trim().length === 0) {
        tagsTextList.value = items
    } else {
        tagsTextList.value = items.map(item => {
            const tagChildren = [...item.children]
            const tagItem = { ...item }
            tagItem.children = tagChildren.filter(item => item.text.includes(val))
            return tagItem
        });
    }

};

//根据标签搜索用户
const SearchUserList = () => {
    console.log(activeIds.value);
    router.push({
        path: '/user',
        query: { activeIds: activeIds.value }
    })
}
const onCancel = () => {
    textSearch.value = ''
    tagsTextList.value = items
};

/**清楚按钮 */
const clear = () => {
    tagsTextList.value = items
}




</script>

<style></style>