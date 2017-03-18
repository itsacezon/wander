<template>
  <div>
    <h3>The best flights for you</h3>

    <div v-if="isFetching" class="loading"></div>
    <div v-else-if="!isFetching && hasFlights">
      <button @click="shareGoal()">SHARE</button>
      <flight-card
        v-for="f in flights"
        :flight="f"
      ></flight-card>
    </div>
    <div v-else>
      <h1>NO FLIGHTS</h1>
      <button @click="getFlights()">Find again</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { countBy, maxBy, toPairs, values, isEmpty } from 'lodash'
import FlightCard from '../../components/FlightCard.vue'

export default {
  props: [
    'activities'
  ],
  components: {
    'flight-card': FlightCard
  },
  data () {
    return {
      session: JSON.parse(localStorage.getItem('wander-session')),
      flights: [],
      isFetching: true,
      month: '',
      imageUrl: ''
    }
  },
  computed: {
    hasFlights () {
      return !isEmpty(this.flights)
    },
    name () {
      return this.session.user.first_name + ' ' + this.session.user.last_name
    },
    cityName () {
      return localStorage.getItem('wander-current-city-name')
    }
  },
  methods: {
    shareGoal () {
      FB.ui({
        method: 'feed',
        link: 'https://developers.facebook.com/docs/',
        name: this.name + ' wants to travel to ' + this.cityName + '!',
        caption: this.name + ' wants to travel to ' + this.cityName + '!',
        description: 'Create your wanderlist, get the best travel deals from AirAsia, and earn BIG Loyalty points for your next flight. #wanderairasia',
        display: 'popup',
        picture: this.imageUrl
      }, response => {
        console.log('success', response)
      })
    },
    getFlights () {
      this.isFetching = true

      axios.get('http://52.221.203.194:3000/getFlights', {
        params: {
          countryCode: localStorage.getItem('wander-current-country'),
          year: new Date().getFullYear(),
          departureStation: localStorage.getItem('wander-current-city'),
          arrivalStation: localStorage.getItem('wander-current-destination'),
          month: this.month
        }
      })
        .then(response => {
          this.flights = values(response.data)
          this.isFetching = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    // Send images for processing
    axios.post('https://intense-ravine-36851.herokuapp.com/api/image', {
      city: localStorage.getItem('wander-current-city-name'),
      goals: this.activities,
      fb_id: this.session.user.id
    })
      .then(response => {
        this.imageUrl = response.data.image_url
      })
      .catch(error => {
        console.log(error)
      })

    // Fetch recommended month then fetch flights
    const seasons = toPairs(countBy(this.activities, activity => activity.season))
      .map(pair => ({
        season: pair[0],
        count: pair[1]
      }))
    const recommendedSeason = maxBy(seasons, 'count')

    axios.get('http://52.221.203.194:3000/recommendMonth', {
      params: {
        season: recommendedSeason.season
      }
    })
      .then(response => {
        this.month = response.data.month
        this.getFlights()
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
