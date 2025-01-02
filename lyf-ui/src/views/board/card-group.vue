<template>
  <div class="card-group">
    <div style="display: flex; position: relative">
      <div :style="{ backgroundColor: selectedColor }" class="color-box" @click="showColorPicker"></div>
      <div class="selected-color" :style="{ backgroundColor: selectedColor }"></div>
      <div v-show="showPicker && hasLoggedUser" class="color-picker-container">
        <div class="color-option color-box" style="background-color: red" @click="selectColor('red')"></div>
        <div class="color-option color-box" style="background-color: green" @click="selectColor('green')"></div>
        <div
          class="color-option color-box"
          style="background-color: yellowgreen"
          @click="selectColor('yellowgreen')"
        ></div>
        <div
          class="color-option color-box"
          style="background-color: rebeccapurple"
          @click="selectColor('rebeccapurple')"
        ></div>
        <div class="color-option color-box" style="background-color: blue" @click="selectColor('blue')"></div>
        <div class="color-option color-box" style="background-color: brown" @click="selectColor('brown')"></div>
        <div
          class="color-option color-box"
          style="background-color: palevioletred"
          @click="selectColor('palevioletred')"
        ></div>
      </div>
      <div class="card-group-title">
        <span class="title-text" :title="title">{{ title }}</span>
        <div v-if="hasLoggedUser" class="actions">
          <a class="action" @click="emit('edit-card-group', props.cardGroupId)">
            <svg t="1735704570674" class="icon" viewBox="0 0 1024 1024" width="20">
              <path
                fill="#888"
                d="M117.351189 684.03268l231.577137 243.506713L25.600973 1024l91.750216-339.96732zM650.495723 123.496201l231.525937 243.455513L372.01948 903.168242l-231.577137-243.404314 510.05338-536.267727zM826.469771 17.819612l152.370895 160.20448c41.318317 43.417513 4.403191 82.585435 4.403192 82.585435l-77.875045 81.919836-231.628336-243.557913L751.615521 17.102814l1.023998-0.972798c6.092788-5.734389 39.731121-34.201532 73.881452 1.689596z"
              ></path>
            </svg>
          </a>
          <a class="action" @click="emit('delete-card-group', props.cardGroupId)">
            <svg t="1735704787540" class="icon" viewBox="0 0 1024 1024" width="20">
              <path
                fill="#888"
                d="M857.2 167.6c22.4 0 41.2 3.6 55.6 11.2 14.8 7.6 26.4 16.8 34.8 28 8.8 11.2 14.8 23.2 18 36.4 3.2 13.2 5.2 25.2 5.2 36.4 0 5.2 0 9.2-0.4 12.4-0.4 2.8-0.4 5.6-0.4 8v6.8h-74.4V894c0 14.8-2.8 29.2-9.2 43.2-6 13.6-14.8 26-26 36.4-11.2 10.4-24.8 18.8-41.2 25.2-16 6.4-34.8 9.6-55.6 9.6H262.4c-19.6 0-38-2.8-55.2-8.8-17.2-6-32-14.4-44.4-25.2-12.4-10.8-22-24-29.2-39.2-7.2-15.2-10.8-32.8-10.8-52v-576h-70c-0.8-0.8-1.2-2.8-1.2-5.6-0.8-3.6-1.2-15.2-1.2-34.8 0-9.6 2.4-20.4 6.8-32.4s11.2-22.8 20.4-32.8c9.2-10 20.8-18.4 34.8-25.2 14.4-6.8 31.2-10 50.8-10h100V97.2c0-19.2 6.8-36 20.4-49.6 13.6-13.6 30-20.8 49.6-20.8h352c26.4 0 44.4 6.8 54.4 20.8 10 13.6 15.2 30.4 15.2 49.6v69.2c15.6 0.8 32.8 1.2 50.8 1.2h51.6z m-524 0h352V97.2h-352v70.4z m-34.8 708c24 0 36-15.2 36-46V310.8h-70v518.8c0 15.6 2.4 27.2 7.2 34.8 5.2 7.2 14 11.2 26.8 11.2z m212.4-1.2c12.8 0 21.2-3.6 26-10.8 4.4-7.2 6.8-18.4 6.8-34V310.8H474v518.8c-0.4 30 12 44.8 36.8 44.8z m211.6-2.4c13.6 0 22.4-3.6 26.8-10.8 4.4-7.2 6.8-18.4 6.8-34V310.8h-70.8v516.4c0 30 12.4 44.8 37.2 44.8z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="cards">
      <a @click="handleAdd()">
        <div :style="{ backgroundColor: selectedColor }" class="add-card">+ Add Card</div>
      </a>
      <Card v-for="card in cards" :key="card.id" :content="card.content" style="card" />
    </div>

    <SaveCard
      v-model="saveDialogVisible"
      :data="saveDialogData"
      :card-group-id="cardGroupId"
      :dialog-type="saveDialogType"
      @success="emit('card-changed')"
    ></SaveCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from 'vue'
import Card from './card.vue'
import SaveCard from './save-card.vue'
import { IBoard, ICard, ICardGroup, ISaveCardGroupParams } from '@/api/card-board/types'
import { DialogTypeEnum } from '@/api/common/types'
import { editCardGroup } from '@/api/card-board/index'
import { useUserStore } from '@/store'
import { IUserInfo } from '@/api/user/types'
import { Session } from '@/utils/storage'

const emit = defineEmits(['card-changed', 'edit-card-group', 'delete-card-group'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  cards: {
    type: Array as PropType<ICard[]>,
    default: () => []
  },
  cardGroupId: {
    type: Number,
    default: 0
  },
  boardId: {
    type: Number,
    default: 0
  }
})

const showPicker = ref(false)
const selectedColor = ref(props.color) // 初始颜色
const userInfo = getUserInfo()

const hasLoggedUser = ref(userInfo && userInfo.id !== 0)

const showColorPicker = () => {
  showPicker.value = !showPicker.value
}

const selectColor = (color: string) => {
  selectedColor.value = color
  showPicker.value = false

  editCardGroup({
    id: props.cardGroupId,
    color: color,
    name: props.title
  } as ISaveCardGroupParams).then(() => {
    close()
  })
}

/**
 * 新增
 * @param {ICard} card
 */
function handleAdd(card?: ICard) {
  cardGroupId.value = props.cardGroupId as number
  saveDialogType.value = DialogTypeEnum.ADD
  saveDialogVisible.value = true
}

// 新增、编辑
const saveDialogVisible = ref(false)
const saveDialogData = ref()
const saveDialogType = ref(DialogTypeEnum.ADD)
const cardGroupId = ref(props.cardGroupId)

const boardId = ref(props.boardId)

function getUserInfo(): IUserInfo {
  return Session.get('userInfo')
}
</script>

<style>
.color-box {
  width: 24px;
  height: 24px;
}

.card-group-title {
  margin-left: 10px;
  font-size: medium;
  font-weight: 400;
  line-height: 24px;
  display: flex;
}

.card-group-title .title-text {
  width: 210px;
}

.actions {
  width: 56px;
}

.action {
  padding: 0px 4px;
  font-size: 12px;
  cursor: pointer;
  background-color: #f5f5f5;
  vertical-align: top;
}

.add-card {
  width: 100%;
  margin-top: 20px;
  color: aliceblue;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
}

.color-picker {
  position: relative;
}

.color-picker-container {
  position: absolute;
  top: 100%;
  background: #eee;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* 设置为纵向布局 */
  margin: -24px 0px 0px 30px;
  z-index: 100;
}

.color-option {
  padding: 5px;
  cursor: pointer;
  margin: 5px 5px;
}
</style>
