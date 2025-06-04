const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let fruits = [];
let score = 0;
let lives = 3;
let lastSpawn = 0;
let spawnInterval = 1000; // ms
let gravity = 0.25;
let animationId;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnFruit() {
    const fruit = {
        x: random(50, canvas.width - 50),
        y: canvas.height + 20,
        r: 20,
        vx: random(-2, 2),
        vy: random(-12, -8),
        sliced: false
    };
    fruits.push(fruit);
}

function updateFruits(delta) {
    for (let i = fruits.length - 1; i >= 0; i--) {
        const f = fruits[i];
        f.vy += gravity;
        f.x += f.vx;
        f.y += f.vy;

        if (!f.sliced && f.y > canvas.height + f.r) {
            fruits.splice(i, 1);
            lives -= 1;
            if (lives <= 0) {
                endGame();
            }
            continue;
        }

        if (f.sliced) {
            fruits.splice(i, 1);
        }
    }
}

function drawFruits() {
    fruits.forEach(f => {
        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawScore() {
    document.getElementById('score').textContent = score;
}

function gameLoop(timestamp) {
    if (!lastSpawn) lastSpawn = timestamp;
    const delta = timestamp - lastSpawn;
    if (delta > spawnInterval) {
        spawnFruit();
        lastSpawn = timestamp;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateFruits(delta);
    drawFruits();
    drawScore();

    animationId = requestAnimationFrame(gameLoop);
}

function endGame() {
    cancelAnimationFrame(animationId);
    ctx.fillStyle = 'white';
    ctx.font = '48px sans-serif';
    ctx.fillText('Game Over', canvas.width / 2 - 120, canvas.height / 2);
}

function checkSlice(x, y) {
    for (let i = 0; i < fruits.length; i++) {
        const f = fruits[i];
        const dist = Math.hypot(f.x - x, f.y - y);
        if (dist < f.r && !f.sliced) {
            f.sliced = true;
            score += 1;
            return;
        }
    }
}

function handleMove(evt) {
    evt.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const posX = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
    const posY = (evt.touches ? evt.touches[0].clientY : evt.clientY) - rect.top;
    checkSlice(posX, posY);
}

canvas.addEventListener('mousemove', handleMove);
canvas.addEventListener('touchmove', handleMove, { passive: false });

requestAnimationFrame(gameLoop);
