<template>
  <div class="app">
    <Header :title="r.boardName"/>
    <!-- <Filter /> -->
    <div class="card-groups">
      <CardGroup v-for="(cardGroup) in r.cardGroups" :key="cardGroup.id" :title="cardGroup.name" :color="cardGroup.color"
        :cards="cardGroup.cards" :cardGroupId="cardGroup.id" class="card-group" @card-changed="refresh(1,1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/index'
import { getOneBoard } from '@/api/card-board/index'
import { DialogTypeEnum } from '@/api/common/types'
import { ICardGroup } from '@/api/card-board/types'
import { useRoute } from 'vue-router';
const route = useRoute();

import Header from './header.vue'
import Filter from './filter.vue'
import CardGroup from './card-group.vue'

const r = reactive({
  cardGroups: Array,
  boardName: String,
})

let boardId:number = 0
onMounted(async () => {
  boardId = parseInt(route.params.id); // 获取名为 'id' 的参数

  await refresh()
})

async function refresh(){
  console.log(boardId)
  var board = await getBoard(boardId)

  r.cardGroups = board.cardGroups
  r.boardName = board.name
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
</style>