<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Full Name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Job Role">
    <el-select v-model="form.job_role" placeholder="please select your job role">
      <el-option label="Manager" value="manager"></el-option>
      <el-option label="Sport Technician" value="sport_technician"></el-option>
      <el-option label="Trainer" value="trainer"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="Username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">Sign Up</el-button>
  </el-form-item>
  </el-form>
</template>

<script>
/* eslint-disable */
import {loggedInMixin} from '@/user_session'

export default {
  name: 'SignUpView',
  data: function () {
    return {
      form: {
        name: '',
        job_role: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit: function () {
      console.log('submit for signup!' + ' ' + this.form.username + ' ' + this.form.password)
      let details = {
          fullname: this.form.name,
          job_role: this.form.job_role,
          username: this.form.username,
          password: this.form.password,
      }
      console.log(details)
      this.$http.post("signup", details)
      .then(response => {
          if(response.body.ok === true){
              this.$router.push({name: 'Login'})
          }
      })
      .catch(err => {
          console.log(err)
          this.$notify.error({
              title: "From Server",
              message: err.body
          })
      })
    }
  },
  mixins: [loggedInMixin]
}
</script>

<style>

</style>
