<template lang="html">
  <div class="box">
    <div class="camera-container">
      <div class="upload-file">
        <img id="frameImage" class="fakeFrames" v-show="photoTaken" src="static/images/transparent.png">
        <img id="filterImage" class="fakeFrames" v-show="photoTaken" src="static/images/transparent.png">
        <canvas id="snapshotCanvas" width="400" height="400"></canvas>
      </div>
      <router-view @photoWasTaken="photoTaken = $event"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      photoTaken: false
    }
  },
  mounted () {
    var frames = document.querySelectorAll('.fakeFrames')
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].style.display === 'none') {
        this.$router.push('/upload')
      }
    }
  }
}
</script>

<style lang="css">
#preloadedImage {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  object-fit: cover;
}
</style>
