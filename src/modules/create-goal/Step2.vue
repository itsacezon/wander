<template>
  <div>
    <h3>What do you want to do in {{ destination.name }}?</h3>

    <div v-if="!isFetching">
      <div class="cards">
        <activity-card
          v-for="a in activityRanks"
          :activity="activityItems[a]"
          :isSelected="chosenActivities.includes(a)"
          @click="updateChosenActivities(activityItems[a])"
        ></activity-card>
      </div>
    </div>
    <div class="loading" v-else></div>
  </div>
</template>

<script>
import axios from 'axios'
import ActivityCard from '../../components/ActivityCard.vue'

export default {
  props: [
    'destination'
  ],
  components: {
    'activity-card': ActivityCard
  },
  data () {
    return {
      activityRanks: [],
      activityItems: {},
      chosenActivities: [],
      isFetching: true
    }
  },
  methods: {
    updateChosenActivities (activity) {
      const { id } = activity
      if (this.chosenActivities.includes(id)) {
        this.chosenActivities.splice(this.chosenActivities.indexOf(id), 1)
      } else {
        this.chosenActivities.push(id)
      }
    }
  },
  watch: {
    chosenActivities (newArray) {
      if (newArray.length === 3) {
        const activities = newArray.map(id => ({
          ...this.activityItems[id]
        }))
        this.$emit('choose-activities', 3, activities)
      }
    }
  },
  created () {
    var session = JSON.parse(localStorage.getItem('wander-session'))
    axios.post('http://52.221.203.194:3000/things2do', {
      city: this.destination.id,
    	age: session.user.age_range.min.toString(),
    	like: session.user.likes
    })
      .then(response => {
        const { rank, things } = response.data
        this.activityRanks = rank
        this.activityItems = Object.keys(things).reduce((curr, key) => ({
          ...curr,
          [key]: {
            ...things[key],
            id: key
          }
        }), {})
        this.isFetching = false
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
