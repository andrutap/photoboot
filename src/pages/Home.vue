<template lang="html">
  <div class="row">
    <div class="tile">
      <instruction></instruction>
    </div>
    <div class="tile app-container">
      <camera-app></camera-app>
    </div>
  </div>
</template>

<script>
import Instruction from '@/components/Instructions'
import CameraApp from '@/components/CameraApp'
export default {
  components: {
    instruction: Instruction,
    CameraApp: CameraApp
  }
}
</script>

<style lang="css">
</style>
