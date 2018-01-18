<template>
    <div>
        <h2>My Projects</h2>
            <router-link
            v-for="item in ownProjects"
            :to="'/project/' + item._id"
            :key="item._id"
            >
                <h6>{{item.project_title}}</h6>
            </router-link>
        <h2>Shared Projects</h2>
            <router-link
            v-for="item in sharedProjects"
            :to="'/project/' + item._id"
            :key="item._id"
            >
                <h6>{{item.project_title}}</h6>
            </router-link>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ProjectsView',
  data: function(){
      return {
        ownProjects: [],
        sharedProjects: []
    }
  },
  mounted: function () {
    let userId = this.$store.state.user_id
    this.$http.get('users/' + userId + '/projects/' )
    .then(response => {
        console.log(response)
        this.ownProjects = response.body.own_projects
        this.sharedProjects = response.body.shared_projects
    })
    .catch(err => console.log(err))
  }
}
</script>

<style>

</style>
