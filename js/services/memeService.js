'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(newText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newText
}

function setTextColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}

function setFontSize(newSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = newSize
}

function increaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFontSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}