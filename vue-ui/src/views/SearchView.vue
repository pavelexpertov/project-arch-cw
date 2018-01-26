<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="Search">
                        <el-input v-model="form.search_query"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="Search Criteria">
                        <el-radio-group v-model="form.resource">
                          <el-radio label="team">Opposition Team</el-radio>
                          <el-radio label="player">Player Name</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label="Date Range">
                        <el-checkbox v-model="form.include_date"></el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="Start Date">
                        <el-date-picker v-model="form.start_date" format="yyyy/MM/dd"  value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="End Date">
                        <el-date-picker v-model="form.end_date" format="yyyy/MM/dd"  value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="search">Search</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
/* eslint-disable */
import {loggedOutMixin} from '@/user_session'

export default {
    name: "SearchView",
    data: function() {
        return {
            project_list: [],
            form: {
                search_query: '',
                search_criteria: '',
                include_date: false,
                start_date: '',
                end_date: ''
            }
        }
    },
    mixins: [loggedOutMixin],
    methods: {
        search: function(){
            // Check if the query is empty
            let form = this.form
            if(form.search_query === '') return
            // Check that the dates are selected and are in correct format
            if(form.include_date){
                //Checking that they are not empty
                if(form.start_date === null || form.end_date === null) return
                if(form.start_date === '' || form.end_date === '') return
            }
            this.$http.post('search', this.form)
            .then(result => {
                this.project_list = result.body
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style>

</style>
