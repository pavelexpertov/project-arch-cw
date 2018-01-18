<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Plan Title">
            <el-input v-model="form.project_title"></el-input>
        </el-form-item>
        <el-form-item label="Opposition Team">
            <el-input v-model="form.opposition_team"></el-input>
        </el-form-item>
        <el-form-item label="Description">
            <el-input type="textarea" v-model="form.main_description"></el-input>
        </el-form-item>
        <el-form-item label="Match Start Date">
            <el-date-picker type="date" placeholder="Pick a date" v-model="form.match_start_date"></el-date-picker>
        </el-form-item>
        <el-form-item label="Trip Start Date">
            <el-date-picker type="date" placeholder="Pick a date" v-model="form.trip_start_date"></el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button @click="saveBtn">
                {{btnSaveNameText}}
            </el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="cancelBtn">
                Cancel
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
/* eslint-disable */
export default {
    name: "ProjectFormView",
    data: function(){
        return {
            form: {
                project_title: '',
                main_description: '',
                opposition_team: '',
                match_start_date: '',
                trip_start_date:''
            },
            project_id: ''
        }
    },
    computed: {
        btnSaveNameText: function(){
            return this.project_id?'Save' : 'Add'
        }
    },
    methods:{
        cancelBtn(){
            this.$router.back()
        },
        saveBtn(){
            //Collecting details
            let details = {
                project_title: this.form.project_title,
                main_description: this.form.main_description,
                opposition_team: this.form.opposition_team,
                match_start_date: this.form.match_start_date,
                trip_start_date: this.form.trip_start_date,
                user_id: this.$store.state.user_id
            }
            console.log(details)
            if(this.project_id){
                var endpoint = "projects/" + this.project_id
                this.$http.put(endpoint, details)
                .then(response => {
                    this.$router.back()
                })
                .catch(err => console.log(err))
            }
            else{
                var endpoint = "projects"
                this.$http.post(endpoint, details)
                .then(response => {
                    this.$router.push("project/" + response.body.id)
                })
                .catch(err => console.log(err))

            }
        }
    }
}
</script>

<style>
</style>
