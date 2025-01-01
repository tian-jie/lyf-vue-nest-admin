<template>
  <el-dialog v-model="dialogVisible" :title="buildTitle()" width="500px" draggable
    @open="$emit('update:modelValue', true)" @close="$emit('update:modelValue', false)">
    <el-form v-if="dialogVisible" ref="saveFormRef" :model="saveForm" :rules="formRules">
      <el-form-item prop="content" label="标题">
        <el-input type="text" rows="4" v-model="saveForm.name" placeholder="请输入" clearable
          :maxlength="1024"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input type="textarea" v-model="saveForm.description"></el-input>
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
import { ISaveBoardParams, IBoard } from '@/api/card-board/types'
import { addBoard, editBoard } from '@/api/card-board/index'


const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void
  (e: 'success'): void
}>()

const DEFAULT_FORM = {
  id: undefined,
  name: '',
  description: '',
}

interface IProps {
  modelValue: boolean
  dialogType: DialogTypeEnum
  data: IBoard | Record<string, unknown> // 编辑数据
  cardGroupId: number
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  dialogType: DialogTypeEnum.ADD,
  data: () => {
    return {}
  },
})

const _cardGroupId = ref(props.cardGroupId)
const dialogVisible = ref(false)
const saveForm = ref<ISaveBoardParams>(Object.assign({}, DEFAULT_FORM))
const saveFormRef = ref()
const formRules = {
  name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
}

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
    })
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
const doValidate = (callback: (params: ISaveBoardParams) => void) => {
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
  doValidate((params: ISaveBoardParams) => {
    addBoard(params).then(() => {
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
  doValidate((params: ISaveBoardParams) => {
    editBoard(params).then(() => {
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
</style>
