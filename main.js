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

function calculateImage(image) {
    var newImage = canvasContext.createImageData(image)

    function getPixel(image, x, y){
        return image.data[(y * image.width + x) * 4 + 1]
    }

    function setPixel(image, x, y, pixel){
        image.data[(y * image.width + x) * 4] = pixel
        image.data[(y * image.width + x) * 4 + 1] = pixel
        image.data[(y * image.width + x) * 4 + 2] = pixel
        image.data[(y * image.width + x) * 4 + 3] = 255
    }

    for(var y = 0; y < image.height - 1; ++y) {
        for(var x = 0; x < image.width - 1; ++x) {
            var top = getPixel(image, x, y)
            var right = getPixel(image, x + 1, y)
            var bottom = getPixel(image, x, y + 1)

            if(Math.abs(top - right) > 40 || Math.abs(top - bottom) > 40)
                setPixel(newImage, x, y, 0)
        }
    }

    return newImage
}

image.onload = function() {
    canvasContext.drawImage(image, 0, 0)
    var imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height)

    canvasContext.putImageData(calculateImage(imageData), 0, 0)
}

updateCanvasSize()