document.addEventListener("DOMContentLoaded", function () {

    const circles = document.querySelectorAll(".circle");
    const startButton = document.querySelector(".start-game button:first-child");
    const cashOutButton = document.querySelector(".start-game button:last-child");
    // const gameContent = document.querySelector(".game-content");
    const currentWinnings = document.querySelector(".game span");
    const walletAmount = document.querySelector(".wallet");

    let winnings = 0;
    let gameStarted = false;
    let totalMines = 0;
    let betAmount = 0;

    // taking input from the user
    const minesInput = document.querySelector("#mineNumber");
    const betInput = document.querySelector("#betAmount");

    // store mine positions
    let mineIndices = [];
    function assignMines() {

        const indices = Array.from({ length: circles.length }, (_, i) => i);
        for (let i = 0; i < totalMines; i++) {
            const rand = Math.floor(Math.random() * indices.length);
            mineIndices.push(indices[rand]);
            // Remove the selected index so the same mine position isn't chosen again
            indices.splice(rand, 1);
        }
    }

    // add image for bomb
    const bombImage = document.createElement("div");
    bombImage.className = "bomb";
    bombImage.src = "bomb.svg";
    bombImage.style.backgroundsize = 'cover'
    bombImage.style.width = "100%";
    bombImage.style.height = "100%";


    const gemImage = document.createElement("div");
    gemImage.className = "gem";
    gemImage.src = "gem.svg";
    gemImage.style.backgroundsize = 'cover'
    gemImage.style.width = "100%";
    gemImage.style.height = "100%";


    startButton.addEventListener("click", () => {
        // Get input values from .game-settings-item container
        totalMines = minesInput.value;
        betAmount = betInput.value;
        betAmount = parseFloat(betAmount);

        //Randomely assign mines
        assignMines();
        gameStarted = true;
        winnings = 0;
        currentWinnings.textContent = `Current Winnings: $${winnings}`;
        if (totalMines < 1 || totalMines >= circles.length) {
            alert("Invalid number of mines. Please enter a number between 1 and 24.");
            return;

        }
        if (betAmount <= 0 ) {
            alert("Invalid betting amount. Please enter a number greater than 0.");
            return;}
        
        circles.forEach(circle => {
            circle.addEventListener("click", handleCircleClick);

        });
    });
    let walletAmt = 0;
    walletAmount.textContent = `Wallet Amount: $${walletAmt}`;
    cashOutButton.addEventListener("click", () => {
        if (gameStarted) {
            walletAmt += winnings;
            walletAmount.textContent = `Wallet Amount: $${walletAmt}`;

            alert(`You cashed out with $${winnings}`);
            gameStarted = false;
            winnings = 0;

            resetGame(0);
        } else {
            alert("Game not started yet!");
        }
    }
    );

    function resetGame(time) {
        setTimeout(() => {
            // Reset mine positions and circle colors
            mineIndices = [];
            circles.forEach(circle => {
                circle.style.backgroundColor = "";
            });
            winnings = 0;
            currentWinnings.textContent = `Current Winnings: $${winnings}`;
            document.getElementById("mineNumber").value = 0;
            document.getElementById("betAmount").value = 0;

        }, time);
    }



    // Handle circle click
    function handleCircleClick(event) {
        if (!gameStarted) return;

        const index = Array.from(circles).indexOf(event.target);
        const isMine = mineIndices.includes(index);
        if (isMine) {
            event.target.style.backgroundColor = "red";
            mineIndices.forEach(i => {
                circles[i].style.backgroundColor = "red";
            });
            winnings = 0;
            alert("Boom! you hit a mine");
            gameStarted = false;
            circles.forEach(circle => circle.removeEventListener("click", handleCircleClick));

            // autoreset game after 3 seconds
            resetGame(3000);


        }
        else {
            event.target.style.backgroundColor = "green";
            winnings += betAmount; // Increment winnings by bet amount
            currentWinnings.textContent = `Current Winnings: $${winnings}`;

        }
    }


});
