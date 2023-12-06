<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'input'
  },
  label: {
    type: String,
    default: ''
  },
  labelDesc: {
    type: String,
    default: ''
  },
  errorDesc: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  maxLength: {
    type: Number,
    default: 150
  }
})
const emit = defineEmits(['update:modelValue'])
function changeModal(v: string) {
  emit('update:modelValue', v)
}
function changeInput(v: any) {
  emit('update:modelValue', v.target.value)
}
const { modelValue, type, label, labelDesc, errorDesc, placeholder } = toRefs(props)
</script>

<template>
  <div class="bg-white">
    <div class="py-3 mx-5 border-bottom">
      <div class="text-sm flex-between">
        <div class="text-color/60">
          {{ label }}
          <span v-if="labelDesc" class="text-color/30">（{{ labelDesc }}）</span>
        </div>
        <div v-if="errorDesc" class="text-danger">
          {{ errorDesc }}
        </div>
      </div>
      <div class="mt-1 text-color/60">
        <input
          v-if="type === 'input'"
          v-model="modelValue"
          type="text"
          :maxLength="maxLength"
          :placeholder="placeholder"
          class="text-17px caret-primary van-field__control"
          @input="changeInput"
        />
        <van-field
          v-if="type === 'textarea'"
          v-model="modelValue"
          rows="2"
          autosize
          :class="modelValue.length ? 'custom-textarea !text-primary !caret-primary' : 'custom-textarea'"
          :maxlength="maxLength"
          show-word-limit
          type="textarea"
          :placeholder="placeholder"
          @update:model-value="changeModal"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less">
.custom-textarea {
  background-color: rgba(155, 158, 163, 0.08);
  border-radius: 6px;
  padding: 8px 12px;
  .van-field__word-limit {
    color: var(--van-gray-7);
  }
  &.\!text-primary .van-field__word-limit {
    color: var(--van-primary-color);
  }
}
</style>
