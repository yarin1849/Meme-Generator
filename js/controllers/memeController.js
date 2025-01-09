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
    addFontFamilyInput()
    addTextAlignInput()

    gElCanvas.addEventListener('click', onCanvasClick)
}

function addFontFamilyInput() {
    const elFontFamilySelect = document.getElementById('fontFamily')
    elFontFamilySelect.addEventListener('change', onFontFamilyChange)
}

function onFontFamilyChange(ev) {
    const newFontFamily = ev.target.value
    setFontFamily(newFontFamily)
    renderMeme()
}

function addTextAlignInput() {
    const elTextAlignSelect = document.getElementById('textAlign')
    elTextAlignSelect.addEventListener('change', onTextAlignChange)
}

function onTextAlignChange(ev) {
    const newAlign = ev.target.value
    setTextAlign(newAlign)
    renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    drawImg(meme.selectedImgId)
    renderText()
}

function drawImg(imgId) {
    const elImg = new Image()
    elImg.src = `imges/${imgId}.jpg`
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
    gCtx.font = `${line.size}px ${line.fontFamily}`
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align

    const x = gElCanvas.width / 2
    const y = line.y

    line.x = x - gCtx.measureText(line.txt).width / 2
    line.y = y

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
    const borderY = line.y - (line.size - 5 / 2)
    const borderWidth = line.width
    const borderHeight = line.size

    gCtx.strokeStyle = line.color
    gCtx.lineWidth = 1.5
    gCtx.strokeRect(borderX, borderY, borderWidth, borderHeight)
}

function onCanvasClick(ev) {
    const { offsetX, offsetY } = ev

    const clickedLine = gMeme.lines.find(line => {
        return (
            offsetX > line.x &&
            offsetX < line.x + line.width + 120 &&
            offsetY > line.y - line.size / 2 &&
            offsetY < line.y + line.size / 2
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
        if (!line.y) { line.y = 50 + idx * (line.size + 10) }

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

function onMoveTextUp() {
    const selectedLine = getCurrentLine()
    if (selectedLine)
        selectedLine.y -= 5
    renderMeme()
}

function onMoveTextDown() {
    const selectedLine = getCurrentLine()
    if (selectedLine)
        selectedLine.y += 5
    renderMeme()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}