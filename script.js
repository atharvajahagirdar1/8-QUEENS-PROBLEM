let queenCount = 0;
        const board = [];
        const chessboard = document.getElementById("chessboard");

        for (let row = 0; row < 8; row++) {
            board[row] = [];
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", () => placeQueen(row, col));
                chessboard.appendChild(cell);
                board[row][col] = 0;
            }
        }

        function placeQueen(row, col) {
            if (queenCount >= 8 && board[row][col] === 0) {
                document.getElementById("status").textContent = "⚠ Only 8 queens allowed!";
                return;
            }
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (board[row][col] === 0) {
                cell.innerHTML = "♛";
                cell.classList.add("queen");
                board[row][col] = 1;
                queenCount++;
                document.getElementById("status").textContent = "";
            } else {
                cell.innerHTML = "";
                cell.classList.remove("queen");
                board[row][col] = 0;
                queenCount--;
            }
            checkGameStatus();
        }

        function checkGameStatus() {
            if (queenCount === 8) {
                if (isValidSolution()) {
                    document.getElementById("status").textContent = "🎉 Congratulations! You solved the 8 Queens Puzzle correctly!";
                } else {
                    document.getElementById("status").textContent = "❌ Incorrect placement. Try again!";
                }
            }
        }

        function isValidSolution() {
            let positions = [];
            document.querySelectorAll(".queen").forEach(cell => {
                positions.push([parseInt(cell.dataset.row), parseInt(cell.dataset.col)]);
            });
            for (let i = 0; i < positions.length; i++) {
                for (let j = i + 1; j < positions.length; j++) {
                    let [r1, c1] = positions[i];
                    let [r2, c2] = positions[j];
                    if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                        return false;
                    }
                }
            }
            return true;
        }

        function resetBoard() {
            document.getElementById("status").textContent = "";
            queenCount = 0;
            board.forEach((row, r) => row.forEach((_, c) => {
                const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                cell.innerHTML = "";
                cell.classList.remove("queen");
                board[r][c] = 0;
            }));
        }