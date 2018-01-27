<template>
    <div>
        <el-dialog
          title="Warning"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span>Are you sure you want to delete the project?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleDelete">Confirm</el-button>
          </span>
        </el-dialog>

        <el-row>
            <el-col :span="isUserProjectOwner?16:24">
                <h1>Plan: {{project.project_title}}</h1>
            </el-col>
            <el-col :span="8">
                <template v-if="isUserProjectOwner">
                <router-link
                :to="'/editproject/' + project._id"
                >
                    <el-button>Edit</el-button>
                </router-link>
                <el-button type="danger" @click="centerDialogVisible = true">Delete Plan</el-button>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p>Match Date: {{project.match_start_date}}</p>
            </el-col>
            <el-col :span="12">
                <p>Opposing Team: {{project.opposition_team}}</p>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <p>Trip Date: {{project.trip_start_date}}</p>
            </el-col>
            <el-col :span="2">
                <p>Description:</p>
            </el-col>
            <el-col :span="10">
                <p>{{project.main_description}}</p>
            </el-col>
        </el-row>
        <div>
             <h2>Tasks</h2>
             <to-do-list v-if="todoListId" :todo_list_id="todoListId" :editable_list="userRights.todo_list" :users_list_id="usersListId"></to-do-list>
             <h2>Selected Players</h2>
            <item-list v-if="playersListId" :endpoint_name="endpoint" :list_id="playersListId" :editable_list="userRights.players_list"></item-list>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ToDoList from '@/components/ToDoList'
import ItemList from '@/components/ItemList'
import {loggedOutMixin} from '@/user_session'

export default {
  name: 'ProjectView',
  data: function () {
    return {
      project: '',
      playersListId: '',
      todoListId: '',
      usersListId: '',
      endpoint: 'players',
      centerDialogVisible: false,
      userRights: {
        players_list: true,
        todo_list: true
      }
    }
  },
  mounted: function () {
    let projectId = this.$route.params.project_id
    this.$http.get('projects/' + projectId)
      .then(response => {
        console.log(response)
        let project = response.body
        this.project = project
        this.playersListId = project.players_list_id
        this.todoListId = project.todo_list_id
        this.usersListId = project.userswithrights_list_id
        if (project.user_id !== this.$store.state.user_id) {
          let endpoint = 'users_list/' + project.userswithrights_list_id + '/rights/' + this.$store.state.user_id
          return this.$http.get(endpoint)
            .then(response => {
              this.userRights = response.body.edit_rights
              console.log("User rights in proejct view:", this.user_rights)
            })
        }
      })
      .catch(err => console.log(err))
  },
  components: {
    toDoList: ToDoList,
    itemList: ItemList
  },
  computed: {
    isUserProjectOwner: function () {
      return this.project.user_id === this.$store.state.user_id
    }
  },
  mixins: [loggedOutMixin],
  methods: {
      handleDelete: function() {
        let projectId = this.$route.params.project_id
        this.$http.delete('projects/' + projectId)
        .then(response => {
            if(response.body.ok === true)
                this.$router.push({name: 'Projects'})
        })
        .catch(err => console.log(err))
      }
  }
}
</script>

<style scoped>
div el-row{
    max-width: 1800px;
}
</style>
