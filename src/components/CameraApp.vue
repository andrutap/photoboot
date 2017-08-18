<template lang="html">
  <div class="menu">
    <div class="is-menu-header">
        <img src="static/welcomeGif.gif" alt="Welcome animated gif" />
    </div>
    <ul class="is-big-list nav">
      <li v-if="!isIOS">
        <router-link tag="button" to="new/photo" class="item is-active">
          Sacárse una foto
        </router-link>
      </li>
      <li>
        <router-link tag="button" to="/upload" class="item">
          Subir foto
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isIOS: null,
    }
  },
  mounted () {
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
}
</script>

<style lang="css">
</style>
