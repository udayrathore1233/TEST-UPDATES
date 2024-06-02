// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images with error handling
const headImg = new Image();
const bodyImg = new Image();
const foodImg = new Image();

headImg.src = 'images/head.png';
bodyImg.src = 'images/body.png';
foodImg.src = 'images/food.png';

headImg.onload = () => console.log('Head image loaded');
bodyImg.onload = () => console.log('Body image loaded');
foodImg.onload = () => console.log('Food image loaded');

headImg.onerror = () => console.error('Failed to load head image');
bodyImg.onerror = () => console.error('Failed to load body image');
foodImg.onerror = () => console.error('Failed to load food image');

const box = 20;
let snake = [];
snake[0] = { x: 7 * box, y: 7 * box };

let food = {
    x: Math.floor(Math.random() * 15) * box,
    y: Math.floor(Math.random() * 15) * box
};

let score = 0;
let d;

document.addEventListener('keydown', direction);
document.getElementById('upBtn').addEventListener('touchstart', () => direction({ keyCode: 38 }));
document.getElementById('downBtn').addEventListener('touchstart', () => direction({ keyCode: 40 }));
document.getElementById('leftBtn').addEventListener('touchstart', () => direction({ keyCode: 37 }));
document.getElementById('rightBtn').addEventListener('touchstart', () => direction({ keyCode: 39 }));

document.getElementById('upBtn').addEventListener('click', () => direction({ keyCode: 38 }));
document.getElementById('downBtn').addEventListener('click', () => direction({ keyCode: 40 }));
document.getElementById('leftBtn').addEventListener('click', () => direction({ keyCode: 37 }));
document.getElementById('rightBtn').addEventListener('click', () => direction({ keyCode: 39 }));

function direction(event) {
    const key = event.keyCode;
    if (key === 37 && d !== 'RIGHT') {
        d = 'LEFT';
    } else if (key === 38 && d !== 'DOWN') {
        d = 'UP';
    } else if (key === 39 && d !== 'LEFT') {
        d = 'RIGHT';
    } else if (key === 40 && d !== 'UP') {
        d = 'DOWN';
    }
}

function collision(newHead, array) {
    for (let i = 0; i < array.length; i++) {
        if (newHead.x === array[i].x && newHead.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            if (headImg.complete && headImg.naturalWidth !== 0) {
                ctx.drawImage(headImg, snake[i].x, snake[i].y, box, box);
            } else {
                ctx.fillStyle = 'green';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
        } else {
            if (bodyImg.complete && bodyImg.naturalWidth !== 0) {
                ctx.drawImage(bodyImg, snake[i].x, snake[i].y, box, box);
            } else {
                ctx.fillStyle = 'lime';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }
        }
    }

    if (foodImg.complete && foodImg.naturalWidth !== 0) {
        ctx.drawImage(foodImg, food.x, food.y, box, box);
    } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 15) * box,
            y: Math.floor(Math.random() * 15) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over');
    }

    snake.unshift(newHead);

    ctx.fillStyle = 'black';
    ctx.font = '45px Changa one';
    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
