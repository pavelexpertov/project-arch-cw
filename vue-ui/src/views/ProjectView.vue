<template>
    <div>
        <div>
            <h1> Here's the view of the project</h1>
            <h1> {{project._id}}</h1>
            <h1> {{project.project_title}}</h1>
        </div>
        <div>
             <to-do-list v-if="todoListId" :todo_list_id="todoListId"></to-do-list>
            <item-list v-if="playersListId" :endpoint_name="endpoint" :list_id="playersListId"></item-list>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import ToDoList from "@/components/ToDoList"
import ItemList from "@/components/ItemList"

export default {
  name: 'ProjectView',
  data: function(){
      return {
        project: '',
        playersListId: '',
        todoListId: '',
        endpoint: 'players'
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
      })
      .catch(err => console.log(err))
  },
  components: {
      toDoList: ToDoList,
      itemList: ItemList
  }
}
</script>

<style>

</style>
