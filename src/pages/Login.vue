<template>
  <div class="container">
    <button @click="login">Login to Facebook</button>
  </div>
</template>

<script>
export default {
  methods: {
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
