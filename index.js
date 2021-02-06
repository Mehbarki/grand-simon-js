const start = document.getElementById('start');
const help = document.getElementById('help');
const infoPlayer = document.getElementById('info_player');
const infoStat = document.getElementById('stat_player');
const simon = document.getElementById('simon');
const restart = document.getElementById('restart');

let machineColors = [];
let playerColors = [];
let round = 0;
let countColorTap = 0;
let speed = 600; //millisecondes

help.addEventListener('click', helpGame);
start.addEventListener('click', startGame);
restart.addEventListener('click', restartGame);
simon.addEventListener('click', event => {
    console.log('Human click');
    const colorHuman = event.target.id;

    if(colorHuman) {
        playerColors.push(colorHuman);
        console.log(playerColors);
        lightColor(colorHuman);
        checkSuiteofColors(colorHuman);
        countColorTap++
    }
});

function checkSuiteofColors(colorHuman) {
    const index = playerColors.length - 1;
    console.log(machineColors);
    if (playerColors[index] !== machineColors[index]) {
        gameOver();
        return;
    }

    if( machineColors.length === playerColors.length) {
        playerColors = [];
        infoPlayer.innerText = '';
        displayInfoPlayer('Round validé ! Passez au prochain !');

        setTimeout(() => {
            nextRound();
        }, 1000);

        return;
    }
}

function gameOver() {
    console.log("game Over");
    Swal.fire({
        title: 'Game Over ! Voulez vous rejouer ?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: `Rejouer`,
        cancelButtonText: 'Quitter',
        allowOutsideClick: false,
        text: 'Round(s): ' + round + ' | Couleur(s) tapée(s): ' + countColorTap 

    }).then((result) => {
        if (result.isConfirmed) {
            restartGame();
        } else {
            console.log('okok');
            Swal.fire({
                    title: 'Merci d\'avoir participé !',
                    showConfirmButton: false,
                    timer: 300,
                    });
            resetGame();
        }
    });
}

function resetGame() {
    console.log('resetGame');
    machineColors = [];
    playerColors = [];
    round = 0;
    countColorTap = 0;
    speed = 600;
    start.classList.remove('hidden');
    infoPlayer.classList.add('hidden');
    infoStat.classList.add('hidden');
}

function restartGame() {
    console.log("restart");
    resetGame();
    Swal.fire({
        title: 'Restart !',
        icon: 'success',
        timer: 300,
        showConfirmButton: false,
    });
    setTimeout(() => {
        startGame();
    }, 1000);
}

function helpGame(event) {
        event.preventDefault;
        Swal.fire({
            title: '<strong>Règle du <u>Grand Simon</u></strong> </br>',
            icon: 'info',
            html:
                'START pour commencer une partie. </br> ' +
                'RESTART pour recommer en partie </br>' +
                '<h3>Etape 1 : </h3>' +
                'A chaque tour, l\'ordinateur éclaire de manière aléatoire une couleur et produit un son associée a cette couleur. </br>' +
                '<h3>Etape 2 : </h3>' +
                'Vous devez alors appuyez sur la case de la couleur qui vient de s\'allumer dans délai assez court.' +
                '<h3>Etape 3 :</h3>' + 
                'A chaque couleur valide, l\'ordinateur ajoute une nouvelle couleur. </br>' +
                'Le but du jeu étant de reproduire la plus longue suite de couleurs',
            showCloseButton: true,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Compris !',
            allowOutsideClick: false
    });
    console.log('show');    
}

function lightColor(color = null) {
    console.log('ligh color');
    if(color !== null) {
        var color = document.getElementById(color);
        color.style.opacity = '0.2';
        setTimeout(() => { color.style.opacity = '0.8'} , 300);  
    }
}

function startGame() {
    console.log("start");
    start.classList.add('hidden');
    restart.style.display = 'block';
    simon.style.pointerEvents = 'auto';
    infoPlayer.innerText = ''
    displayInfoPlayer('Au tour de l\'ordinateur');
    nextRound();
}

function nextRound() {
    infoPlayer.innerText = '';
    infoStat.innerText = '';
    displayInfoPlayer('Au tour de l\'ordinateur');
    displayStatPlayer('Round(s): ' + round + ' | Couleur(s) tapée(s): ' + countColorTap);
    console.log('Next round');
    round++;

    const nextMachineColors = [...machineColors];
    nextMachineColors.push(nextColor());
    machineRound(nextMachineColors);

    machineColors = [...nextMachineColors];
   
    setTimeout(() => {
        playerRound(round, machineColors.length);
    }, (machineColors.length + 1) * speed);
}

function nextColor() {
    console.log('Next color');
    const colors = ['red', 'blue', 'yellow', 'green', 'pink', 'orange'];
    const colorIs = colors[ Math.floor(Math.random() * colors.length) ];

    return colorIs;
}

function machineRound(nextMachineColors) {
    console.log("Machine round");
    if( round < 8 ) {
        speed -= 35;
    }
    nextMachineColors.forEach((color, index) => {
        setTimeout(() => {
            lightColor(color);
        }, (index + 1) * speed);
    });
}

function displayInfoPlayer(texte) {
    console.log('display');
    infoPlayer.classList.remove('hidden');
    infoPlayer.innerText += texte;

    Popper.createPopper(game, infoPlayer, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
    });
}

function displayStatPlayer(texte) {
    console.log('displayStat');
    infoStat.classList.remove('hidden');
    infoStat.innerText += texte;

    Popper.createPopper(infoPlayer, infoStat, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
    });
}

function playerRound() {
    console.log('Player ROUND');
    infoPlayer.innerText = '';
    displayInfoPlayer('A votre tour');
}
