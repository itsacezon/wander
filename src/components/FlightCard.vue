<template>
  <div class="card mb-10 card-flight">
    <div class="row">
      <div class="nine columns ticket-details">
        <div class="card-ticket-banner"></div>
        <div class="card-header">
          <h2 class="card-title">{{ flight.fareUnit }} {{ flight.fare }}</h2>

          <div class="itinerary">
            <div class="itinerary-origin">
              <h1 class="mb-0">{{ departTime }}</h1>
              <span>{{ origin }}</span>
            </div>
            <span class="itinerary-arrow"> > </span>
            <div class="itinerary-destination">
              <h1 class="mb-0">{{ arrivalTime }}</h1>
              <span>{{ destination }}</span>
            </div>
          </div>

          <p class="mb-0">{{ flight.flightName }}</p>

          <img src="public/images/logo.png" class="logo" height="42" />
        </div>
      </div>
      <div class="three columns book-now">
        <div class="card-body text-center">
          <button class="btn btn-primary btn-lg">BOOK NOW</button>
          <p class="mb-0">{{ flight.numSeats }} seats remaining</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { padStart } from 'lodash'

export default {
  props: [
    'flight',
    'photo'
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

<style lang="scss">
@import '../assets/styles/base/variables';

.card-flight {
  overflow: hidden;

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .ticket-details {
    position: relative;
    margin-right: 4%;
  }

  .book-now {
    display: flex;
    align-items: center;
    margin-left: 0;
    border-left: 1px $border-color dashed;
  }

  .card-ticket-banner {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 32px;
    background-color: $primary-color;
  }

  .card-header {
    padding-left: 4.75rem;
    position: relative;
  }

  .itinerary {
    display: flex;
    align-items: center;
    margin: 24px 0;

    h1 {
      line-height: 3.25rem;
    }

    .itinerary-arrow {
      font-size: 28px;
      font-weight: 500;
    }

    .itinerary-origin {
      margin-right: 20px;
    }

    .itinerary-destination {
      margin-left: 20px;
    }
  }

  .logo {
    position: absolute;
    bottom: 14px;
    right: -14px;
  }
}
</style>
