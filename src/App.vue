<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    window.fbAsyncInit = () => {
      FB.init({
        appId      : '1276035242517697',
        xfbml      : true,
        version    : 'v2.8'
      })
    }
  }
}
</script>
