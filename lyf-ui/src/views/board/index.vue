<template>
  <div class="app">
    <!-- <Header :title="r.boardName"/> -->
    <!-- <Filter /> -->
    <div class="board-list">
      <div class="board" v-for="(board) in r.boards" :key="board.id">
        <div class="board-content">
          <div class="title">
            <span class="title-text" :title="board.name">{{ board.name }}</span>
            <div class="actions">
              <a class="action" @click="handleEdit(board)">
                <svg t="1735704570674" class="icon" viewBox="0 0 1024 1024" width="20">
                  <path fill="#888" d="M117.351189 684.03268l231.577137 243.506713L25.600973 1024l91.750216-339.96732zM650.495723 123.496201l231.525937 243.455513L372.01948 903.168242l-231.577137-243.404314 510.05338-536.267727zM826.469771 17.819612l152.370895 160.20448c41.318317 43.417513 4.403191 82.585435 4.403192 82.585435l-77.875045 81.919836-231.628336-243.557913L751.615521 17.102814l1.023998-0.972798c6.092788-5.734389 39.731121-34.201532 73.881452 1.689596z"></path>
                </svg>
              </a>
              <a class="action" @click="handleDelete(board.id)">
                <svg t="1735704787540" class="icon" viewBox="0 0 1024 1024" width="20">
                  <path fill="#888" d="M857.2 167.6c22.4 0 41.2 3.6 55.6 11.2 14.8 7.6 26.4 16.8 34.8 28 8.8 11.2 14.8 23.2 18 36.4 3.2 13.2 5.2 25.2 5.2 36.4 0 5.2 0 9.2-0.4 12.4-0.4 2.8-0.4 5.6-0.4 8v6.8h-74.4V894c0 14.8-2.8 29.2-9.2 43.2-6 13.6-14.8 26-26 36.4-11.2 10.4-24.8 18.8-41.2 25.2-16 6.4-34.8 9.6-55.6 9.6H262.4c-19.6 0-38-2.8-55.2-8.8-17.2-6-32-14.4-44.4-25.2-12.4-10.8-22-24-29.2-39.2-7.2-15.2-10.8-32.8-10.8-52v-576h-70c-0.8-0.8-1.2-2.8-1.2-5.6-0.8-3.6-1.2-15.2-1.2-34.8 0-9.6 2.4-20.4 6.8-32.4s11.2-22.8 20.4-32.8c9.2-10 20.8-18.4 34.8-25.2 14.4-6.8 31.2-10 50.8-10h100V97.2c0-19.2 6.8-36 20.4-49.6 13.6-13.6 30-20.8 49.6-20.8h352c26.4 0 44.4 6.8 54.4 20.8 10 13.6 15.2 30.4 15.2 49.6v69.2c15.6 0.8 32.8 1.2 50.8 1.2h51.6z m-524 0h352V97.2h-352v70.4z m-34.8 708c24 0 36-15.2 36-46V310.8h-70v518.8c0 15.6 2.4 27.2 7.2 34.8 5.2 7.2 14 11.2 26.8 11.2z m212.4-1.2c12.8 0 21.2-3.6 26-10.8 4.4-7.2 6.8-18.4 6.8-34V310.8H474v518.8c-0.4 30 12 44.8 36.8 44.8z m211.6-2.4c13.6 0 22.4-3.6 26.8-10.8 4.4-7.2 6.8-18.4 6.8-34V310.8h-70.8v516.4c0 30 12.4 44.8 37.2 44.8z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div class="board-description"> {{ board.description }}</div>
          <div class="navigation" > 
            <router-link class="navigation-button" :to="{ name: 'board-board', params: { id: board.id } }">
              View board
            </router-link>  
          </div>
        </div>
      </div>
      <div class="board new-board" @click="handleAdd()"><svg style="width: 40px" t="1735564602757" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1465" width="200" height="200"><path d="M992 384 640 384 640 32c0-17.672-14.328-32-32-32l-192 0c-17.672 0-32 14.328-32 32l0 352L32 384c-17.672 0-32 14.328-32 32l0 192c0 17.672 14.328 32 32 32l352 0 0 352c0 17.672 14.328 32 32 32l192 0c17.672 0 32-14.328 32-32L640 640l352 0c17.672 0 32-14.328 32-32l0-192C1024 398.328 1009.672 384 992 384z" fill="#8a8a8a" p-id="1466"></path></svg></div>
    </div>

    <SaveBoard v-model="saveDialogVisible" :data="saveDialogData" :card-group-id="cardGroupId"
      :dialog-type="saveDialogType" @success="refresh"></SaveBoard>

  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/index'
import { getMyBoards, deleteBoard } from '@/api/card-board/index'
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
  r.boards = await getBoards() as IBoard[]
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
 function handleAdd(board?: IBoard) {
  saveDialogType.value = DialogTypeEnum.ADD
  saveDialogVisible.value = true
}
/**
 * 编辑
 * @param {IBoard} board
 */
function handleEdit(board: IBoard) {
  saveDialogType.value = DialogTypeEnum.EDIT
  saveDialogData.value = board
  saveDialogVisible.value = true
}

async function handleDelete(id: number) {
  await deleteBoard(id);
  await refresh();
}


// 新增、编辑
const saveDialogVisible = ref(false)
const saveDialogData = ref()
const saveDialogType = ref(DialogTypeEnum.ADD)
const cardGroupId = ref(0)


</script>

<style>
.board {
  height: auto;
}

.board-content{
  border: 1px solid #33333380;
  border-radius: 8px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
  width: 300px;
}

.board-list {
  display: flex;
  flex-wrap: wrap;
  /* 或其他对齐方式 */
}

.board .title{
  font-weight: 800;
  border-bottom: 1px solid lightgray;
  padding: 8px 0px 16px 0px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  width: 280px;
}

.title-text{
  width: 224px;
  display: -webkit-box;          /* Flexbox container */
  -webkit-line-clamp: 3;         /* Number of lines to show */
  -webkit-box-orient: vertical;  /* Orient flexbox as vertical */
  overflow: hidden;              /* Hide overflowing content */
  text-overflow: ellipsis;       /* Add ellipsis (...) */
}

.actions{
  width: 56px;
}

.action {
  padding: 0px 4px;
  font-size: 12px;
  cursor: pointer;
  background-color: #f5f5f5;
  vertical-align: top;
}

.board-description{
  border-bottom: 1px solid lightgray;
  padding: 12px 0px;
  font-weight: 300;
  white-space: pre-line;
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