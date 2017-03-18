<template>
  <div>
    <div class="landing">
      <div v-for="b in backgrounds" :class="`landing-background bg-${b}`" :style="bgUrl(b)"></div>
      <div class="landing-panel">
        <div class="row">
          <div class="landing-panel-left" :style="{ 'background-image': 'url(public/images/landing-login.jpg)' }"></div>
          <div class="landing-panel-right">
            <img src="http://www.airasia.com/Common/en-MY.v2/images/logo.png" />
            <h2>Chase wonders through Wander with AirAsia.</h2>
            <button class="btn btn-primary btn-facebook btn-lg" @click="login">Login via Facebook</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      backgrounds: [1, 2, 3, 4, 5]
    }
  },
  methods: {
    bgUrl (id) {
      return {
        'background-image': 'url(public/images/landing/' + id + '.jpg)'
      }
    },
    login () {
      var vm = this
      FB.login(response => {
        var loginToken = response.authResponse.accessToken
        FB.api('/me?fields=email,age_range,first_name,last_name,id', response => {
          var userResponse = response
          FB.api('me/likes?fields=category,name&limit=50', response => {
            var keywords = [];
            for(var key in response.data) {
              keywords = keywords.concat(response.data[key].name.split(' '))
              keywords = keywords.concat(response.data[key].category.replace("/", " ").split(' '))
            }

            var counts = {};
            keywords.forEach(x => { counts[x] = (counts[x] || 0) + 1 })
            var sortable = []
            for (var keyword in counts) {
              sortable.push(keyword.toLowerCase())
            }

            sortable.sort((a, b) => {
              return a[1] - b[1]
            })
            var likes = sortable.toString()

            var localItem = {
              user: {
                ...userResponse,
                likes
              },
              token: loginToken,
            }
            localStorage.setItem('wander-session', JSON.stringify(localItem))
            vm.$router.go('/')
          })
        })
      }, {
        scope: 'email,user_likes,user_posts'
      })
    }
  }
}
</script>
