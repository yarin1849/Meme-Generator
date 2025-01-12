'use strict'

const keywordsById = {
    1: ['funny', 'politics'],
    2: ['funny', 'animal'],
    3: ['happy', 'animal'],
    4: ['funny', 'animal'],
    5: ['funny', 'human'],
    6: ['sarcastic', 'human'],
    7: ['funny', 'human'],
    8: ['crazy', 'human'],
    9: ['funny', 'human'],
    10: ['funny', 'human'],
    11: ['sarcastic', 'human'],
    12: ['sarcastic', 'human'],
    13: ['sarcastic', 'human'],
    14: ['sad', 'human'],
    15: ['happy', 'human'],
    16: ['happy', 'human'],
    17: ['funny', 'human'],
    18: ['funny', 'toys'],
    19: ['funny', 'human'],
    20: ['sarcastic', 'human'],
    21: ['funny', 'toys'],
    22: ['happy', 'human'],
    23: ['happy', 'human'],
    24: ['sad', 'human']
}

const gImgs = Object.keys(keywordsById).map(id => ({
    id: +id,
    url: `img/${id}.jpg`,
    keywords: keywordsById[id]
}))

function renderGallery(images) {
    const elGallery = document.querySelector('.imges-container')
    if (!elGallery) return

    elGallery.innerHTML = images.map(img => `
        <img src="${img.url}" alt="Image ${img.id}" onclick="onImgSelect(${img.id})" />
    `).join('')
}

function filterImages(filterValue) {
    return gImgs.filter(img =>
        img.keywords.some(keyword => keyword.toLowerCase().includes(filterValue.toLowerCase()))
    )
}

function onFilterChange(event) {
    const filterValue = event.target.value
    const filteredImgs = filterImages(filterValue)
    renderGallery(filteredImgs)
}

function clearFilter() {
    document.querySelector('.filter-input').value = ''
    renderGallery(gImgs)
}

function onImgSelect(imgId) {
    setImg(imgId)
    window.location.href = `editor.html?imgId=${imgId}`
}

document.addEventListener('DOMContentLoaded', () => {
    renderGallery(gImgs)
})

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onRandomSelection() {
    onImgSelect(getRandomIntInclusive(1, gImgs.length))
}

function onImgInput(event) {
    const reader = new FileReader()

    reader.onload = function () {
        const imgSrc = reader.result
        localStorage.setItem('uploadedImg', imgSrc)
        window.location.href = 'index.html?uploaded=true'
    }

    const file = event.target.files[0]
    if (file) reader.readAsDataURL(file)
}
