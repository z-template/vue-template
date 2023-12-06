<template>
  <div>
    <NavBar title="h5-vue" />
    <div class="p-4-5-3 text-center text-color/60">
      <router-link to="/demo/home" class="text-primary text-base"> to demo </router-link>
    </div>
    <div class="py-4 mx-3 bg-white rounded">
      <h2 class="px-5 text-lg pb-2 border-bottom">🎉功能特性</h2>
      <van-list>
        <van-cell title="👉基于Vite3 + TS 构建H5基础脚手架" />
        <van-cell title="👉Pinia + vant3" />
        <van-cell title="👉ofetch封装及接口管理" />
        <van-cell title="👉rem适配" />
        <van-cell title="👉windicss 样式组件" />
        <van-cell title="👉Eslint + Prettier 代码规范" />
        <van-cell title="👉集成svg图标组件" label="<svg-icon name='back' size='20px' />" />
        <van-cell title="👉vite.config.ts最佳配置" label="jsx+legacy+autoImport+console+pwa+gzip" />
      </van-list>
    </div>
    <RouterView />
  </div>
</template>

<style>
.deo {
  color: red;
}
</style>
