<template>
    <div>
        <el-table
        :data="this.projects_list"
        >
            <el-table-column
            prop="project_title"
            label="Plan Title"
            align="left"
            width="210"
            >
            </el-table-column>
            <el-table-column
            prop="opposition_team"
            label="Opposition Team"
            width="160"
            >
            </el-table-column>
            <el-table-column
            prop="match_start_date"
            label="Match Start Date"
            width="160"
            >
            </el-table-column>
            <el-table-column
            prop="trip_start_date"
            label="Trip Start Date"
            width="160"
            >
            </el-table-column>
            <template v-if="show_sharing_status">
                <el-table-column
                    label="Sharing Status"
                    width="160"
                >
                    <template slot-scope="scope">
                        <p>{{get_sharing_status(scope.row.user_id, scope.row.userswithrights_list_id, scope.row) || scope.row.rights}}</p>
                    </template>
                </el-table-column>
            </template>
             <el-table-column
                width="160"
             >
                <template slot-scope="scope" v-if="scope.row.rights !== 'Not shared with you'">
                    <router-link :to="'/project/' + scope.row._id">
                        <el-button>Go</el-button>
                    </router-link>
                </template>
             </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'ProjectsList',
  props: {
    projects_list: {
      type: Array,
      required: true
    },
    show_sharing_status: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    // eslint-disable-next-line
    get_sharing_status: function (owner_id, userswithrights_list_id, project_doc) {
            // If it's the owner
    // eslint-disable-next-line
      if (this.$store.state.user_id === owner_id) { return 'Owned by You' }
            // Getting the user rights
    // eslint-disable-next-line
      let endpoint = 'users_list/' + userswithrights_list_id + '/rights/' + this.$store.state.user_id
      this.$http.get(endpoint)
            .then(response => {
                // project_doc.rights = "Shared with you"
    // eslint-disable-next-line
              this.$set(project_doc, 'rights', 'Shared with you')
            })
    // eslint-disable-next-line
            .catch(err => {
              this.$set(project_doc, 'rights', 'Not shared with you')
            })
    }
  }
}
</script>

<style scoped>
div {
    width: 1000px;
    margin: auto;
}
el-table {
    width: 100%;
}

</style>
