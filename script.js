let leftShore = ['farmer', 'wolf', 'goat', 'cabbage'];
let rightShore = [];
let boat = [];
let boatPosition = 'left';

function moveCharacter(character) {
    if (boatPosition === 'left' && leftShore.includes(character) && boat.length < 2) {
        leftShore = leftShore.filter(item => item !== character);
        boat.push(character);
    } else if (boatPosition === 'right' && rightShore.includes(character) && boat.length < 2) {
        rightShore = rightShore.filter(item => item !== character);
        boat.push(character);
    } else if (boat.includes(character)) {
        boat = boat.filter(item => item !== character);
        if (boatPosition === 'left') {
            leftShore.push(character);
        } else {
            rightShore.push(character);
        }
    }
    renderGame();
}

function crossRiver() {
    if (boat.length > 0) {
        boatPosition = (boatPosition === 'left') ? 'right' : 'left';
        renderGame();
    }
}

function renderGame() {
    document.getElementById('left-shore').innerHTML = leftShore.map(item => `<div id="${item}" class="character">${getEmoji(item)}</div>`).join('');
    document.getElementById('right-shore').innerHTML = rightShore.map(item => `<div id="${item}" class="character">${getEmoji(item)}</div>`).join('');
    document.getElementById('boat').innerHTML = boat.map(item => `<div id="${item}" class="character">${getEmoji(item)}</div>`).join('');
    checkGameOver();
}

function getEmoji(character) {
    switch (character) {
        case 'farmer':
            return '👨‍🌾';
        case 'wolf':
            return '🐺';
        case 'goat':
            return '🐐';
        case 'cabbage':
            return '🥬';
    }
}

function resetGame() {
    leftShore = ['farmer', 'wolf', 'goat', 'cabbage'];
    rightShore = [];
    boat = [];
    boatPosition = 'left';
    renderGame();
}

function checkGameOver() {
    let message = "";
    if ((leftShore.includes('wolf') && leftShore.includes('goat') && !leftShore.includes('farmer')) ||
        (rightShore.includes('wolf') && rightShore.includes('goat') && !rightShore.includes('farmer'))) {
        message = '¡El lobo se comió a la cabra! Juego Terminado.';
    } else if ((leftShore.includes('goat') && leftShore.includes('cabbage') && !leftShore.includes('farmer')) ||
        (rightShore.includes('goat') && rightShore.includes('cabbage') && !rightShore.includes('farmer'))) {
        message = '¡La cabra se comió la col! Juego Terminado.';
    } else if (rightShore.length === 4) { // Condición de victoria simplificada
        message = '¡Felicidades! Has cruzado con éxito el río.';
    }

    if (message) {
        // Usamos un pequeño delay para que el render se complete antes del alert
        setTimeout(() => {
            alert(message);
            resetGame();
        }, 100);
    }
}


renderGame();
