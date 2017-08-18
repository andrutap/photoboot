<template lang="html">
  <nav class="nav horizontal-list" :class="{'button-group': uploadedImage}">
    <label for="uploadPic" class="item">Subir foto</label>
    <input style="display:none" type="file" name="uploadPic" id="uploadPic" accept="image/*" @change="preloadImage"/>
    <span class="item" @click="saveImage" v-if="uploadedImage">
      Usar esta foto
    </span>
  </nav>
</template>

<script>
import {drawFakeImage, drawFromUpload} from '@/helper/canvas'
export default {
  data () {
    return {
      uploadedImage: false
    }
  },
  methods: {
    preloadImage (event) {
      drawFromUpload (event)
      this.uploadedImage = true
      var canvas = document.querySelector('#snapshotCanvas')
      canvas.style.backgroundImage = 'none'
    },
    saveImage () {
      this.photoTaken = true
      this.$emit('photoWasTaken', this.photoTaken)
      this.$router.push('/upload/edit')
    }
  }
}
</script>

<style lang="css">
</style>
