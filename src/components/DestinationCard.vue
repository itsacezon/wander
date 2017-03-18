<template>
  <div class="card card-3 card-hover" @click="chooseDestination">
    <div class="card-header">
      <h4 class="card-title">{{ destination.name }}</h4>
    </div>
    <div
      class="card-image"
      :style="{
        'background-image': 'url(' + destination.photo + ')',
        height: '160px'
      }">
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'destination'
  ],
  methods: {
    chooseDestination () {
      this.$emit('click')
    }
  }
}
</script>
