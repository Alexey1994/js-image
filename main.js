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
image.src = 'image.jpg'

image.onload = function() {
    canvasContext.drawImage(image, 0, 0)
    var imageSource = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height)

    canvasContext.drawImage(image, 0, 0)
    var imageOutput = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height)
console.log(canvasContext)

    function getPixel(x, y) {
        return [
            imageSource.data[(imageSource.width * y + x) * 4],
            imageSource.data[(imageSource.width * y + x) * 4 + 1],
            imageSource.data[(imageSource.width * y + x) * 4 + 2]
        ]
    }

    function pixelDistance(pixel1, pixel2) {
        return Math.max(
            Math.abs(pixel1[0] - pixel2[0]),
            Math.abs(pixel1[1] - pixel2[1]),
            Math.abs(pixel1[2] - pixel2[2])
        )
    }

    function setPixel(x, y) {
        imageOutput.data[(imageOutput.width * y + x) * 4] = 255
        imageOutput.data[(imageOutput.width * y + x) * 4 + 1] = 255
        imageOutput.data[(imageOutput.width * y + x) * 4 + 2] = 255
        imageOutput.data[(imageOutput.width * y + x) * 4 + 3] = 255
    }

    function clearPixel(x, y) {
        imageOutput.data[(imageOutput.width * y + x) * 4] = 0
        imageOutput.data[(imageOutput.width * y + x) * 4 + 1] = 0
        imageOutput.data[(imageOutput.width * y + x) * 4 + 2] = 0
        imageOutput.data[(imageOutput.width * y + x) * 4 + 3] = 255
    }

    function clearImage() {
        for(var y = 0; y < imageOutput.height; ++y)
            for(var x = 0; x < imageOutput.width; ++x)
                clearPixel(x, y)
    }

    clearImage()
/*
    for(var y = 0; y < imageSource.height; ++y) {
        for(var x = 0; x < imageSource.width - 1; ++x) {
            var currentPixel = getPixel(x, y)
            var nextPixel = getPixel(x + 1, y)

            if(pixelDistance(currentPixel, nextPixel) > 25) {
                setPixel(x, y)
            }
        }
    }

    for(var x = 0; x < imageSource.width; ++x) {
        for(var y = 0; y < imageSource.height - 1; ++y) {
            var currentPixel = getPixel(x, y)
            var nextPixel = getPixel(x, y + 1)

            if(pixelDistance(currentPixel, nextPixel) > 25) {
                setPixel(x, y)
            }
        }
    }*/

    var pattern = [68, 52, 27]//getPixel(0, 0)

    for(var y = 0; y < imageSource.height; ++y) {
        for(var x = 0; x < imageSource.width; ++x) {
            var currentPixel = getPixel(x, y)

            if(pixelDistance(currentPixel, pattern) < 20) {
                setPixel(x, y)
            }
        }
    }

    canvasContext.putImageData(imageOutput, 0, 0)
}

updateCanvasSize()