'use strict'

function onInitSaved() {
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elSavedMemes = document.querySelector('.saved-memes-container')
    if (!elSavedMemes) return

    elSavedMemes.innerHTML = savedMemes.map((meme, idx) => `
        <canvas id="saved-canvas-${idx}" class="saved-canvas" onclick="onEditSavedMeme(${idx})"></canvas>
    `).join('')

    savedMemes.forEach((meme, idx) => {
        const canvas = document.getElementById(`saved-canvas-${idx}`)
        const ctx = canvas.getContext('2d')
        drawSavedMeme(meme, canvas, ctx)
    })
}

function drawSavedMeme(meme, canvas, ctx) {
    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        canvas.width = elImg.naturalWidth
        canvas.height = elImg.naturalHeight

        ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)
        meme.lines.forEach(line => {
            ctx.font = `${line.size}px ${line.fontFamily}`
            ctx.fillStyle = line.color
            ctx.textAlign = line.align
            ctx.fillText(line.txt, canvas.width / 2, line.y)
        })
    }
}

function onEditSavedMeme(idx) {
    const savedMemes = getSavedMemes()
    const memeToEdit = savedMemes[idx]

    saveToStorage('editingMemeIdx', idx)

    loadSavedMeme(memeToEdit)
    window.location.href = 'index.html'
}




function loadSavedMeme(meme) {
    gMeme = meme
    renderMeme()
}

function clearSavedMemes() {
    saveToStorage(STORAGE_KEY, [])
    renderSavedMemes()
}
