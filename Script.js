const QUALITIES = [
    "Hai cambiato la mia vita",
    "...",
    "La tua risata è come un tramonto",
    "Sei la persona più bella che abbia mai visto",
    "Mi fai sorridere",
    "Sei incredibilmente intelligente",
    "Sei sensibile",
    "Hai un superpotere, quello di farmi stare bene",
    "Ogni tuo sorriso illumina la mia giornata",
    "Con te il tempo vola e resta eterno",
    "Il tuo abbraccio è il mio posto sicuro",
    "Sei la mia poesia preferita",
    "Mi perdo nei tuoi occhi ogni volta",
    "Stare con te è come respirare felicità",
    "Sei il mio piccolo miracolo quotidiano",
    "Ogni momento con te vale mille vite",
    "Mi rendi migliore",
    "Tu rendi speciale anche un giorno qualunque",
    "Sei il mio sogno che cammina accanto a me",
    "Ogni parola tua è musica per il cuore",
    "Con te anche il silenzio è dolce",
    "Sei il sole che scalda il mio inverno",
    "Ogni tuo gesto è magia pura",
    "Il mondo è più bello quando ci sei tu",
    "Ti penso e il cuore sorride",
    "Ogni tuo bacio è una promessa di felicità",
    "Con te ogni giorno è primavera",
    "Sei il mio porto tranquillo",
    "La tua voce è il mio suono preferito",
    "Ogni tuo sguardo è incantante",
    "Sei la mia costante felicità",
    "Il tuo sorriso batte ogni stella",
    "Con te mi sento a casa",
    "Ogni tuo pensiero è luce",
    "Sei il mio rifugio dai giorni grigi",
    "Ti amo più di ieri, meno di domani",
    "Il tuo cuore parla e io ascolto felice",
    "Sei il mio oggi e il mio sempre",
    "Ogni tuo abbraccio è un mondo intero",
    "Con te il buio diventa dolce",
    "Tu sei il mio tesoro",
    "Ogni tuo sguardo mi ferma il tempo",
    "Sei il mio sorriso nascosto nei giorni tristi",
    "Sei la più bella creazione di Dio",
    "Con te ogni strada è casa",
    "Sei il mio pensiero più bello",
    "Ogni tuo gesto è la cosa più valorosa che ci possa essere",
    "Tu rendi speciale ogni momento",
    "Sei la mia felicità in forma di persona",
    "Sei la più bella poesia che possa essere mai composta",
    "Con te il mondo ha più colori"
];

const heart = document.getElementById('mainHeart');
const heartNumber = document.getElementById('heartNumber');
const qualityText = document.getElementById('qualityText');
const rollButton = document.getElementById('rollButton');
const counter = document.getElementById('counter');

let isRolling = false;
let discoveredQualities = new Set();
let currentNumber = 1;

function setupBackground() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];

    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 10;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = Math.sin(this.x / canvas.width * Math.PI) * 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.rotation = Math.random() * Math.PI * 2;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            ctx.fillStyle = '#ff69b4';
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 4);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, 0, 0, this.size / 2);
            ctx.bezierCurveTo(this.size / 2, 0, this.size / 2, -this.size / 2, 0, -this.size / 4);
            ctx.fill();
            
            ctx.restore();
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.rotation += 0.01;

            if (this.y < -30) {
                this.y = canvas.height + 30;
                this.x = Math.random() * canvas.width;
            }
        }
    }

    for (let i = 0; i < 30; i++) {
        hearts.push(new Heart());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach(h => {
            h.update();
            h.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Funzione per generare numero con probabilità personalizzata
function getRandomNumberWithProbability() {
    const rand = Math.random();
    
    // Numero 2 ha probabilità 0.001(10%)
    if (rand < 0.001) {
        return 2;
    }
    
    // Gli altri numeri (1, 3-50) condividono il rimanente 90%
    const remainingNumbers = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                             21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 
                             39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    return remainingNumbers[randomIndex];
}

function rollDice() {
    if (isRolling) return;

    isRolling = true;
    rollButton.disabled = true;

    heart.classList.remove('pulse', 'glitter');
    
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        currentNumber = Math.floor(Math.random() * 50) + 1;
        heartNumber.textContent = currentNumber;
        rollCount++;

        if (rollCount > 20) {
            clearInterval(rollInterval);
        }
    }, 50);

    setTimeout(() => {
        currentNumber = getRandomNumberWithProbability();
        heartNumber.textContent = currentNumber;
        
        heart.classList.add('pulse', 'glitter');
        
        setTimeout(() => {
            showResults(currentNumber);
            isRolling = false;
            rollButton.disabled = false;
        }, 800);
    }, 1000);
}

function showResults(number) {
    const quality = QUALITIES[number - 1];
    qualityText.textContent = `✨ "${quality}" ✨`;
    
    discoveredQualities.add(number);
    counter.textContent = discoveredQualities.size;
}

rollButton.addEventListener('click', rollDice);
heart.addEventListener('click', rollDice);

window.addEventListener('load', () => {
    setupBackground();
    showResults(1);
});