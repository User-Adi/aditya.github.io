document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

 window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + window.innerHeight / 3;

     sections.forEach(section => {
         if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
             document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
           });
            const activeLink = document.querySelector(`nav a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});




// JavaScript for toggling the navigation menu
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
});


const board = document.getElementById('board');
        const statusText = document.getElementById('status');
        let cells = document.querySelectorAll('.cell');
        let currentPlayer = 'X';
        let gameState = Array(9).fill(null);

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    statusText.innerText = `Player ${currentPlayer} Wins!`;
                    board.classList.add('disabled');
                    return true;
                }
            }
            if (!gameState.includes(null)) {
                statusText.innerText = 'Match is Tie!';
                return true;
            }
            return false;
        }

        function handleClick(event) {
            const index = event.target.getAttribute('data-index');
            if (!gameState[index] && !board.classList.contains('disabled')) {
                gameState[index] = currentPlayer;
                event.target.innerText = currentPlayer;
                if (!checkWinner()) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    statusText.innerText = `Player ${currentPlayer}'s Turn`;
                }
            }
        }

        function resetGame() {
            gameState.fill(null);
            cells.forEach(cell => cell.innerText = '');
            statusText.innerText = 'Player X\'s Turn';
            currentPlayer = 'X';
            board.classList.remove('disabled');
        }

        cells.forEach(cell => cell.addEventListener('click', handleClick));
        resetGame();