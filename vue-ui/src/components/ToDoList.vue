<template>
    <div>
        <el-input v-model:value="todoTextBox" :disabled="!editable_list">
            <el-button
                slot="append"
                icon="el-icon-circle-plus"
                :disabled="!editable_list"
                @click="addToDo"
            ></el-button>
        </el-input>
        <el-table
        :data="todoList"
        style="width: 100%">
            <el-table-column
            label="Completed"
            width="100">
                <template slot-scope="scope">
                <el-checkbox v-model="scope.row.completed" @change="uploadToDoList"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column
            label="Task"
            prop="title"
            width="260">
            </el-table-column>
            <el-table-column
             label="date"
             width="180">
                <template slot-scope="scope">
                    <el-date-picker type="date" v-model="scope.row.date" @change="uploadToDoList" :disabled="!editable_list" format="yyyy/MM/dd"  value-format="yyyy-MM-dd">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
            label="Assigned User"
            width="300"
            >
                <template slot-scope="scope">
                    <el-select v-model="scope.row.user_id" placeholder="Select" clearable>
                        <el-option
                        v-for="user in usersList"
                        :key="user._id"
                        :label="user.fullname"
                        :value="user._id"
                        >
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
            label="Operations"
            width="130">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    :disabled="!editable_list"
                    @click="deleteItem(scope.row)">
                    Remove
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <p>
            {{todoList}}
        </p>
        </div>
</template>

<script>
/* eslint-disable */
import ToDoItem from '@/components/ToDoItem'
import * as moment from 'moment'

export default {
  name: 'ToDoList',
  props: {
    todo_list_id: {
      type: String,
      required: true
  },
    users_list_id: {
        type: String,
        required: true
    },
    editable_list: {
        type: Boolean,
        default: true
    }
  },
  data: function () {
    return {
      todoList: [],
      todoListId: this.todo_list_id,
      usersListId: this.users_list_id,
      todoTextBox: '',
      usersList: []
    }
  },
  methods: {
    addToDo: function () {
      let date = moment().add(1, 'd')
      date = date.format('YYYY-MM-DD')
      let title = this.todoTextBox
      //Return if the text box was empty
      if(title === '') return
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
    //Getting a list of users_list and todo list
    this.$http.get('users_list/' + this.usersListId)
    .then(response => {
        let users_list = response.body.users_list
        users_list.splice(0, 0, {_id: '', fullname: "None"})
        console.log("I AM HERE")
        console.log("users_list", users_list)
        this.usersList = users_list
        return this.$http.get('todo_list/' + this.todoListId)
    })
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
    width: 1100px;
    margin: auto;
    background-color: red;
}
/*el-select .el-input__inner {
    width: 300px;
}*/
</style>
