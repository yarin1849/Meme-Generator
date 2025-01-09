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

    gElCanvas.addEventListener('click', onCanvasClick)
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
    const y = 50 + idx * (line.size + 10)

    line.x = x - gCtx.measureText(line.txt).width / 2
    line.y = y - line.size / 2

    gCtx.fillText(line.txt, x, y)

    const textWidth = gCtx.measureText(line.txt).width
    line.width = textWidth
    line.height = line.size

    if (idx === gMeme.selectedLineIdx) {
        drawTextBorder(line)
    }
}


function drawTextBorder(line) {
    const borderX = line.x
    const borderY = line.y - 8
    const borderWidth = line.width
    const borderHeight = line.height

    gCtx.strokeStyle = line.color
    gCtx.lineWidth = 1.5
    gCtx.strokeRect(borderX, borderY, borderWidth, borderHeight)
}


function onCanvasClick(ev) {
    const { offsetX, offsetY } = ev

    const clickedLine = gMeme.lines.find(line => {
        return (
            offsetX > line.x &&
            offsetX < line.x + line.width + 100 &&
            offsetY > line.y - 8 &&
            offsetY < line.y + line.height
        )
    })

    if (clickedLine) {
        setSelectedLine(clickedLine)
        addTextInput()
        renderMeme()
    }
}



function renderText() {
    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        drawText(line, idx)
    })
}

function addTextInput() {
    const elTxtInput = document.getElementById('memeTextInput')
    const selectedLine = getCurrentLine()
    elTxtInput.value = selectedLine.txt
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
    setIncreaseFontSize()
    renderMeme()
}

function onDecreaseFontSize() {
    setDecreaseFontSize()
    renderMeme()
}

function onAddLine() {
    setAddLine()
    renderMeme()
}

function onSwitchLine() {
    setSwitchLine()
    addTextInput()
    renderMeme()
}

function onDeleteLine() {
    setDeleteLine()
    renderMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'Your-perfect-mime'
}