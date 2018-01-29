<template>
    <div class="item">
    <el-row >
        <el-col :span="8"><p class="item-margin">{{fullname}}</p></el-col>
        <el-col :span="4">
            <p class="item-margin">
                <el-checkbox  v-model="userObj.edit_rights.players_list" @change="updateUser">Players List</el-checkbox>
            </p>
        </el-col>
        <el-col :span="4">
            <p class="item-margin"><el-checkbox v-model="userObj.edit_rights.todo_list" @change="updateUser">ToDo List</el-checkbox></p>
        </el-col>
        <el-col :span="8">
            <p><el-button type="danger" @click="deleteUser" size="mini">Remove</el-button></p>
        </el-col>
    </el-row>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'UserItem',
  props: {
    user_obj: {
      type: Object
  },
  editable: {
      type: Boolean,
      default: true
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
.item {
    border: 2px solid grey;
    margin-bottom: 2px;
}
.item-margin {
    margin-top: 20px;
}
</style>
