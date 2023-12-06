import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router'

// import { GlobalStore } from '@/store'
import { isEmpty } from 'lodash-es'
import { store } from '@/store'
import { useUserStore } from '@/store/modules/user'
import env from '@/utils/env'

const user = useUserStore(store)
async function canUserAccess(router: Router, to: RouteLocationRaw) {
  if (isEmpty(user.getIdNumber)) {
    if (env.DEV) {
      const userInfo = {
        idNumber: '110101199006075686'
      }
      user.setUserInfo(userInfo)
      return true
    } else {
      // await getUserInfo();
      return true
    }
  } else {
    return true
  }
}

function routerBefore(router: Router) {
  router.beforeEach(async (to: RouteLocationNormalized) => {
    /* 权限验证 */
    await canUserAccess(router, to)
  })
}
export function setupRouterGuard(router: Router): void {
  routerBefore(router)
}
