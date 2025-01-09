'use strict'

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]


function renderGallery() {
    const elGallery = document.querySelector('.imges-container')
    if (!elGallery) { return }

    elGallery.innerHTML = images.map(imgId => `
        <img src="imges/${imgId}.jpg" onclick="onImgSelect(${imgId})" />
    `).join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    window.location.href = `index.html?imgId=${imgId}`
}

document.addEventListener('DOMContentLoaded', renderGallery)

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}