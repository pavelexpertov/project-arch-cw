<template>
  <div>
    <template v-if="isSignedIn">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <el-button type="primary" icon="el-icon-circle-plus">New Project</el-button>
        </el-menu-item>
        <el-menu-item index="2">
          My Projects
        </el-menu-item>
        <el-menu-item index="3">
          Shared Projects
        </el-menu-item>
        <el-menu-item index="4">
          Search
        </el-menu-item>
        <el-menu-item index="5">
          Log Out
        </el-menu-item>
      </el-menu>
    </template>
    <template v-else>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <router-link to="/login"><el-menu-item index="1">Log In</el-menu-item></router-link>
      <router-link to="/signup"><el-menu-item index="2">Sign Up</el-menu-item></router-link>
    </el-menu>
  </template>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "HeaderBar",
  data: function() {
    return {
      activeIndex: '1',
      isSignedIn: false
    };
  },
  methods: {
    handleSelect: function(key, keyPath) {
      console.log("Got the following: ", key, keyPath);
    }
  }
}
</script>

<style>

</style>
