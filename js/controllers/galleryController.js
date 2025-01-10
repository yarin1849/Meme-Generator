'use strict'

'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'animal'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy', 'animal'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'animal'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'meme'] },
    { id: 6, url: 'img/6.jpg', keywords: ['sarcastic', 'human'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'human'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'human'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'human'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'human'] },
    { id: 11, url: 'img/11.jpg', keywords: ['sarcastic', 'human'] },
    { id: 12, url: 'img/12.jpg', keywords: ['sarcastic', 'human'] },
    { id: 13, url: 'img/13.jpg', keywords: ['sarcastic', 'human'] },
    { id: 14, url: 'img/14.jpg', keywords: ['sad', 'human'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy', 'human'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy', 'human'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'human'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'toys'] }
]

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]


function getImagge() {
    return gImgs
}


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

function onRandomSelection(){
    onImgSelect(getRandomIntInclusive(1, images.length))
}

console.log('gElCanvas');
console.log(gElCanvas);

