<template lang="html">
  <div class="box">
    <nav class="nav horizontal-list button-group">
        <span class="item" @click="editFilter" :class="{'is-active': addFilter}">
          Añadir filtro
        </span>
        <span class="item" @click="editBorder" :class="{'is-active': addBorder}">
          Añadir marco
        </span>
        <span class="item" @click="share" :class="{'is-active': isSharing}">
          Compartir
        </span>
    </nav>
    <div class="modifier-container" v-show="addFilter">
      <ul class="horizontal-list">
        <li class="" v-for="filter in filters" :key="'filter'" >
          <img :src="filter.src" alt="Filter" @click="addFilt" id="filter"/>
        </li>
        <li class="">
          <img src="static/no.png" @click="removeFilter" />
        </li>
      </ul>
    </div>
    <div class="modifier-container" v-show="addBorder">
      <ul class="horizontal-list">
        <li class="" v-for="frame in frames" :key="'frame'" >
          <img :src="frame.src" alt="Frame" @click="addFrame"/>
        </li>
        <li class="">
          <img src="static/no.png" @click="removeBorder" />
        </li>
      </ul>
    </div>
    <div class="modifier-container" v-show="isSharing">
      <ul class="horizontal-list">
        <li>
          <button @click="facebookShare" class="social-button facebook">
            Compartir en facebook
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {saveCanvas, loadCanvas, canvas, ctx, dataURItoBlob, clearCanvas} from '@/helper/canvas'
export default {
  data () {
    return {
      photoTaken: false,
      addFilter: false,
      addBorder: false,
      isSharing: false,
      message: 'Ya estoy participando!',
      filters: [
        { src: 'static/filters/1.png' },
        { src: 'static/filters/2.png' }
      ],
      frames: [
        { src: 'static/frames/1.png' },
        { src: 'static/frames/2.png' }
      ]
    }
  },
  methods: {
    editFilter () {
      this.addFilter = true
      this.addBorder = false
      this.isSharing = false
    },
    addFilt (event){
      var filterImage = document.querySelector('#filterImage')
      filterImage.src = event.target.src
    },
    addFrame (event){
      var frameImage = document.querySelector('#frameImage')
      frameImage.src = event.target.src
    },
    removeBorder (event) {
      var frameImage = document.querySelector('#frameImage')
      frameImage.src = '.static/images/transparent.png'
    },
    removeFilter (event) {
      var filterImage = document.querySelector('#filterImage')
      filterImage.src = '.static/images//transparent.png'
    },
    editBorder () {
      this.addFilter = false
      this.addBorder = true
      this.isSharing = false
    },
    share () {
      this.addFilter = false
      this.addBorder = false
      this.isSharing = true
    },
    facebookShare () {
      this.makeCanvas()
      var data = document.querySelector('#snapshotCanvas').toDataURL('image/png')
      try {
        var blob = dataURItoBlob(data)
      } catch (e) {
        console.log(e)
      }
      this.postImageToFacebook()
    },
    makeCanvas () {
      var canvas = document.querySelector('#snapshotCanvas')
      var ctx = canvas.getContext('2d')
      var filterImage = document.querySelector('#filterImage')
      var frameImage = document.querySelector('#frameImage')
      ctx.drawImage(filterImage, 0, 0)
      ctx.drawImage(frameImage, 0, 0)
      filterImage.style.display = 'none'
      frameImage.style.display = 'none'
      ctx.scale(-1, 1)
    },
    postImageToFacebook () {
      var fbButton = document.querySelector('.facebook')
      fbButton.textContent = 'Compartiendo...'
      fbButton.disabled = true
      fbButton.classList.add('disabled')
      setTimeout(function () {
          fbButton.textContent = '¡Compartida!'
          fbButton.disabled = true
      }, 1000)
      /*var vm = this
      var fd = new FormData()
      fbButton.disabled = true
      fd.append('access_token', token)
      fd.append('source', imageData)
      fd.append('no_story', true)
      this.axios({
        method: 'post',
        url: 'https://graph.facebook.com/me/photos?access_token=' + token,
        data: fd,
        processData: false,
        contentType: false,
        cache: false
      }).then((response) => {
        FB.api(
          '/' + response.data.id + '?fields=images',
          (response) => {
            FB.api(
              '/me/feed',
              'POST',
              {
                'message': 'Esto es una prueba',
                'object_attachment': response.id,
                'privacy': {
                  value: 'SELF'
                }
              },
              (response) => {
                fbButton.textContent = '¡Compartida!'
              }
            )
          }
        )
      }).catch((error) => {
        alert('Hubo un error, intenta nuevamente')
      }) */
    }
  },
  beforeDestroy () {
    clearCanvas()
    var filterImage = document.querySelector('#filterImage')
    var frameImage = document.querySelector('#frameImage')
    filterImage.src = ''
    frameImage.src = ''
  }
}
</script>

<style lang="css">
</style>
