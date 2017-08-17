var webcamStream, mediaStream

export function cameraInit () {
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: 400,
        height: 400
      },
      audio: false
    }).then((mediaStream) => {
      var video = document.querySelector('#video')
      video.srcObject = mediaStream
      video.onloadedmetadata = () => {
        video.play()
      }
      webcamStream = mediaStream
    }).catch((error) => {
      console.log('The following error has occured: ' + error.name)
    })
}

export function cameraEnd () {
  webcamStream.getTracks()[0].stop()
}
