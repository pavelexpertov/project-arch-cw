<template>

</template>

<script>
import Vue from 'vue'
import {loggedOutMixin} from '@/user_session'

export default {
  name: 'LogoutView',
  data: function () {
    return {
      d: 2
    }
  },
  mounted: function () {
    this.$http.get('logout')
    .then(response => {
      this.$store.commit('logout')
      Vue.http.headers.common['Authorization'] = ''
      this.$router.push({name: 'Login'})
    })
    .catch(err => console.log(err))
  },
  mixins: [loggedOutMixin]
}
</script>

<style>
</style>
