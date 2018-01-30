<template>
    <div>
        <h2>My Plans</h2>
            <projects-list :projects_list="ownProjects" :show_sharing_status="false"></projects-list>
        <h2>Shared Plans</h2>
            <projects-list :projects_list="sharedProjects" :show_sharing_status="false"></projects-list>
    </div>
</template>

<script>
/* eslint-disable */
import {loggedOutMixin} from '@/user_session'
import ProjectsList from '@/components/ProjectsList'

export default {
  name: 'ProjectsView',
  data: function () {
    return {
      ownProjects: [],
      sharedProjects: []
    }
  },
  methods: {
      getProjectsFromServer: function () {
        let userId = this.$store.state.user_id
        this.$http.get('users/' + userId + '/projects/')
        .then(response => {
          console.log(response)
          this.ownProjects = response.body.own_projects
          this.sharedProjects = response.body.shared_projects
        })
        .catch(err => console.log(err))
      }
  },
  mounted: function () {
      this.getProjectsFromServer()
  },
  mixins: [loggedOutMixin],
  components: {
      projectsList: ProjectsList
  }
}
</script>

<style>

</style>
