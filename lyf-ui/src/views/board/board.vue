<template>
  <div class="app">
    <Header :title="r.boardName"/>
    <!-- <Filter /> -->
    <div class="card-groups">
      <CardGroup v-for="(cardGroup) in r.cardGroups" :key="cardGroup.id" :title="cardGroup.name" :color="cardGroup.color"
        :cards="cardGroup.cards" :cardGroupId="cardGroup.id" class="card-group" @card-changed="refresh" />
      <div class="card-groups new-card-groups" @click="handleAddCardGroup()">
        <svg style="width: 40px" t="1735564602757" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1465" ><path d="M992 384 640 384 640 32c0-17.672-14.328-32-32-32l-192 0c-17.672 0-32 14.328-32 32l0 352L32 384c-17.672 0-32 14.328-32 32l0 192c0 17.672 14.328 32 32 32l352 0 0 352c0 17.672 14.328 32 32 32l192 0c17.672 0 32-14.328 32-32L640 640l352 0c17.672 0 32-14.328 32-32l0-192C1024 398.328 1009.672 384 992 384z" fill="#8a8a8a" p-id="1466"></path></svg>
      </div>
    </div>
    <SaveCardGroup v-model="saveDialogVisible" :data="saveDialogData" :board-id="boardId"
      :dialog-type="saveDialogType" @success="refresh"></SaveCardGroup>
 </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
import { getOneBoard } from '@/api/card-board/index'
import { DialogTypeEnum } from '@/api/common/types'
import { ICardGroup } from '@/api/card-board/types'
import { useRoute } from 'vue-router';
import SaveCardGroup from './save-card-group.vue'
const route = useRoute();

import Header from './header.vue'
import Filter from './filter.vue'
import CardGroup from './card-group.vue'

const r = reactive({
  cardGroups: [] as ICardGroup[],
  boardName: String,
})

onMounted(async () => {
  boardId.value = parseInt(route.params.id as string); // 获取名为 'id' 的参数

  await refresh()
})

async function refresh(){
  console.log(boardId)
  var board = await getBoard(boardId.value)

  r.cardGroups = board?.cardGroups?.sort((a, b) => {
    if (a.sort === b.sort) {
      return a.id - b.id;
    }
    return a.sort - b.sort;
  });
  r.boardName = board?.name
}

async function getBoard(id: number) {
  try {
    const response = await getOneBoard({ id });
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
 * @param {ICard} card
 */
 function handleAddCardGroup(cardGroup?: ICardGroup) {
  saveDialogType.value = DialogTypeEnum.ADD
  saveDialogVisible.value = true
}


// 新增、编辑
const saveDialogVisible = ref(false)
const saveDialogData = ref()
const saveDialogType = ref(DialogTypeEnum.ADD)

const boardId = ref(0)

</script>

<style>
.card-group {
  width: 300px;
  height: auto;
  margin: 10px;
}

.card-groups {
  display: flex;
  flex-wrap: wrap;
  /* 或其他对齐方式 */
}


.new-card-groups {
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