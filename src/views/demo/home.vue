<script lang="ts" setup>
import { showConfirmDialog, showLoadingToast, showToast } from 'vant'
import { PageTitle } from '@/common/'
import FormItem from '@/common/FormItem/index.vue'
import success from '@/assets/svg/success.svg'
import fail from '@/assets/svg/fail.svg'
import SvgIcon from '@/components/SvgIcon'

const hiddenBot = ref(true)
const radio = ref('1')
const checkbox = ref(['b'])
const data = reactive({
  detail: {
    title: '',
    address: '',
    desc: ''
  }
})
const checked = ref(false)
function rightHandler() {
  showToast({
    message: '提交',
    duration: 300000
  })
}
function changeChecked(v: boolean) {
  console.log(v)
}
function close() {
  console.log('close')
}
function update() {
  showLoadingToast({
    message: '上传中...',
    forbidClick: true
  })
}
function submit() {
  showConfirmDialog({
    title: '提交审核',
    message: '确定提交代码吗？'
  })
    .then(() => {
      hiddenBot.value = false
      showToast({
        message: '提交成功',
        icon: success
      })
    })
    .catch(() => {
      hiddenBot.value = true
      showToast({
        message: '驳回成功1',
        icon: fail,
        duration: 3000
      })
    })
}
const { detail } = toRefs(data)
</script>

<template>
  <div>
    <NavBar title="demo" right-text="我的报事" @click-left="close">
      <template #right>
        <SvgIcon name="scan" size="24px" color="#4DB87F" @click="rightHandler" />
      </template>
    </NavBar>
    <PageTitle title="请输入车牌" description="当前仅支持粤港澳车牌" />
    <div class="bg-white mt-2.5">
      <FormItem v-model="detail.title" label="输入标题" />
      <FormItem
        v-model="detail.address"
        label="输入地址"
        label-desc="选填"
        :max-length="20"
        :error-desc="detail.address.length > 20 ? '文字不能超过20字' : ''"
      />
      <FormItem v-model="detail.desc" label="输入标题" type="textarea" label-desc="选填" />
    </div>
    <div class="p-5 my-2 bg-white">
      禁止按钮点击
      <van-switch v-model="checked" size="24" @change="changeChecked" />
      <van-button size="large" type="primary" :disabled="checked" @click="update"> 提交 </van-button>
      <div class="flex space-x-10px my-10px">
        <van-button plain size="large" type="primary" @click="submit(0)"> 驳回 </van-button>
        <van-button size="large" type="primary" @click="submit(1)"> 通过 </van-button>
      </div>
      <div class="flex flex-wrap space-x-10px my-10px">
        <van-button plain type="primary"> 驳回 </van-button>
        <van-button type="primary"> 通过 </van-button>
        <van-button size="small" type="primary"> 通过 </van-button>
        <van-button size="mini" type="primary"> 通过 </van-button>
        <van-button class="!bg-primary/10 border-none text-primary" round type="primary">通过</van-button>
      </div>

      <div>
        <van-radio-group v-model="radio">
          <van-radio disabled name="1">单选框1</van-radio>
          <van-radio name="2"> 单选框 2 </van-radio>
          <van-radio name="3"> 单选框 3 </van-radio>
        </van-radio-group>
        <van-checkbox-group v-model="checkbox">
          <van-checkbox name="a"> 复选框 a </van-checkbox>
          <van-checkbox disabled name="b"> 复选框 b </van-checkbox>
          <van-checkbox name="c"> 复选框 c </van-checkbox>
        </van-checkbox-group>
        <SvgIcon name="indeterminate" size="20px" fill="fill-primary" />
      </div>
    </div>
    <van-tabs class="bg-white">
      <van-tab title="我的界" />
      <van-tab title="你的界"> 22 </van-tab>
    </van-tabs>
    <FooterBar class="z-100">
      <van-button v-if="hiddenBot" type="primary" size="large">提交</van-button>
    </FooterBar>
  </div>
</template>
