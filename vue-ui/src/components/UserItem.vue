<template>
    <el-row>
        <el-col :span="12">{{fullname}}</el-col>
        <el-col :span="12"><el-button type="danger" @click="deleteUser">Remove</el-button></el-col>
    </el-row>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user_obj: {
      type: Object
    }
  },
  data: function () {
    return {
      userObj: this.user_obj,
      fullname: this.user_obj.fullname
    }
  },
  methods: {
    deleteUser: function () {
      this.$emit('deleteItem', this.userObj)
    },
    updateUser: function () {
      this.$emit('updateItem', this.userObj)
    }
  }
}
</script>

<style>

</style>
