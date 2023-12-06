import { AppState } from './modules/app'
import { UserState } from './modules/user'

export interface RootState {
  modules: {
    app: AppState
    user: UserState
  }
}
