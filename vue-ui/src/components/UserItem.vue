<template>
    <el-row>
        <el-col :span="8"><p>{{fullname}}</p></el-col>
        <el-col :span="4">
            <p>
                <el-checkbox v-model="userObj.edit_rights.players_list" @change="updateUser">Players List</el-checkbox>
            </p>
        </el-col>
        <el-col :span="4">
            <p><el-checkbox v-model="userObj.edit_rights.todo_list" @change="updateUser">ToDo List</el-checkbox></p>
        </el-col>
        <el-col :span="8">
            <p><el-button type="danger" @click="deleteUser" size="mini">Remove</el-button></p>
        </el-col>
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

<style scoped>
</style>
