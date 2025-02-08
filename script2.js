class Connect4 {
    constructor() {
        this.board = Array(6).fill().map(() => Array(7).fill(null));
        this.playerTurn = 0;
        this.gameOver = false;
        this.createBoard();
    }

    createBoard() {
        const board = document.getElementById('board');
        board.innerHTML = '';

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.handleClick(col));
                board.appendChild(cell);
            }
        }
    }

    handleClick(col) {
        if (this.gameOver) return; // 🔴 Prevent clicks after game ends

        const row = this.getLowestEmptyRow(col);
        if (row === -1) return;

        this.board[row][col] = this.playerTurn;
        this.dropPiece(row, col);

        if (this.checkWin(row, col)) {
            this.endGame(this.playerTurn); // 🔴 Properly ends game
            return;
        }

        this.playerTurn = 1 - this.playerTurn;
    }

    getLowestEmptyRow(col) {
        for (let row = 5; row >= 0; row--) {
            if (this.board[row][col] === null) {
                return row;
            }
        }
        return -1;
    }

    dropPiece(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        if (!cell.querySelector('.piece')) {
            const piece = document.createElement('div');
            piece.className = `piece ${this.playerTurn === 0 ? 'red' : 'yellow'}`;
            
            piece.style.transform = 'translateY(-100px)';
            cell.appendChild(piece);

            setTimeout(() => {
                piece.style.transform = 'translateY(0)';
                piece.style.transition = 'transform 0.3s ease-in-out';
            }, 10);
        }
    }

    checkWin(row, col) {
        const player = this.board[row][col];
        const directions = [
            [0, 1],  // Horizontal 
            [1, 0],  // Vertical 
            [1, 1],  // Diagonal 
            [1, -1]  // Diagonal 
        ];

        for (let [dr, dc] of directions) {
            let count = 1;

            // Check forward direction
            count += this.countDirection(row, col, dr, dc, player);
            // Check backward direction
            count += this.countDirection(row, col, -dr, -dc, player);

            if (count >= 4) return true; 
        }

        return false;
    }

    countDirection(row, col, dr, dc, player) {
        let r = row + dr;
        let c = col + dc;
        let count = 0;

        while (r >= 0 && r < 6 && c >= 0 && c < 7 && this.board[r][c] === player) {
            count++;
            r += dr;
            c += dc;
        }

        return count;
    }

    endGame(winner) {
        this.gameOver = true; // 🔴 STOP GAME MOVES
        const status = document.getElementById('status');

        if (winner !== null) {
            status.textContent = `Player ${winner + 1} (${winner === 0 ? '🔴 Red' : '💛 Yellow'}) wins! 🎉`;
            this.createWinParticles(winner);
        } else {
            status.textContent = "It's a draw! 🤝";
        }
    }

    createWinParticles(winner) {
        const particles = document.getElementById('particles');
        particles.innerHTML = '';

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.backgroundColor = winner === 0 ? '#ff0000' : '#ffff00';
            particles.appendChild(particle);
        }
    }
}

let game = new Connect4();

function resetGame() {
    game = new Connect4();
    document.getElementById('status').textContent = '';
    document.getElementById('particles').innerHTML = '';
}
