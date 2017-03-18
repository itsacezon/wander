<template>
  <div>
    <h2 class="text-center">Let's create your <span v-if="!hasGoals">first</span> travel goal</h2>

    <ul class="step my-20">
      <li :class="['step-item', { active: currentStep === 1 }]">
        <a>Pick a city</a>
      </li>
      <li :class="['step-item', { active: currentStep === 2 }]">
        <a>Choose activities</a>
      </li>
      <li :class="['step-item', { active: currentStep === 3 }]">
        <a>Your flight</a>
      </li>
    </ul>

    <step-1 v-if="currentStep === 1" @choose-destination="changeStep"></step-1>
    <step-2 v-if="currentStep === 2" :destination="prop" @choose-activities="changeStep"></step-2>
    <step-3 v-if="currentStep === 3" :activities="prop"></step-3>
  </div>
</template>

<script>
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

export default {
  props: [
    'hasGoals'
  ],
  data () {
    return {
      currentStep: 1,
      prop: {}
    }
  },
  methods: {
    changeStep (nextStep, prop) {
      this.currentStep = nextStep
      this.prop = prop
    }
  },
  components: {
    'step-1': Step1,
    'step-2': Step2,
    'step-3': Step3
  }
}
</script>
