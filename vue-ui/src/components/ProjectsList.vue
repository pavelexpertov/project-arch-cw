<template>
    <div>
        <el-table
        :data="this.projects_list"
        >
            <el-table-column
            prop="project_title"
            label="Project Title"
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
                        <p>{{get_sharing_status(scope.row.user_id, scope.row.userswithrights_list_id)}}</p>
                    </template>
                </el-table-column>
            </template>
             <el-table-column
                width="160"
             >
                <template slot-scope="scope">
                    <router-link :to="'/project/' + scope.row._id">
                        <el-button>Go</el-button>
                    </router-link>
                </template>
             </el-table-column>
        </el-table>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "ProjectsList",
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
        get_sharing_status: function(owner_id, userswithrights_list_id){
            return "It's working!!! " + owner_id + " and " + userswithrights_list_id
        }
    }
}
</script>

<style scoped>
div {
    width: 90%;
    margin: auto;
}
el-table {
    width: 100%;
}

</style>
