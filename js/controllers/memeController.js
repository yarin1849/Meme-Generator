'use strict'

let gElCanvas
let gCtx
let gStartPos

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const editingMeme = loadFromStorage('editingMeme')
    if (editingMeme) {
        gMeme = editingMeme
        saveToStorage('editingMeme', null)
    } else {
        const urlParams = new URLSearchParams(window.location.search)
        const imgId = urlParams.get('imgId')
        if (imgId) setImg(imgId)
    }

    renderMeme()
    renderStickers()
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
    elImg.src = `img/${imgId}.jpg`
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

    if (!line.txt.trim()) {
        line.width = 0
        line.height = 0
        return
    }

    gCtx.font = `${line.size}px ${line.fontFamily}`
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.align

    if (line.x === undefined) {
        if (line.align === 'center') {
            line.x = gElCanvas.width / 2
        } else if (line.align === 'left') {
            line.x = 0
        } else if (line.align === 'right') {
            line.x = gElCanvas.width
        }
    }

    const x = line.x
    const y = line.y

    gCtx.fillText(line.txt, x, y)

    const textWidth = gCtx.measureText(line.txt).width
    line.width = textWidth
    line.height = line.size

    if (idx === gMeme.selectedLineIdx) {
        drawTextBorder(line, x, y, textWidth)
    }
}

function drawTextBorder(line, x, y, textWidth) {
    let borderX

    if (line.align === 'center') {
        borderX = x - textWidth / 2
    } else if (line.align === 'left') {
        borderX = x
    } else if (line.align === 'right') {
        borderX = textWidth
    }

    const borderY = y - line.size
    const borderWidth = textWidth
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
        if (!line.y) line.y = 50 + idx * (line.size + 10)
        if (!line.x) line.x = gElCanvas.width / 2

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
    const selectedLine = getCurrentLine()

    if (!newText.trim()) {
        selectedLine.width = 0
        selectedLine.height = 0
    }
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

function onSaveMemes() {
    saveMemeToStorage()
    renderSavedMemes()
}

function onSaveMemes() {
    saveMemeToStorage()
    renderSavedMemes()
    showSaveModal()
}

function showSaveModal() {
    const modal = document.getElementById('save-modal')
    modal.classList.add('show')

    setTimeout(() => {
        modal.classList.remove('show')
    }, 2000)
}

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }

    uploadImg(canvasData, onSuccess)
}

function renderStickers() {
    const stickers = ['😂', '😜', '😍', '❤️', '😎', '🔥']
    const container = document.querySelector('.stickers-container')

    const stickersHtml = stickers.map(sticker => {
        return `<button class="sticker" onclick="onAddSticker('${sticker}')">${sticker}</button>`
    }).join('')

    container.innerHTML = stickersHtml
}

function onAddSticker(sticker) {
    gMeme.lines.push({
        txt: sticker,
        size: 60,
        color: 'black',
        fontFamily: 'Arial',
        align: 'center',
        y: gElCanvas.height / 2
    })
    renderMeme()
}

function onDown(ev) {

    const pos = getEvPos(ev)

    const clickedLineIdx = isLineClicked(pos)
    if (clickedLineIdx === -1) return

    setLineDrag(clickedLineIdx, true)

    gMeme.selectedLineIdx = clickedLineIdx

    gStartPos = pos
    document.body.style.cursor = 'grabbing'

    renderMeme()
}

function onMove(ev) {
    const pos = getEvPos(ev)

    if (isDragging()) {
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        moveLine(dx, dy)

        gStartPos = pos

        renderMeme()
        return
    }

    if (isLineClicked(pos) !== -1) {
        document.body.style.cursor = 'grab'
    } else {
        document.body.style.cursor = 'default'
    }
}

function onUp() {
    stopDragging()
    document.body.style.cursor = 'default'

    renderMeme()
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        const touch = ev.changedTouches[0]
        const rect = gElCanvas.getBoundingClientRect()
        pos = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        }
    }
    return pos
}
