<template lang="html">
  <div class="is-instructions">
      <ul class="is-big-list">
        <li>
          <span v-if="!isIOS">Sácate o sube una foto</span>
          <span v-else>Sube una foto</span>
        </li>
        <li>
          Edítala y compártela
        </li>
        <li>
          Felicidades, ya estarás participando
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
  beforeCreate () {
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
}
</script>

<style lang="css">
</style>
