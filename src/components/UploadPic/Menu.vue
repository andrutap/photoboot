<template lang="html">
  <nav class="camera-menu" :class="{'button-group': uploadedImage}">
    <label for="uploadPic" class="item">Subir foto</label>
    <input style="display:none" type="file" name="uploadPic" id="uploadPic" accept="image/*" capture="user" @change="preloadImage"/>
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
