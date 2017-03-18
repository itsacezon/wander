<template>
  <div class="container">
    <div class="row">
      <div class="three columns">
        <sidebar></sidebar>
      </div>
      <div class="nine columns">
        <!-- TODO: Add dashboard -->
        <div v-if="hasGoals">
          <h1>I have goals</h1>
        </div>

        <create-goal v-else :has-goals="false"></create-goal>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../../components/Sidebar.vue'
import CreateGoal from '../../modules/create-goal/CreateGoal.vue'

export default {
  name: 'Home',
  data () {
    return {
      clicked: false,
      hasGoals: false
    }
  },
  components: {
    'sidebar': Sidebar,
    'create-goal': CreateGoal
  }
}
</script>
