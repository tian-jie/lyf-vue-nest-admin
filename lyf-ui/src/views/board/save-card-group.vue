<template>
  <el-dialog v-model="dialogVisible" :title="buildTitle()" width="500px" draggable
    @open="$emit('update:modelValue', true)" @close="$emit('update:modelValue', false)">
    <el-form v-if="dialogVisible" ref="saveFormRef" :model="saveForm" :rules="formRules">
      <el-form-item prop="content" label="标题">
        <el-input type="text" rows="4" v-model="saveForm.name" placeholder="请输入" clearable
          :maxlength="1024"></el-input>
      </el-form-item>
      <el-form-item prop="color" label="颜色">
        <el-input type="text" readonly v-model="saveForm.color"></el-input>
        <div class="color-picker">
          <div :class="{'color-option': true,  'color-box': true, 'selected': selectedColor=='red'}" style="background-color: red;" @click="selectColor('red')"></div>
          <div :class="{'color-option': true,  'color-box': true, 'selected': selectedColor=='green'}" style="background-color: green;" @click="selectColor('green')"></div>
          <div :class="{'color-option': true,  'color-box': true, 'selected': selectedColor=='yellowgreen'}" style="background-color: yellowgreen;" @click="selectColor('yellowgreen')"></div>
          <div :class="{'color-option': true,  'color-box': true, 'selected': selectedColor=='rebeccapurple'}" style="background-color: rebeccapurple;"@click="selectColor('rebeccapurple')"></div>
          <div :class="{'color-option': true,  'color-box': true, 'selected': selectedColor=='blue'}" style="background-color: blue ;" @click="selectColor('blue')"></div>
          <div :class="{'color-option': true,  'color-box': true, 'selected': selectedColor=='brown'}" style="background-color: brown;" @click="selectColor('brown')"></div>
          <div :class="{'color-option': true,  'color-box': true, 'selected': selectedColor=='palevioletred'}" style="background-color: palevioletred;"@click="selectColor('palevioletred')"></div>
        </div>
      </el-form-item>
      <el-form-item prop="boardId">
        <el-input type="hidden" v-model="_boardId"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="dialogType === DialogTypeEnum.ADD ? handleAdd() : handleEdit()">确定</el-button>
      </div>
    </template>


  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'

import { DialogTypeEnum } from '@/api/common/types'
import { ISaveCardGroupParams, ICardGroup } from '@/api/card-board/types'
import { addCardGroup, editCardGroup } from '@/api/card-board/index'


const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void
  (e: 'success'): void
}>()

const DEFAULT_FORM = {
  id: undefined,
  name: '',
  boardId: 0,
  color: 'red'
}

interface IProps {
  modelValue: boolean
  dialogType: DialogTypeEnum
  data: ICardGroup | Record<string, unknown> // 编辑数据
    boardId: number
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  dialogType: DialogTypeEnum.ADD,
  data: () => {
    return {}
  },
  color: 'red'
})

const _boardId = ref(props.boardId)
const dialogVisible = ref(false)
const saveForm = ref<ISaveCardGroupParams>(Object.assign({}, DEFAULT_FORM))
const saveFormRef = ref()
const formRules = {
  name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
}
const selectedColor = ref('red');

watch(
  () => props.modelValue,
  newValue => {
    if (newValue) {
      show()
    } else {
      close()
    }
  }
)

const selectColor = (color) => {
  selectedColor.value = color;
  saveForm.value.color = color;
};

/**
 * 显示
 */
const show = () => {
  init()
  dialogVisible.value = true
}
/**
 * 关闭
 */
const close = () => {
  dialogVisible.value = false
}
/**
 * 初始化
 */
const init = () => {
  if (props.dialogType === DialogTypeEnum.ADD) {
    saveForm.value = Object.assign({}, DEFAULT_FORM, {
      boardId: props.boardId})
  } else {
    saveForm.value = Object.assign({}, DEFAULT_FORM, props.data)
  }

}
/**
 * dialog title
 */
const buildTitle = () => {
  return props.dialogType === DialogTypeEnum.ADD ? '新增' : '编辑'
}

/**
 * 校验
 * @param {Fucntion} callback
 */
const doValidate = (callback: (params: ISaveCardGroupParams) => void) => {
  saveFormRef.value.validate((valid: boolean) => {
    if (valid) {
      const params = Object.assign({}, saveForm.value)
      callback(params)
    } else {
      return false
    }
  })
}
/**
 * 新增
 */
const handleAdd = () => {
  doValidate((params: ISaveCardGroupParams) => {
    addCardGroup(params).then(() => {
      emits('success')
      ElMessage({
        type: 'success',
        message: '新增成功'
      })
      close()
    })
  })
}
/**
 * 编辑
 */
const handleEdit = () => {
  doValidate((params: ISaveCardGroupParams) => {
    editCardGroup(params).then(() => {
      emits('success')
      ElMessage({
        type: 'success',
        message: '编辑成功'
      })
      close()
    })
  })
}
</script>

<style scoped lang="scss">
.block-item {
  width: 100%;
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
}

.selected {
  /* 增加阴影 */
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
}
</style>
