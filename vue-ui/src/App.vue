<template>
<el-container id="app">
  <el-header>
    <header-bar></header-bar>
  </el-header>
  <el-main>
      <router-view/>
      <!-- <test></test> -->
  </el-main>
  <!-- previous implementation <div>
    <img src="./assets/logo.png">
    <router-view/>
  </div> -->
</el-container>
</template>

<script>
import Test from './components/Test'
import HeaderBar from './components/HeaderBar'

export default {
  name: 'app',
  components: {
    test: Test,
    headerBar: HeaderBar
  }
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
