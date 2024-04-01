<template>
  <div class="user-container">
    <div class="dept-layout">
      <dept-tree @change="data => (selectedDept = data)"></dept-tree>
    </div>
    <div class="user-layout">
      <user-list :selected-dept="selectedDept"></user-list>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

import DeptTree from './dept-tree.vue'
import UserList from './user-list/index.vue'

// 当前选中部门
const selectedDept = ref()
</script>
<style scoped lang="scss">
.user-container {
  display: flex;
  width: 100%;
  height: 100%;

  .dept-layout {
    padding: 10px;
    width: 250px;
    height: 100%;
    background-color: #fff;
    flex-shrink: 0;
  }

  .user-layout {
    overflow-x: hidden;
    padding: 10px;
    margin-left: 10px;
    height: 100%;
    flex: 1;
  }
}
</style>
