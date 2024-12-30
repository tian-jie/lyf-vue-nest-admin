<template>
  <div class="app">
    <!-- <Header :title="r.boardName"/> -->
    <!-- <Filter /> -->
    <div class="board-list">
      <div class="board" v-for="(board) in r.boards" :key="board.id">
        <div class="title"> {{ board.name }} </div>
        <div class="description"> {{ board.description }}</div>
        <div class="navigation" > 
          <router-link class="navigation-button" :to="{ name: 'board-board', params: { id: board.id } }">
            View board
          </router-link>  
        </div>
      </div>
      <div class="board new-board" @click="handleAddCard"><svg style="width: 40px" t="1735564602757" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1465" width="200" height="200"><path d="M992 384 640 384 640 32c0-17.672-14.328-32-32-32l-192 0c-17.672 0-32 14.328-32 32l0 352L32 384c-17.672 0-32 14.328-32 32l0 192c0 17.672 14.328 32 32 32l352 0 0 352c0 17.672 14.328 32 32 32l192 0c17.672 0 32-14.328 32-32L640 640l352 0c17.672 0 32-14.328 32-32l0-192C1024 398.328 1009.672 384 992 384z" fill="#8a8a8a" p-id="1466"></path></svg></div>
    </div>

    <SaveBoard v-model="saveDialogVisible" :data="saveDialogData" :card-group-id="cardGroupId"
      :dialog-type="saveDialogType" @success="refresh"></SaveBoard>

  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/index'
import { getMyBoards } from '@/api/card-board/index'
import { DialogTypeEnum } from '@/api/common/types'
import { ICardGroup, IBoard } from '@/api/card-board/types'
import { useRoute } from 'vue-router';
const route = useRoute();
import SaveBoard from './save-board.vue'

import Header from './header.vue'

const r = reactive({
  boards: [] as IBoard[],
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

/**
 * 新增
 * @param {IBoard} board
 */
 function handleAddCard(board?: IBoard) {
  saveDialogType.value = DialogTypeEnum.ADD
  saveDialogVisible.value = true
}
/**
 * 编辑
 * @param {IBoard} board
 */
function handleEditCard(board: IBoard) {
  saveDialogType.value = DialogTypeEnum.EDIT
  saveDialogData.value = board
  saveDialogVisible.value = true
}

// 新增、编辑
const saveDialogVisible = ref(false)
const saveDialogData = ref()
const saveDialogType = ref(DialogTypeEnum.ADD)
const cardGroupId = ref(0)


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

.new-board {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  border: 1px dashed #33333380;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px; /* Add margin to align with other boards */
}
</style>