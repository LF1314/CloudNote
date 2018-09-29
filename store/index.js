import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const state = {
  userinfo: {
    avatar: '',
    username: '',
    desc: ''

  },
  contentdata: {
    title: "",
    classes: [],
    content: "",
    contentext: ""
  }
}

const sto = new Vuex.Store({
  state,

  mutations: {
    'CHANGEUSERINFO'(state, upload) {
      state.userinfo = upload
    },
    'SAVECONTENT'(state, upload) {
      state.contentdata = upload
    }
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => sessionStorage.getItem(key),
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) =>
        sessionStorage.setItem(key, value),
      removeItem: key => sessionStorage.removeItem(key),
    },
  })]

})

export default sto
