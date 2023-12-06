const REGEXP_OS_ANDROID = /android/i
const REGEXP_OS_IOS = /iphone|ipad|ipod/i

const REGEXP_APP_WECHAT = /micromessenger/i
const REGEXP_WEB_CHROME = /Chrome/i

function platform() {
  const { navigator } = window

  const ua = navigator.userAgent

  const isAndroid = REGEXP_OS_ANDROID.test(ua)

  const isIos = REGEXP_OS_IOS.test(ua)

  const isInWechat = REGEXP_APP_WECHAT.test(ua)

  const isChrome = REGEXP_WEB_CHROME.test(ua)

  return {
    isAndroid,
    isIos,
    isInWechat,
    isChrome
  }
}
export default platform
