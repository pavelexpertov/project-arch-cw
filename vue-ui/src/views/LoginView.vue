<template>
    <el-row>
        <el-col :span="9" :offset="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="Username" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="validateBeforeSubmission('form')">Login</el-button>
          </el-form-item>
          </el-form>
        </el-col>
    </el-row>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import {loggedInMixin} from '@/user_session'

export default {
  name: 'LoginView',
  data: function () {
    return {
      form: {
        username: '',
        password: ''
    },
    rules: {
            username : [
                {required: true, message: 'Enter username', trigger: 'blur'}
            ],
            password : [
                {required: true, message: 'Enter password', trigger: 'blur'}
            ]
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
              let auth = "Bearer " + json.id + ":" + creds.password
              Vue.http.headers.common['Authorization'] = auth
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
  },
  validateBeforeSubmission: function(formName) {
              this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.onSubmit()
                } else {
                  console.log('error submit!!');
                  return false;
                }
      });
  }
},
mixins: [loggedInMixin]
}
</script>

<style>

</style>
