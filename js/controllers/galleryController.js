'use strict'

const images = [1, 2]


function onGalleryInit() {
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.imgs-container')


    elGallery.innerHTML = images.map(imgId => `<img src="meme-imgs/${imgId}.jpg" onclick="onImgSelect(${imgId})" />`).join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    window.location.href = `index.html?imgId=${imgId}`
}