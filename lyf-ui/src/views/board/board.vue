<template>
  <div class="app">
    <Header :title="r.boardName" :description="r.description" />
    <!-- <Filter /> -->
    <div class="card-groups">
      <CardGroup
        v-for="cardGroup in r.cardGroups"
        :key="cardGroup.id"
        :title="cardGroup.name"
        :color="cardGroup.color"
        :cards="cardGroup.cards"
        :card-group-id="cardGroup.id"
        class="card-group"
        @card-changed="refresh"
        @edit-card-group="handleEdit"
        @delete-card-group="handleDelete"
      />
      <div v-if="userInfo?.id !== 0" class="card-groups new-card-groups" @click="handleAdd()">
        <svg
          style="width: 40px"
          t="1735564602757"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1465"
        >
          <path
            d="M992 384 640 384 640 32c0-17.672-14.328-32-32-32l-192 0c-17.672 0-32 14.328-32 32l0 352L32 384c-17.672 0-32 14.328-32 32l0 192c0 17.672 14.328 32 32 32l352 0 0 352c0 17.672 14.328 32 32 32l192 0c17.672 0 32-14.328 32-32L640 640l352 0c17.672 0 32-14.328 32-32l0-192C1024 398.328 1009.672 384 992 384z"
            fill="#8a8a8a"
            p-id="1466"
          ></path>
        </svg>
      </div>
    </div>
    <SaveCardGroup
      v-model="saveDialogVisible"
      :data="saveDialogData"
      :board-id="boardId"
      :dialog-type="saveDialogType"
      @success="refresh"
    ></SaveCardGroup>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, App } from 'vue'
import { deleteCardGroup, getOneBoard } from '@/api/card-board/index'
import { DialogTypeEnum } from '@/api/common/types'
import { ICardGroup } from '@/api/card-board/types'
import { useRoute, useRouter } from 'vue-router'
import { IUserInfo } from '@/api/user/types'
import SaveCardGroup from './save-card-group.vue'
const route = useRoute()
const router = useRouter()

import Header from './header.vue'
import Filter from './filter.vue'
import CardGroup from './card-group.vue'
import { useUserStore } from '@/store'
import { PiniaPlugin, Pinia } from 'pinia'
import { generateGUID } from '@/utils/utils'
import { IDept } from '@/api/dept/types'
import { Session } from '@/utils/storage'
const userStore = useUserStore()

const r = reactive({
  cardGroups: [] as ICardGroup[],
  boardName: '',
  description: ''
})

onMounted(async () => {
  boardId.value = parseInt(route.params.id as string) // 获取名为 'id' 的参数

  const user = Session.get('userInfo')
  if (!(user && typeof user === 'object' && user.username)) {
    const tmpUser: IUserInfo = {
      username: generateGUID(12),
      permission: [],
      id: 0,
      nickname: '',
      department: {} as IDept,
      roles: [],
      sex: '',
      phoneNumber: '',
      status: '',
      createTime: '',
      updateTime: ''
    }
    console.log('tmpUser: ', tmpUser)

    await userStore.setUserInfo(tmpUser)
    userInfo.value = userStore.userInfo
    console.log('userInfo.value: ', userInfo.value)
  } else {
    userInfo.value = user
  }

  // 确保刷新前，用户信息已更新
  await refresh()
})

async function refresh() {
  // TODO: refresh是偷懒的方式，只要任何变化，都强制刷新页面，保持本地页面最新
  // TODO: 将来应该做成，后台成功后，前台不刷新页面，用一个动效将页面更新掉即可。
  // TODO: 关联的内容，需要做signalR的通知，让其他的客户端可以收到添加、删除、修改的通知，然后更新页面。
  console.log(boardId)
  let board = await getBoard(boardId.value)

  r.cardGroups = board?.cardGroups?.sort((a, b) => {
    if (a.sort === b.sort) {
      return a.id - b.id
    }
    return a.sort - b.sort
  }) as ICardGroup[]
  r.boardName = board?.name
  r.description = board?.description
}

async function getBoard(id: number) {
  const response = await getOneBoard({ id })
  return response.data
}

/**
 * 新增
 * @param {ICardGroup} cardGroup
 */
function handleAdd(cardGroup?: ICardGroup) {
  saveDialogType.value = DialogTypeEnum.ADD
  saveDialogVisible.value = true
}

/**
 * 编辑
 */
async function handleEdit(cardGroupId: number) {
  const cardGroup = r.cardGroups.find(c => c.id === cardGroupId)
  saveDialogType.value = DialogTypeEnum.EDIT
  saveDialogData.value = cardGroup
  saveDialogVisible.value = true
  await refresh()
}

/**
 * 编辑
 */
async function handleDelete(cardGroupId: number) {
  await deleteCardGroup(cardGroupId)
  await refresh()
}

// 新增、编辑
const saveDialogVisible = ref(false)
const saveDialogData = ref()
const saveDialogType = ref(DialogTypeEnum.ADD)
const userInfo = ref<IUserInfo | null>({} as IUserInfo)

const boardId = ref(0)
</script>

<style>
.card-group {
  width: 300px;
  height: auto;
  margin: 10px 10px 40px 10px;
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
