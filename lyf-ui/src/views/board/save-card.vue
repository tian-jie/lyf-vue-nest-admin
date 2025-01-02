<template>
  <el-dialog
    v-model="dialogVisible"
    :title="buildTitle()"
    width="500px"
    draggable
    @open="$emit('update:modelValue', true)"
    @close="$emit('update:modelValue', false)"
  >
    <el-form v-if="dialogVisible" ref="saveFormRef" :model="saveForm" :rules="formRules">
      <el-form-item prop="content">
        <el-input v-model="saveForm.content" type="textarea" rows="4" placeholder="请输入" clearable :maxlength="1024">
        </el-input>
      </el-form-item>
      <el-form-item prop="cardGroupId">
        <el-input v-model="_cardGroupId" type="hidden"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="dialogType === DialogTypeEnum.ADD ? handleAdd() : handleEdit()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'

import { DialogTypeEnum } from '@/api/common/types'
import { ISaveCardParams, ICard } from '@/api/card-board/types'
import { addCard, editCard } from '@/api/card-board/index'
import { Session } from '@/utils/storage'

const emits = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void
  (e: 'success'): void
}>()

const DEFAULT_FORM = {
  id: undefined,
  content: '',
  cardGroupId: 0
}

interface IProps {
  modelValue: boolean
  dialogType: DialogTypeEnum
  data: ICard | Record<string, unknown> // 编辑数据
  cardGroupId: number
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  dialogType: DialogTypeEnum.ADD,
  data: () => {
    return {}
  },
  cardGroupId: 0
})

const _cardGroupId = ref(props.cardGroupId)
const dialogVisible = ref(false)
const saveForm = ref<ISaveCardParams>(Object.assign({}, DEFAULT_FORM))
const saveFormRef = ref()
const formRules = {
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
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
      cardGroupId: props.cardGroupId
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
const doValidate = (callback: (params: ISaveCardParams) => void) => {
  saveFormRef.value.validate((valid: boolean) => {
    if (valid) {
      const params = Object.assign({}, saveForm.value, { user: Session.get('userInfo').username })
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
  doValidate((params: ISaveCardParams) => {
    addCard(params).then(() => {
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
  doValidate((params: ISaveCardParams) => {
    editCard(params).then(() => {
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
