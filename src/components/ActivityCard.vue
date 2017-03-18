<template>
  <div class="card card-3 card-hover" @click="chooseActivity">
    <transition name="fade">
      <div v-if="isSelected" class="card-selected">✔</div>
    </transition>
    <div class="card-header">
      <h4 class="card-title">{{ activity.name }}</h4>
      <p class="card-meta">{{ activity.blurb }}</p>
    </div>
    <div
      class="card-image"
      :style="{
        'background-image': 'url(' + activity.photo + ')',
        height: '160px'
      }">
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'activity',
    'isSelected'
  ],
  methods: {
    chooseActivity () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 200ms
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
