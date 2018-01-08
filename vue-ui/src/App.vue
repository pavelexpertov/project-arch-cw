<template>
<el-container id="app">
  <el-header>
  </el-header>
  <el-main>
      <router-view/>
  </el-main>
  <!-- previous implementation <div>
    <img src="./assets/logo.png">
    <router-view/>
  </div> -->
</el-container>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
