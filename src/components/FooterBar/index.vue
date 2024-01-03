<script setup lang="ts">
import { ref } from 'vue'
import { useElementSize } from '@vueuse/core'

const slotDefault = ref(true)
const footRef = ref(null)

const { height } = useElementSize(footRef!)

onUpdated(() => {
  slotDefault.value = !!useSlots().default()[0].props
  console.log(slotDefault.value)
})
</script>

<template>
  <div :style="{ height: `${height}px` }" class="mt-2">
    <div ref="footRef" class="fixed bottom-0 w-full px-5" :class="{ 'bg-white border-t': slotDefault }" v-bind="$attrs">
      <div v-if="slotDefault" class="py-4"><slot /></div>
      <div class="van-safe-area-bottom" />
    </div>
  </div>
</template>
