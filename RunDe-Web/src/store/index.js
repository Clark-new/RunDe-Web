import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: getDefaultUrl(),
    viewer: {},
    template: {},
    options: {},
    playerStatus: false,
    lists: getLists(),
    allowChat: true
  },
  mutations:  {
    changeUrl (state, url) {
      state.url = url
      try {
        localStorage.url = url
      } catch (e) {
      }
    },
    setViewer (state, viewer) {
      state.viewer = viewer
    },
    setTemplate (state, template) {
      state.template = template
    },
    setOptions (state, options) {
      state.options = options
    },
    changePlayerStatus (state, status) {
      state.playerStatus = status
    },
    changeAllowChat (state, status) {
      state.allowChat = status
    }
  },
  getters: getters
})
