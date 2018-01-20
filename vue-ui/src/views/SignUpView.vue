<template>
    <user-form></user-form>
</template>

<script>
/* eslint-disable */
import UserForm from '@/components/UserForm'
import {loggedInMixin} from '@/user_session'

export default {
  name: 'SignUpView',
  data: function () {
    return {}
  },
  mixins: [loggedInMixin],
  components: {
      userForm: UserForm
  }
}
</script>

<style>

</style>
