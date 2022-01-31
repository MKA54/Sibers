import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: []
  },
  mutations: {
    loadDate (state) {
      axios.get('https://demo.sibers.com/users')
        .then(response => {
          state.contacts = response.data
        })
    }
  },
  actions: {
    loadDate (context) {
      context.commit('loadDate')
    }
  },
  modules: {
  }
})
