<template>
  <div>
    <h3>Where do you want to go?</h3>

    <div v-if="!isFetching">
      <div class="cards">
        <destination-card v-for="d in destinations" :destination="d" @click="chooseCity(d)"></destination-card>
      </div>
    </div>
    <div class="loading" v-else></div>
  </div>
</template>

<script>
import axios from 'axios'
import DestinationCard from '../../components/DestinationCard.vue'

export default {
  props: ['user'],
  components: {
    'destination-card': DestinationCard
  },
  data () {
    return {
      destinations: [],
      isFetching: true
    }
  },
  methods: {
    chooseCity (dest) {
      localStorage.setItem('wander-current-destination', dest.id)
      localStorage.setItem('wander-current-city-name', dest.name)
      this.$emit('choose-destination', 2, dest)
    }
  },
  created () {
    axios.get('https://lit-peak-56209.herokuapp.com/api/destinations/')
      .then(response => {
        const { country, city, destinations } = response.data
        this.destinations = destinations
        this.isFetching = false

        localStorage.setItem('wander-current-city', city)
        localStorage.setItem('wander-current-country', country)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
