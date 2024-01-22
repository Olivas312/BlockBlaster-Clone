document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('tetris-grid');
    let squares = Array.from({ length: 200 }, () => document.createElement('div'));
    let currentPosition = 4;
    let currentRotation = 0;
    const width = 10;
    const tetrominoes = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width, width + 1, width + 2],
        [width, width + 1, width * 2 + 1, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 3 + 1]
    ];

    function draw() {
        tetrominoes[currentRotation].forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        });
    }

    function undraw() {
        tetrominoes[currentRotation].forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        });
    }

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = tetrominoes[currentRotation].some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -= 1;
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = tetrominoes[currentRotation].some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        draw();
    }

    function rotate() {
        undraw();
        currentRotation = (currentRotation + 1) % tetrominoes.length;
        draw();
    }

    function freeze() {
        if (tetrominoes[currentRotation].some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            tetrominoes[currentRotation].forEach(index => squares[currentPosition + index].classList.add('taken'));
            newTetromino();
        }
    }

    function newTetromino() {
        currentPosition = 4;
        currentRotation = 0;
        const random = Math.floor(Math.random() * tetrominoes.length);
        tetrominoes[random].forEach(index => squares[currentPosition + index].classList.add('tetromino'));
    }

    function gameOver() {
        if (squares.some(square => square.classList.contains('taken') && square.classList.contains('tetromino'))) {
            alert('Game Over!');
            document.location.reload();
        }
    }

    newTetromino();
    draw();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            rotate();
        } else if (e.key === 'ArrowDown') {
            moveDown();
        } else if (e.key === 'ArrowLeft') {
            moveLeft();
        } else if (e.key === 'ArrowRight') {
            moveRight();
        }
    });

    setInterval(() => {
        moveDown();
        gameOver();
    }, 1000);
});