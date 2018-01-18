/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSignedIn: false,
    username: '',
    password: '',
    user_id: ''
  },
  mutations: {
        setIsSignedInToTrue (state) {
          state.isSignedIn = true
        },
        setIsSignedInToFalse (state) {
          state.isSignedIn = false
        },
        setUsername(state, username) {
            state.username = username
        },
        setPassword(state, password) {
            state.password = password
        },
        setUserId(state, id) {
            state.user_id = id
        }
    },
    computed: Vuex.mapState([
        'isSignedIn',
        'username',
        'password',
        'user_id'
    ])
})
