<template>
  <div class="card">
    <div class="card-header">
      <h4 class="card-title">{{ flight.fareUnit }} {{ flight.fare }}</h4>
      <h6>{{ departTime }} - {{ origin }}</h6>
      <h6>{{ arrivalTime }} - {{ destination }}</h6>
      <p>{{ flight.flightName }}</p>
      <p>{{ flight.numSeats }} seats remaining</p>
      <button>BOOK NOW</button>
    </div>
  </div>
</template>

<script>
import { padStart } from 'lodash'

export default {
  props: [
    'flight'
  ],
  data () {
    return {
      origin: localStorage.getItem('wander-current-city'),
      destination: localStorage.getItem('wander-current-destination')
    }
  },
  computed: {
    departTime () {
      var date = new Date(this.flight.departTime)
      return date.getHours() + ':' + padStart(date.getMinutes(), 2, '0')
    },
    arrivalTime () {
      var date = new Date(this.flight.arrivalTime)
      return date.getHours() + ':' + padStart(date.getMinutes(), 2, '0')
    }
  }
}
</script>
