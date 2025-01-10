'use strict'

function onInitSaved(){
    renderSavedMemes()
}

function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const elSavedMemes = document.querySelector('.saved-memes-container')
    if (!elSavedMemes) { return }

    elSavedMemes.innerHTML = savedMemes.map(meme => `
        <img src="imges/${meme.selectedImgId}.jpg" onclick="onImgSelect(${meme.selectedImgId})" />
    `).join('')
}

function loadSavedMeme(meme) {
    gMeme = meme
    renderMeme()
}

function clearSavedMemes() {
    saveToStorage(STORAGE_KEY, [])
    renderSavedMemes()
}

