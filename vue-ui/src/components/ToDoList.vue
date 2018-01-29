<template>
    <div>
        <el-row id="filter-list">
            <el-col :span="24">
                <el-select v-model="selectedFilter" @change="handleSelectedFilter">
                    <el-option
                    v-for="user in usersListDropDownList"
                    :key="user._id"
                    :label="user.fullname"
                    :value="user._id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
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
                <el-checkbox v-model="scope.row.completed" @change="uploadToDoList" :disabled="scope.row.user_id !== $store.state.user_id && !editable_list"></el-checkbox>
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
                    <el-date-picker type="date" v-model="scope.row.date" @change="uploadToDoList" :disabled="!editable_list" format="yyyy/MM/dd"  value-format="yyyy-MM-dd" :editable="false">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
            label="Assigned User"
            width="300"
            >
                <template slot-scope="scope">
                    <el-select v-model="scope.row.user_id" placeholder="Select" clearable :disabled="!editable_list" @change="uploadToDoList">
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
      todoListOriginal: [],
      todoListId: this.todo_list_id,
      usersListId: this.users_list_id,
      todoTextBox: '',
      usersList: [],
      usersListDropDownList: [],
      selectedFilter: 'all'
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
  },
  handleSelectedFilter: function(){
      if(this.selectedFilter === 'all')
        this.todoList = this.todoListOriginal
      else {
          let new_list = this.todoListOriginal.filter(todo => todo.user_id === this.selectedFilter)
          this.todoList = new_list
      }
  }
  },
  components: {
    toDoItem: ToDoItem
  },
  mounted: function () {
    //Getting a list of users_list and todo list
    this.$http.get('users_list/' + this.usersListId)
    .then(response => {
        let usersList = response.body.users_list
        //Add an empty option for None
        usersList.splice(0, 0, {_id: '', fullname: "None"})
        this.usersList = usersList
        //Clone the list and then add an option for all
        let dropdownUsersList = JSON.parse(JSON.stringify(usersList))
        dropdownUsersList.splice(0, 0, {_id: 'all', fullname: "All"})
        this.usersListDropDownList = dropdownUsersList
        return this.$http.get('todo_list/' + this.todoListId)
    })
    .then(response => {
      let list = response.body.todo_list
      //Filtering the todos against the users list to make sure that they are not assigned to them.
      let length = list.length
      //For each to do item
      for(var i = 0; i < length; ++i){
          let todoItem = list[i]
          let length = this.usersList.length
          let userExistsInUsersListFlag = false
          //For each user in the users list
          for(var j = 0; j < length; ++j){
             let user = this.usersList[j]
             if(user._id === todoItem.user_id){
                 userExistsInUsersListFlag = true
                 break
             }
          }
          //If the user doesn't exist in the list
          if(!userExistsInUsersListFlag)
            todoItem.user_id = ''
      }
      this.todoList = list
      this.todoListOriginal = list
      this.uploadToDoList()
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
#filter-list {
    margin-bottom: 23px;
}
</style>
