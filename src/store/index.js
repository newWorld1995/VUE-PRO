import { createStore } from 'vuex'
// 引入 vuex的持久化插件
import createPersistedState from 'vuex-persistedstate'

// 创建一个新的 store 实例
const store = createStore({
  plugins: [
    createPersistedState({
      // 设置持久化的数据
      reducer: (state) => {
        return {
          userInfo: state.userInfo,
          currentPath: state.currentPath
        }
      }
    })
  ],
  state() {
    return {
      userInfo: null,
      currentPath: ''
    }
  },
  mutations: {
    updateCurrentPath(state, payload) {
      state.currentPath = payload
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload
    }
  }
})

export default store
