<template>
  <div>
    <header class="navbar">
      <div class="container">
        <section class="navbar-primary">
          <a href="/" class="navbar-brand mr-10">
            <img src="public/images/logo.png" height="64" /> <span>/</span> <span class="navbar-brand-name">wander</span>
          </a>
        </section>
        <section class="navbar-section">
          <button class="btn" @click="logout()">Logout</button>
        </section>
      </div>
    </header>

    <div class="container container-main">
      <div class="row">
        <div class="three columns">
          <sidebar></sidebar>
        </div>
        <div class="nine columns">
          <create-goal></create-goal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import CreateGoal from '../modules/create-goal/CreateGoal.vue'

export default {
  name: 'Home',
  components: {
    'sidebar': Sidebar,
    'create-goal': CreateGoal
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
  padding-top: 24px;
}
</style>
