<template>
    <div>
        <el-dialog
          title="Warning"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span>It should be noted that the content will not be aligned in center by default</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleDelete">Confirm</el-button>
          </span>
        </el-dialog>
        <user-form v-if="user" :form_obj="user"></user-form>
        <el-button type="danger" @click="centerDialogVisible = true">Delete Account</el-button>
    </div>
</template>

<script>
/* eslint-disable */
import {loggedOutMixin} from '@/user_session'
import UserForm from '@/components/UserForm'

export default {
    name: 'UserAccountView',
    data: function(){
        return {
            user: '',
            centerDialogVisible: false
        }
    },
    mixins: [loggedOutMixin],
    components: {
        userForm: UserForm
    },
    created: function(){
      this.$http.get("users/id/" + this.$store.state.user_id)
      .then(response => {
         this.user = response.body;
      })
      .catch(err => console.log(err));
    },
    methods: {
        handleDelete: function() {
            let user_id = this.$store.state.user_id
            let endpoint = "users/id/" + user_id
            this.$http.delete(endpoint)
            .then(response => {
                if(response.body.ok === true)
                    this.$router.push({name: 'Logout'})
            })
        }
    }
}
</script>

<style>

</style>
