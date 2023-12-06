<script lang="ts" setup>
import { BACK_URL, ENTRY_PAGE } from '@/utils/constant'

defineProps({
  title: String,
  rightText: {
    type: String,
    default: ''
  },
  zIndex: {
    type: Number,
    default: 1
  },
  fixed: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['clickLeft', 'clickRight'])

const router = useRouter()
const route = useRoute()
const slots = useSlots()

const entryPage = sessionStorage.getItem(ENTRY_PAGE)
const backUrl = sessionStorage.getItem(BACK_URL)
onMounted(() => {
  if (!entryPage) {
    if (route.query.back_url) {
      sessionStorage.setItem(BACK_URL, route.query.back_url as string)
    } else {
      sessionStorage.setItem(ENTRY_PAGE, route.path)
    }
  }
})

const clickRight = (e: MouseEvent) => emit('clickRight', e)

function clickLeft() {
  if (route.path === entryPage) {
    if (backUrl) {
      history.go(-1)
    } else {
      console.log('isEntryPage, 请手动关闭网页')
    }
  } else {
    router.back()
  }
}
</script>

<template>
  <van-navBar
    :title="title"
    left-arrow
    :border="false"
    :fixed="fixed"
    :z-index="zIndex"
    :placeholder="placeholder"
    :right-text="rightText"
    safe-area-inset-top
    @click-left="clickLeft"
    @click-right="clickRight"
  >
    <template v-if="slots.right" #right>
      <slot name="right" />
    </template>
    <template #left>
      <slot name="left">
        <svg-icon name="back" size="18px" fill="fill-black" />
      </slot>
    </template>
  </van-navBar>
</template>
