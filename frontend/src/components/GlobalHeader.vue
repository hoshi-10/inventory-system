<template>
  <a-row :wrap="false" class="header">
    
    <!-- 左边：系统名称 -->
    <a-col flex="220px">
      <RouterLink to="/" class="system-title">
        商品监控系统
      </RouterLink>
    </a-col>

    <!-- 中间：导航菜单 -->
    <a-col flex="auto">
      <a-menu
        :selected-keys="current"
        mode="horizontal"
        :items="items"
        @click="doMenuClick"
      />
    </a-col>

    <!-- 右边：登录 -->
    <a-col flex="120px">
      <div class="user-login-status">
        <div v-if="loginUserStore.loginUser.id">
          {{ loginUserStore.loginUser.userName ?? '无名' }}
        </div>

        <div v-else>
          <a-button type="primary" @click="router.push('/user/login')">
            登录
          </a-button>
        </div>
      </div>
    </a-col>

  </a-row>
</template>

<script setup>
import { h, ref, computed } from 'vue';
import { HomeOutlined,UnorderedListOutlined } from '@ant-design/icons-vue';
import {useRouter, useRoute} from "vue-router";
import { useLoginStore } from "@/stores/user";
const loginUserStore = useLoginStore();
const router = useRouter();
const route = useRoute();
const current = computed(() => {
  const p = route.path
  if (p.startsWith('/list') || p.startsWith('/detail')) return ['list']
  return ['home']
});
const doMenuClick = ({ key }) => {
  if (key === 'other') return  // 市集是外链,不走路由
  router.push({ name: key })
}//点击菜单跳转
const items = ref([
  {
    key: 'home',
    icon: () => h(HomeOutlined),
    label: '首页',
    title: '首页'
  },
  {
    key:'list',
    icon: () => h(UnorderedListOutlined),
    label: '商品列表',
    title: '商品列表'
  },
  {
    key:'other',
    label:h('a',{href:'https://mall.bilibili.com/neul-next/resell/home.html',target:'_blank'},'前往市集'),
    title:'前往市集'
  }
]);
</script>
<style scoped>
.header {
  height: 64px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  align-items: center;
}

.system-title {
  display: flex;
  align-items: center;
  height: 64px;
  padding-left: 24px;

  color: #222;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
}

.user-login-status {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 登录按钮：蓝色 → 粉橙色 */
:deep(.ant-btn-primary) {
  background: #e96958;
  border-color: #e96958;
}
/* 当前选中的导航项：蓝色 → 粉橙色 */
:deep(.ant-menu-horizontal > .ant-menu-item-selected) {
  color: #e96958;
}

/* 当前选中的图标 */
:deep(.ant-menu-horizontal > .ant-menu-item-selected .anticon) {
  color: #e96958;
}

/* 当前选中的底部横线 */
:deep(.ant-menu-horizontal > .ant-menu-item-selected::after) {
  border-bottom-color: #e96958;
}
/* 鼠标悬停时：蓝色 → 粉橙色 */
:deep(.ant-menu-horizontal > .ant-menu-item:hover) {
  color: #e96958;
}

/* 鼠标悬停时的底部横线 */
:deep(.ant-menu-horizontal > .ant-menu-item:hover::after) {
  border-bottom-color: #e96958;
}
</style>