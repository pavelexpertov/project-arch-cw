<template>
  <div>
    <template v-if="isSignedIn">
      <el-menu :default-active="setActiveIndex" mode="horizontal" @select="handleSelect">
        <router-link to="/addproject">
            <el-menu-item index="1">
              <el-button type="primary" icon="el-icon-circle-plus">New Plan</el-button>
            </el-menu-item>
        </router-link>
        <router-link to="/projects">
            <el-menu-item index="2">
              My Plans
            </el-menu-item>
        </router-link>
        <router-link to="/search">
            <el-menu-item index="3">
              Search
            </el-menu-item>
        </router-link>
        <router-link to="/user">
            <el-menu-item index="4">
                Account Settings
            </el-menu-item>
        </router-link>
        <router-link to="/logout">
            <el-menu-item index="5">
              Log Out
            </el-menu-item>
        </router-link>
      </el-menu>
    </template>
    <template v-else>
    <el-menu :default-active="setActiveIndex" mode="horizontal" @select="handleSelect">
      <router-link to="/login"><el-menu-item index="1">Log In</el-menu-item></router-link>
      <router-link to="/signup"><el-menu-item index="2">Sign Up</el-menu-item></router-link>
    </el-menu>
  </template>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data: function () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect: function (key, keyPath) {
      console.log('Got the following: ', key, keyPath)
    }
  },
  computed: {
    isSignedIn: function () {
      return this.$store.state.isSignedIn
    },
    setActiveIndex: function () {
      return this.$store.state.isSignedIn ? '2' : '1'
    }
  }
}
</script>

<style>

</style>
