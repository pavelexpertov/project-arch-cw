<template>
    <el-row>
        <el-col :span="15">
            <p>{{todoItem.title}}</p>
        </el-col>
        <el-col :span="9">
            <el-button type="danger" @click="deleteToDo">
                Remove
            </el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'ToDoItem',
  props: {
    todo_item: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      todoItem: this.todo_item
    }
  },
  methods: {
    deleteToDo: function () {
      this.$emit('deleteItem', this.todoItem)
    }
  }
}
</script>

<style>
</style>
