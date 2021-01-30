const start = document.getElementById('start');
const help = document.getElementById('help');
const infoPlayer = document.getElementById('info_player');

let machineColors = [];
let playerColors = [];
let round = 0;

start.addEventListener('click', startGame)
help.addEventListener('click', showAlerte)


function showAlerte() {
    console.log('show')
    let help = document.getElementById('help');
    help.addEventListener('click', event => {
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
                '<i class="fa fa-thumbs-up"></i> Compris!',
            allowOutsideClick: false
        })
    })     
}

function lightColor(color = null) {
    if(color !== null) {
        var color = document.getElementById(color)
        color.style.opacity = '0.2'
        setTimeout(() => { color.style.opacity = '0.8'} , 1000);  
    }
}

function startGame() {
    console.log("start")
    start.classList.add('hidden')
    displayInfoPlayer('Au tour de l\'ordinateur')
    nextRound();
}

function displayInfoPlayer(texte) {
    console.log('display')
    infoPlayer.classList.remove('hidden')
    infoPlayer.innerText += texte

    Popper.createPopper(game, infoPlayer, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      })

}

function nextRound() {
    round++;

    const nextSuiteofColors = []
    nextSuiteofColors.push(nextColor());
}

function nextColor() {
    console.log('Next color')
    const colors = ['red', 'blue', 'yellow', 'green']
    const colorIs = colors[Math.floor(Math.random() * colors.length) ]

    return colorIs
}
//startGame()
//showAlerte()
//lightColor()
