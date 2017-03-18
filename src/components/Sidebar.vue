<template>
  <img :src="profilePhoto" />
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      profileId: ''
    }
  },
  computed: {
    profilePhoto () {
      if (this.profileId) {
        return 'https://graph.facebook.com/' + this.profileId + '/picture?width=128&height=128'
      } else {
        return 'public/images/profile-photo.jpg'
      }
    }
  },
  created () {
    var session = JSON.parse(localStorage.getItem('wander-session'))
    this.profileId = session.user.id
  }
}
</script>
