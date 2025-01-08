'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const urlParams = new URLSearchParams(window.location.search)
    const imgId = urlParams.get('imgId')

    if (imgId) setImg(imgId)

    renderMeme()
    addTextInput()
    addColorInput()
}

function renderMeme() {
    const meme = getMeme()
    drawImg(meme.selectedImgId)
    renderText()
}

function drawImg(imgId) {
    const elImg = new Image()
    elImg.src = `meme-imgs/${imgId}.jpg`
    elImg.onload = () => {
        coverCanvasWithImg(elImg)
        renderText()
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function drawText(line, idx) {
    gCtx.font = `${line.size}px Arial`
    gCtx.fillStyle = line.color
    gCtx.textAlign = 'center'

    const x = gElCanvas.width / 2
    const y = 50 + idx

    gCtx.fillText(line.txt, x, y)
}

function renderText() {
    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        drawText(line, idx)
    })
}



function addTextInput() {
    const elTxtInput = document.getElementById('memeTextInput')
    console.log('elTxtInput', elTxtInput)
    elTxtInput.addEventListener('input', onTextInput)
}

function onTextInput(ev) {
    const newText = ev.target.value
    setLineTxt(newText)
    renderMeme()
}

function addColorInput() {
    const elColorInput = document.getElementById('textColor')
    elColorInput.addEventListener('input', onTextColor)
}

function onTextColor(ev) {
    const newColor = ev.target.value
    setTextColor(newColor)
    renderMeme()
}

function onIncreaseFontSize() {
    increaseFontSize()
    renderMeme()
}

function onDecreaseFontSize() {
    decreaseFontSize()
    renderMeme()
}


function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'Your-perfect-mime'
}