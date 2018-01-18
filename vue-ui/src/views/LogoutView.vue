<template>

</template>

<script>
export default {
  name: 'LogoutView',
  data: function () {
    return {
      d: 2
    }
  },
  mounted: function () {
    this.$store.commit('logout')
    this.$router.push({name: 'Login'})
  }
}
</script>

<style>
</style>
