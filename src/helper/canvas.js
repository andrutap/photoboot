import {cameraEnd} from './camera'

export function snapShot () {
  var snapshotCanvas = document.querySelector('#snapshotCanvas')
  var snapCtx = snapshotCanvas.getContext('2d')
  var video = document.querySelector('#video')
  snapCtx.drawImage(video, 0, 0, 400, 400)
  cameraEnd()
}

export function saveCanvas () {
  var snapshotCanvas = document.querySelector('#snapshotCanvas')
  var savedCanvas = snapshotCanvas.toDataURL()
  localStorage.setItem('cv', savedCanvas)
}

export function loadCanvas () {
  var snapshotCanvas = document.querySelector('#snapshotCanvas')
  var snapCtx = snapshotCanvas.getContext('2d')
  var dataURL = localStorage.getItem('cv')
  var img = new Image()
  img.src = dataURL
  snapCtx.drawImage(img, 400, 400)
}

export function drawFakeImage () {
    var canvas = document.querySelector('#snapshotCanvas')
    var ctx = canvas.getContext('2d')
    var image = new Image()
    image.src = 'static/fakeCanvas.jpg'
    ctx.drawImage(image, 0, 0)
}

export function clearCanvas () {
  var canvas = document.querySelector('#snapshotCanvas')
  var ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 400, 400)
}

export function drawFromUpload (event) {
  var canvas = document.querySelector('#snapshotCanvas')
  var ctx = canvas.getContext('2d')
  var input = event.target
  var image = new Image()
  if (input.files && input.files[0]) {
    var reader = new FileReader
    reader.onload = (e) => {
      clearCanvas()
      image.src = e.target.result
      image.onload = () => {
        var ratio = image.height / image.width
        ctx.drawImage(image, 0, 0, 400, 400 * ratio)
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}

export function dataURItoBlob (dataURI) {
  var byteString = atob(dataURI.split(',')[1])
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ab], {type: 'image/png'})
}
