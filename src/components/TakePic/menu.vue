<template lang="html">
  <nav class="camera-menu" :class="{'button-group': photoTaken}">
    <span class="item" @click="takePic">
      <span class="icon icon-basic-photo"></span> Tomar foto
    </span>
  </nav>
</template>

<script>
import {bus} from '@/main'
import {cameraInit} from '@/helper/camera'
import {snapShot, saveCanvas} from '@/helper/canvas'
export default {
  data () {
    return {
      photoTaken: false,
    }
  },
  methods: {
    takePic () {
      this.photoTaken = true
      this.$emit('photoWasTaken', this.photoTaken)
      snapShot()
      this.$router.push('/new/photo/edit')
    }
  },
  mounted () {
    this.photoTaken = false
    this.$emit('photoWasTaken', this.photoTaken)
    cameraInit()
  }
}
</script>

<style lang="css">
</style>
