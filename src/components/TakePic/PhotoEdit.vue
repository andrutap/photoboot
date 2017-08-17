<template lang="html">
  <div>
    <nav class="camera-menu button-group">
        <span class="item" @click="editFilter" :class="{'is-active': addFilter}">
          Añadir filtro
        </span>
        <span class="item" @click="editBorder" :class="{'is-active': addBorder}">
          Añadir marco
        </span>
        <span class="item" @click="share">
          Compartir
        </span>
    </nav>
    <div class="filter-container" v-if="addFilter">
      <ul class="horizontal-list">
        <li class="" v-for="filter in filters" :key="'filter'" >
          <img :src="filter.src" alt="Filter" @click="addFilt" id="filter"/>
        </li>
      </ul>
    </div>
    <div class="filter-container" v-if="addBorder">
      <ul class="horizontal-list">
        <li class="" v-for="frame in frames" :key="'frame'" >
          <img :src="frame.src" alt="Frame" @click="addFrame" id="frame"/>
        </li>
      </ul>
    </div>
    <div class="share-container" v-if="isSharing">
      <button @click="facebookShare">
        Compartir en facebook
      </button>
    </div>
  </div>
</template>

<script>
import {saveCanvas, loadCanvas, canvas, ctx, dataURItoBlob, clearCanvas} from '@/helper/canvas'
export default {
  data () {
    return {
      photoTaken: true,
      addFilter: false,
      addBorder: false,
      isSharing: false,
      message: 'Ya estoy participando!',
      filters: [
        { src: '../../static/filters/1.png' },
        { src: '../../static/filters/2.png' }
      ],
      frames: [
        { src: '../../static/frames/1.png' }
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
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          this.postImageToFacebook(response.authResponse.accessToken, 'Canvas to Facebook', 'image/png', blob, window.location.href)
        } else if (response.status === 'not_authorized') {
          FB.login((response) => {
            this.postImageToFacebook(response.authResponse.accessToken, 'Canvas to Facebook', 'image/png', blob, window.location.href)
          }, {scope: 'publish_actions'})
        } else {
          FB.login((response) => {
            this.postImageToFacebook(response.authResponse.accessToken, 'Canvas to Facebook', 'image/png', blob, window.location.href)
          }, {scope: 'publish_actions'})
        }
      })
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
    postImageToFacebook (token, filename, mimeType, imageData, message) {
      var vm = this
      var fd = new FormData()
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
            console.log(response)
            FB.api(
              '/me/feed',
              'POST',
              {
                'message': 'Esta es una prueba',
                'object_attachment': response.id
              }
            )
          }
        )
      }).catch((error) => {
        alert('Hubo un error, intenta nuevamente')
      })
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
