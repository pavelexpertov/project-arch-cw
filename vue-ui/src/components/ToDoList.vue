<template>
    <div>
        <h3>{{todoTextBox}}</h3>
        <el-input v-model:value="todoTextBox">
            <el-button
                slot="append"
                icon="el-icon-circle-plus"
                @click="addToDo"
            ></el-button>
        </el-input>
        <to-do-item
            v-for="item in todoList"
            :todo_item="item"
            :key="item.id"
            @deleteItem="item => deleteItem(item)"
        >
        </to-do-item>
    </div>
</template>

<script>
import ToDoItem from '@/components/ToDoItem'
import * as moment from 'moment'

export default {
  name: 'ToDoList',
  props: {
    todo_list_id: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      todoList: [],
      todoListId: this.todo_list_id,
      todoTextBox: ''
    }
  },
  methods: {
    addToDo: function () {
      let date = moment().add(1, 'd')
      date = date.format('YYYY-MM-DD')
      let title = this.todoTextBox
      this.todoTextBox = ''
      let completed = false
      let id = '' + Math.random()
      this.todoList.push({
        title: title,
        id: id,
        date: date,
        completed: completed
      })
      this.uploadToDoList()
    },
    uploadToDoList: function () {
      let todoList = this.todoList
      this.$http.put('todo_list/' + this.todoListId, todoList)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    },
    deleteItem: function (itemToDelete) {
      let newArray = this.todoList.filter(item => item !== itemToDelete)
      this.todoList = newArray
      this.uploadToDoList()
    }
  },
  components: {
    toDoItem: ToDoItem
  },
  mounted: function () {
    this.$http.get('todo_list/' + this.todoListId)
        .then(response => {
          console.log(response)
          let list = response.body.todo_list
          this.todoList = list
        })
        .catch(err => console.log(err))
  }
}
</script>

<style scoped>
div {
    width: 600px;
    margin: auto;
    background-color: red;
}
</style>
