<template>
  <div class="app">
    <!-- <Header :title="r.boardName"/> -->
    <!-- <Filter /> -->
    <div class="board-list">
      <div class="board" v-for="(board) in r.boards" :key="board.id">
        <div class="title"> {{ board.name }} </div>
        <div class="description"> This is sprint XXX retro meeting notes<br>这是xxx个sprint的内容<br>这是xxx个sprint的内容<br>这是xxx个sprint的内容<br>这是xxx个sprint的内容<br>这是xxx个sprint的内容</div>
        <div class="navigation" > 
          <router-link class="navigation-button" :to="{ name: 'board-board', params: { id: board.id } }">
            View board
          </router-link>  
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/index'
import { getMyBoards } from '@/api/card-board/index'
import { DialogTypeEnum } from '@/api/common/types'
import { ICardGroup } from '@/api/card-board/types'
import { useRoute } from 'vue-router';
const route = useRoute();

import Header from './header.vue'

const r = reactive({
  boards: Array,
})

let boardId = 0
onMounted(async () => {
  await refresh()
})

async function refresh(){
  r.boards = await getBoards()
  console.log(r.boards)
}

async function getBoards() {
  try {
    const response = await getMyBoards();
    return response.data

  } catch (error) {
    console.error('获取项目信息失败:', error);
    // 显示错误提示给用户
    // ...
    return null; // 或返回一个默认值
  }
}


</script>

<style>
.board {
  width: 300px;
  height: auto;
  margin: 10px;
  border: 1px solid #33333380;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.board-list {
  display: flex;
  flex-wrap: wrap;
  /* 或其他对齐方式 */
}

.title{
  font-weight: 800;
  border-bottom: 1px solid lightgray;
  padding: 8px 0px 16px 0px;
}

.description{
  border-bottom: 1px solid lightgray;
  padding: 12px 0px;
  font-weight: 300;
}

.navigation{
  text-align: right;
  height: 48px;
}

.navigation-button{
  top: 20px;
  position:relative;
  padding: 8px 16px;
  background-color:cadetblue;
  color:aliceblue;
  border: 1px solid darkgray;
}

</style>