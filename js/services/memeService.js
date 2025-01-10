'use strict'

const STORAGE_KEY = 'memeDB'

// function createMemes(imgId) {
//     const memes = loadFromStorage(STORAGE_KEY) || [];
//     const newMeme = createMeme(imgId);
//     memes.push(newMeme);
//     saveToStorage(STORAGE_KEY, memes);
// }

// function createMeme(imgId) {
//     return {
//         selectedImgId: imgId,
//         selectedLineIdx: 0,
//         lines: [
//             {
//                 txt: 'Add text here',
//                 size: 40,
//                 color: 'white',
//                 fontFamily: 'Arial',
//                 align: 'center',
//                 y: 50
//             }
//         ]
//     }
// }

function saveMemeToStorage() {
    const memes = loadFromStorage(STORAGE_KEY) || []
    memes.push(gMeme)
    saveToStorage(STORAGE_KEY, memes)  
}

function getSavedMemes() {
    return loadFromStorage(STORAGE_KEY) || []
}

function clearSavedMemes() {
    saveToStorage(STORAGE_KEY, [])
}


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add text here',
            size: 40,
            color: 'white',
            fontFamily: 'Arial',
            align: 'center'
        }
    ]
}


function getMeme() {
    return gMeme
}

function getCurrentLine() {
    if (gMeme.selectedLineIdx < 0 || gMeme.selectedLineIdx === gMeme.lines.length)
        gMeme.selectedLineIdx = 0

    return gMeme.lines[gMeme.selectedLineIdx]
}


function setLineTxt(newText) {
    const line = getCurrentLine()
    line.txt = newText
}

function setTextColor(newColor) {
    const line = getCurrentLine()
    line.color = newColor
}

function setFontSize(newSize) {
    const line = getCurrentLine()
    line.size = newSize
}

function setIncreaseFontSize() {
    const line = getCurrentLine()
    line.size += 2
}

function setDecreaseFontSize() {
    const line = getCurrentLine()
    line.size -= 2
}

function setAddLine() {
    gMeme.lines.push({
        txt: 'Add text here',
        size: 40,
        color: 'white',
        fontFamily: 'Arial',
        align: 'center'
    })
}

function setSwitchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setSelectedLine(line) {
    const idx = gMeme.lines.indexOf(line)
    gMeme.selectedLineIdx = idx
}

function setDeleteLine() {
    const selectedLineIdx = gMeme.selectedLineIdx
    if (gMeme.lines.length > 0) { gMeme.lines.splice(selectedLineIdx, 1) }
    if (gMeme.selectedLineIdx >= gMeme.lines.length) { gMeme.selectedLineIdx = 0 }
}

function setFontFamily(newFontFamily) {
    const line = getCurrentLine()
    line.fontFamily = newFontFamily
}

function setTextAlign(newAlign) {
    const line = getCurrentLine()
    line.align = newAlign
}