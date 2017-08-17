<template lang="html">
  <div class="box">
    <div class="camera-container">
      <video class="video" id="video" v-show="!photoTaken"></video>
      <img id="filterImage" class="fakeFrames" v-show="photoTaken" src="../../static/transparent.png">
      <img id="frameImage" class="fakeFrames" v-show="photoTaken" src="../../static/transparent.png">
      <canvas id="snapshotCanvas" v-show="photoTaken" width="400" height="400"></canvas>
      <router-view @photoWasTaken="photoTaken = $event"></router-view>
    </div>
  </div>
</template>

<script>
import {cameraEnd} from '@/helper/camera'
export default {
  data () {
    return {
      photoTaken: false
    }
  },
  beforeDestroy () {
    cameraEnd()
  }
}
</script>

<style lang="css">
  
</style>
