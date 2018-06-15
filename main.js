var canvasElement = document.querySelector('canvas')

function updateCanvasSize() {
    canvasElement.width = canvasElement.parentNode.clientWidth
    canvasElement.height = canvasElement.parentNode.clientHeight
}

window.onresize = function() {
    updateCanvasSize()
}

var canvasContext = canvasElement.getContext('2d')
var image = new Image()
image.src = './image.jpg'

image.onload = function() {
    canvasContext.drawImage(image, 0, 0)
    var imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height)

    for(var i = 0; i < imageData.data.length; ++i)
        imageData.data[i] = (Math.random() * 256) & 255

    canvasContext.putImageData(imageData, 0, 0)
}

updateCanvasSize()