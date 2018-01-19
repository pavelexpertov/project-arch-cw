<template>

</template>

<script>
import Vue from 'vue'

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
  }
}
</script>

<style>
</style>
