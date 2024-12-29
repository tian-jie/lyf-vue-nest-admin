<template>
  <div class="app-container">
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useAppStore } from '@/store/index'

import AppMain from './app-main.vue'
import Navbar from './navbar/index.vue'

export default defineComponent({
  components: {
    AppMain,
    Navbar,
  },
  setup() {
    // 左侧菜单收缩状态
    const isCollapsed = true;
  }
})
</script>
<style scoped lang="scss">
.app-container {
  position: relative;
  width: 100%;
  height: 100%;

  .sidebar-container {
    float: left;
    height: 100%;
    background-color: #001529;

    .sidebar-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;

      img {
        width: 32px;
        height: 32px;
      }

      &__title {
        margin-left: 10px;
        font-size: 16px;
        color: #fff;
      }
    }

    .sidebar-main {
      overflow: auto;
      height: calc(100% - 50px);
    }
  }

  .main-container {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
}
</style>
