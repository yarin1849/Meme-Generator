'use strict'

function onInitSaved() {
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elSavedMemes = document.querySelector('.saved-memes-container')
    if (!elSavedMemes) return

    elSavedMemes.innerHTML = savedMemes.map((meme, idx) => `
        <section class="saved-meme-wrapper">
            <canvas id="saved-canvas-${idx}" class="saved-canvas" onclick="onEditSavedMeme(${idx})"></canvas>
            <button class="delete-meme-btn" onclick="onDeleteSavedMeme(${idx})">X</button>
        </section>
    `).join('')

    savedMemes.forEach((meme, idx) => {
        const canvas = document.getElementById(`saved-canvas-${idx}`)
        const ctx = canvas.getContext('2d')
        drawSavedMeme(meme, canvas, ctx)
    })
}

function onDeleteSavedMeme(idx) {
    let savedMemes = getSavedMemes()
    savedMemes.splice(idx, 1)
    saveToStorage(STORAGE_KEY, savedMemes)
    renderSavedMemes()
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

            const x = line.x || canvas.width / 2
            const y = line.y || 50

            ctx.fillText(line.txt, x, y)
        })
    }
}

function onEditSavedMeme(idx) {
    const savedMemes = getSavedMemes()
    const memeToEdit = savedMemes[idx]

    saveToStorage('editingMeme', memeToEdit)

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
