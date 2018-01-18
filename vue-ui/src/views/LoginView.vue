<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Login</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
/* eslint-disable */
export default {
  name: 'LoginView',
  data: function () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      console.log('submit for login!' + ' ' + this.form.username + ' ' + this.form.password)
      let creds = {username: this.form.username, password: this.form.password}
      this.$http.post("login", creds)
      .then(response => {
          let json = response.body
          if(json.ok === true){
              this.$store.commit('setUsername', creds.username)
              this.$store.commit('setPassword', creds.password)
              this.$store.commit('setUserId', json.id)
              this.$store.commit('setIsSignedInToTrue')
              this.$router.push({name: 'Projects'})
          }
      })
      .catch(err => {
          console.log(err)
          this.$notify.error({
              title: 'From Server',
              message: err.body
          })
      })
    }
  }
}
</script>

<style>

</style>
