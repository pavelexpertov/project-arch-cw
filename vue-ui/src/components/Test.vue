/*The purpose of the component is to test request 
connectivity for production and development environments*/

<template>
<div>
    <p>{{ msg }}</p>
    <el-button v-on:click="sendRequest">Send Request</el-button>
</div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      msg: 'Empty and lonely here'
    }
  },
  methods: {
    sendRequest: function () {
      this.$http.get('test').then(response => {
        this.msg = response.body['message']
      }, response => {
        this.msg = 'Oh oh something gone wrong'
      })
    }
  }
}
</script>

<style scoped>
div {
    background-color: coral;
}
</style>