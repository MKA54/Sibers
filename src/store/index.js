import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headers: [
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'User Name',
        value: 'username'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Address (city)',
        value: 'address.city'
      },
      {
        text: 'Company Name',
        value: 'company.name'
      },
      {
        text: 'Phone',
        value: 'phone'
      },
      {
        text: 'Website',
        value: 'website'
      }
    ],
    valid: false,
    contacts: [],
    search: '',
    snack: false,
    snackColor: '',
    snackText: '',
    phoneRules: [
      v => !!v || 'Enter phone',
      v => /^[\d|()][\d\\() -\\x]{4,21}\d$/.test(v) || 'Phone must be valid'
    ],
    nameRules: [
      v => !!v || 'Enter text',
      v => v.length <= 35 || 'Text must be less than 35 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^[\w][\w-\\.]*@[\w-]+\.[a-z]{2,4}$/i.test(v) || 'E-mail must be valid'
    ]
  },
  mutations: {
    loadDate (state) {
      axios.get('https://demo.sibers.com/users')
        .then(response => {
          state.contacts = response.data
        })
        .catch(error => console.log(error))
    },
    save (state) {
      state.snack = true
      state.snackColor = 'success'
      state.snackText = 'Data saved'
    },
    cancel (state) {
      state.snack = true
      state.snackColor = 'error'
      state.snackText = 'Canceled'
    },
    open (state) {
      state.snack = true
      state.snackColor = 'info'
      state.snackText = 'Dialog opened'
    },
    close () {
      console.log('Dialog closed')
    }
  },
  actions: {
    loadDate (context) {
      context.commit('loadDate')
    }
  },
  modules: {}
})
