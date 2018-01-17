<template>
<el-container id="app">
  <el-header>
    <header-bar></header-bar>
  </el-header>
  <el-main>
      <router-view/>
      <item-list :endpoint_name="'players'" :list_id="'5a5d9efe65cf041ad72321ea'"></item-list>
  </el-main>
</el-container>
</template>

<script>
/* import Test from './test_files/Test'
import TestTextBox from './test_files/TestTextBox' */
import HeaderBar from './components/HeaderBar'
import ItemList from './components/ItemList'

export default {
  name: 'app',
  components: {
    headerBar: HeaderBar,
    itemList: ItemList
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
