<template>
  <div>
    <header class="navbar">
      <div class="container">
        <section class="navbar-primary">
          <a href="/" class="navbar-brand mr-10">
            <img src="public/images/logo.png" height="40" /> <span>/</span> <span class="navbar-brand-name">wander</span>
          </a>
        </section>
        <section class="navbar-section">
          <a class="navbar-link" href="#" @click="logout()">Logout</a>
        </section>
      </div>
    </header>

    <div class="container container-main">
      <div class="text-center">
        <img class="circular" :src="profilePhoto" />
        <h1>Hello, {{ firstName }}!</h1>
      </div>

      <create-goal></create-goal>
    </div>
  </div>
</template>

<script>
import CreateGoal from '../modules/create-goal/CreateGoal.vue'

export default {
  name: 'Home',
  components: {
    'create-goal': CreateGoal
  },
  data () {
    return {
      profileId: '',
      firstName: ''
    }
  },
  computed: {
    profilePhoto () {
      return 'https://graph.facebook.com/' + this.profileId + '/picture?width=128&height=128'
    }
  },
  created () {
    var session = JSON.parse(localStorage.getItem('wander-session'))
    this.profileId = session.user.id
    this.firstName = session.user.first_name
  },
  methods: {
    logout () {
      // FIXME: This is bad!!!
      localStorage.removeItem('wander-current-city')
      localStorage.removeItem('wander-current-city-name')
      localStorage.removeItem('wander-current-country')
      localStorage.removeItem('wander-current-destination')
      localStorage.removeItem('wander-session')

      this.$router.go('/')
    }
  }

}
</script>

<style>
.container-main {
  padding: 24px 0 48px 0;
}
</style>
