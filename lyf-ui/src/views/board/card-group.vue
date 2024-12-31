<template>
  <div class="card-group">
    <div style="display: flex;  position: relative;">
      <div :style="{ backgroundColor: selectedColor }" class="color-box" @click="showColorPicker"></div>
      <div class="selected-color" :style="{ backgroundColor: selectedColor }"></div>
      <div class="color-picker-container" v-show="showPicker">
        <div class="color-option color-box" style="background-color: red;" @click="selectColor('red')"></div>
        <div class="color-option color-box" style="background-color: green;" @click="selectColor('green')"></div>
        <div class="color-option color-box" style="background-color: yellowgreen;" @click="selectColor('yellowgreen')"></div>
        <div class="color-option color-box" style="background-color: rebeccapurple;"@click="selectColor('rebeccapurple')"></div>
        <div class="color-option color-box" style="background-color: blue ;" @click="selectColor('blue')"></div>
        <div class="color-option color-box" style="background-color: brown;" @click="selectColor('brown')"></div>
        <div class="color-option color-box" style="background-color: palevioletred;"@click="selectColor('palevioletred')"></div>
      </div>
      <div class="card-group-title">{{ title }}</div>
    </div>
    <div class="cards">
      <a @click="handleAddCard()">
        <div :style="{ backgroundColor: selectedColor }" class="add-card">+ Add Card</div>
      </a>
      <Card v-for="card in cards" :key="card.id" :content="card.content" style="card" />
    </div>

    <SaveCard v-model="saveDialogVisible" :data="saveDialogData" :card-group-id="cardGroupId"
      :dialog-type="saveDialogType" @success="emit('card-changed')"></SaveCard>

</div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue';
import Card from './card.vue'
import SaveCard from './save-card.vue'
import { IBoard, ICard, ICardGroup, ISaveCardGroupParams } from '@/api/card-board/types'
import { DialogTypeEnum } from '@/api/common/types'
import { editCardGroup } from '@/api/card-board/index'

const emit = defineEmits(['card-changed']);

const props = defineProps({
  title: String,
  color: String,
  cards: Array,
  cardGroupId: Number,
  boardId: Number
});

const showPicker = ref(false);
const selectedColor = ref(props.color); // 初始颜色

const showColorPicker = () => {
  showPicker.value = !showPicker.value;
};

const selectColor = (color: string) => {
  selectedColor.value = color;
  props.color = color;
  showPicker.value = false;

  editCardGroup({
    id: props.cardGroupId,
    color: color,
    name: props.title,
  } as ISaveCardGroupParams).then(() => {
    close()
  })
};

/**
 * 新增
 * @param {ICard} card
 */
function handleAddCard(card?: ICard) {
  cardGroupId.value = props.cardGroupId
  saveDialogType.value = DialogTypeEnum.ADD
  saveDialogVisible.value = true
}
/**
 * 编辑
 * @param {ICard} card
 */
function handleEditCard(card: ICard) {
  saveDialogType.value = DialogTypeEnum.EDIT
  saveDialogData.value = card
  saveDialogVisible.value = true
}

// 新增、编辑
const saveDialogVisible = ref(false)
const saveDialogData = ref()
const saveDialogType = ref(DialogTypeEnum.ADD)
const cardGroupId = ref(0)

const boardId = ref(props.boardId)


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