<script setup lang="tsx">
const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="text-center">
      <div class="text-lg pt-100px">404 NotFound</div>
      <van-button type="success" size="small" @click="() => router.go(-1)"> 返回上一页 </van-button>
    </div>
  </div>
</template>
