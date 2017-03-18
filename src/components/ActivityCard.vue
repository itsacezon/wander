<template>
  <div class="card card-3" @click="chooseActivity">
    <div class="card-header">
      <h4 class="card-title" :style="{ color: isSelected ? 'red' : 'black' }">{{ activity.name }}</h4>
      <p class="card-meta">{{ activity.blurb }}</p>
    </div>
    <div
      class="card-image"
      :style="{
        'background-image': 'url(' + activity.photo + ')',
        height: '100px'
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
