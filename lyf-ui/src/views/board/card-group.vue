<template>
  <div class="card-group">
    <div style="display: flex;  position: relative;">
      <div :style="{ backgroundColor: selectedColor }" class="color-box" @click="showColorPicker"></div>
      <div class="selected-color" :style="{ backgroundColor: selectedColor }"></div>
      <div class="color-picker-container" v-show="showPicker">
        <div class="color-option color-box" style="background-color: red;" @click="selectColor('red')"></div>
        <div class="color-option color-box" style="background-color: green;" @click="selectColor('green')"></div>
        <div class="color-option color-box" style="background-color: yellowgreen;" @click="selectColor('yellowgreen')">
        </div>
        <div class="color-option color-box" style="background-color: rebeccapurple;"
          @click="selectColor('rebeccapurple')"></div>
        <div class="color-option color-box" style="background-color: blue ;" @click="selectColor('blue')"></div>
        <div class="color-option color-box" style="background-color: brown;" @click="selectColor('brown')"></div>
        <div class="color-option color-box" style="background-color: palevioletred;"
          @click="selectColor('palevioletred')"></div>
      </div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="cards">
      <a @click="handleAddCard">
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
import { IBoard, ICard, ICardGroup } from '@/api/card-board/types'
import { DialogTypeEnum } from '@/api/common/types'

const emit = defineEmits(['card-changed']);

const props = defineProps({
  title: String,
  color: String,
  cards: Array,
  cardGroupId: Number
});

const showPicker = ref(false);
const selectedColor = ref(props.color); // 初始颜色

const showColorPicker = () => {
  showPicker.value = !showPicker.value;
};

const selectColor = (color) => {
  selectedColor.value = color;
  props.color = color;
  showPicker.value = false;
};

/**
 * 新增
 * @param {ICard} card
 */
function handleAddCard(card?: ICard) {
  console.log('handle Add card - ' + props.cardGroupId)
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


</script>

<style>
.color-box {
  width: 24px;
  height: 24px;
}

.title {
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
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* 设置为纵向布局 */
  margin: -24px 0px 0px 30px;
}

.color-option {
  padding: 5px;
  cursor: pointer;
  margin: 5px 5px;
}
</style>