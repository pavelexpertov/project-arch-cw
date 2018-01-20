<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Full Name">
      <el-input v-model="form.fullname"></el-input>
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
    <template v-if="!this.form_obj._id">
      <el-form-item>
        <el-button type="primary" @click="onSubmitPost">Sign Up</el-button>
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item>
        <el-button type="primary" @click="onSubmitPut">Save</el-button>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
/* eslint-disable */
export default {
    name: "UserForm",
    props: {
        form_obj: {
            type: Object,
            default: function(){
                return {
                    fullname: '',
                    job_role: '',
                    username: '',
                    password: ''
                }
            }
        }
    },
    data: function(){
        return {
            form: this.form_obj
        }
    },
    
    methods: {
        onSubmitPost: function () {
          console.log('submit for signup!' + ' ' + this.form.username + ' ' + this.form.password)
          let details = {
              fullname: this.form.fullname,
              job_role: this.form.job_role,
              username: this.form.username,
              password: this.form.password,
          }
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
      },
        onSubmitPut: function () {
          console.log('submit for updating!' + ' ' + this.form.username + ' ' + this.form.password)
          delete this.form._id
          let details = this.form
          console.log(details)
          this.$http.put("users/id/" + this.$store.state.user_id, details)
          .then(response => {
              if(response.body.ok === true){
                  this.$router.push({name: 'Projects'})
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
    }
}
</script>

<style>
</style>
