/* The purpose of the returned mixins (for Views)
is to prevent user from accidently accessing a route where
he used to be authorised to go when he's logged out. */

export var loggedOutMixin = {
  beforeCreate: function () {
    if (!this.$store.state.isSignedIn) { this.$router.push({name: 'Login'}) }
  }
}

export var loggedInMixin = {
  beforeCreate: function () {
    if (this.$store.state.isSignedIn) { this.$router.push({name: 'Projects'}) }
  }
}
