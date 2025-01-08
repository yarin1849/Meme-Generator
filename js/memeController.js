'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}

function renderMeme() {
    drawImg()
}

function drawImg() {
    const elImg = new Image()
    elImg.src = 'meme-imgs/1.jpg'
    elImg.onload = () => {
        coverCanvasWithImg(elImg)
        drawText('My text')
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(text) {
    gCtx.font = '30px Arial'
    gCtx.fillStyle = 'white'
    gCtx.textAlign = 'center'

    const x = gElCanvas.width / 2
    const y = gElCanvas.height / 6

    gCtx.fillText(text, x, y)
}