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
    }
  }
}
</script>

<style>

</style>
