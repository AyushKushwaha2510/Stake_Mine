document.addEventListener("DOMContentLoaded", function () {

    const circles = document.querySelectorAll(".circle");
    const startButton = document.querySelector(".start-game button:first-child");
    const cashOutButton = document.querySelector(".start-game button:last-child");
    // const gameContent = document.querySelector(".game-content");
    const currentWinnings = document.querySelector(".game span");
    const walletAmount = document.querySelector(".wallet");
    const startPage = document.querySelector(".start button:last-child");

    let winnings = 0;
    let gameStarted = false;
    let totalMines = 0;
    let betAmount = 0;


    // add image for bomb
    // Create a bomb image element using bomb.svg);
    const bomb = document.createElement("img");
    bomb.src = "bomb.svg";
    bomb.alt = "Bomb";
    bomb.style.width = "80%";
    bomb.style.height = "80%";
    bomb.style.objectFit = "cover";
    bomb.style.display = "block";
    bomb.style.margin = "5px";

    // Create a gem image
    const gem = document.createElement("img");
    gem.src = "gem.svg";
    gem.alt = "gem";
    gem.style.width = "80%";
    gem.style.height = "80%";
    gem.style.objectFit = "cover";
    gem.style.display = "block";
    gem.style.margin = "5px";
    gem.style.marginBottom = "0px";


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



    startPage.addEventListener("click", () => {
        setTimeout(() => {
            let audio2 = new Audio('gta-san-andreas-theme-song-best-quality-audiotrimmer-com-57738.mp3');
            audio2.loop = true;
            audio2.volume = 0.5;
            audio2.play().catch(err => {
                console.warn("Theme playback failed:", err.message);
            });
        }, 12000);

        // //preloader
        // const preloader = document.createElement("div");
        // preloader.style.position = "fixed";
        // preloader.style.bottom = "0";
        // preloader.style.left = "0";
        // preloader.style.width = "100vw";
        // preloader.style.height = "100vh";
        // preloader.style.background = "#1c1c1c";
        // preloader.style.display = "flex";
        // preloader.style.alignItems = "center";
        // preloader.style.justifyContent = "center";
        // preloader.style.zIndex = "50";

        // const preloaderText = document.createElement("span");
        // preloaderText.style.position = "fixed";
        // preloaderText.style.bottom = "30px";
        // preloaderText.style.left = "0";
        // preloaderText.style.width = "100vw";
        // preloaderText.style.height = "20vh"
        // preloaderText.style.background = "#1c1c1c";
        // preloaderText.style.display = "flex";
        // preloaderText.style.alignItems = "center";
        // preloaderText.style.justifyContent = "center";
        // preloaderText.style.zIndex = "500";
        // preloaderText.innerHTML = "<span style='font-size:2rem;font-weight:bold;color:#5f5f5f;font-family:sans-serif;letter-spacing:1px;'>Welcome to Stake Mine!<br>Get ready for an exciting adventure... 🚀</span>";
        // preloaderText.innerHTML.zIndex = "3355";
        // preloader.appendChild(preloaderText);

        // const preloaderImg = document.createElement("img");
        // preloaderImg.src = "Shakuni-Blog.jpg"; 
        // preloaderImg.alt = "Loading...";
        // preloaderImg.style.width = "50%";
        // preloaderImg.style.height = "40%";
        // preloader.appendChild(preloaderImg);

        // document.body.appendChild(preloader);

        setTimeout(() => {
            preloader.remove();
            pre
        }, 12000); // Remove preloader after 2 seconds

        let audio = new Audio('disclaimer.mp3');
        audio.play()
        const temp = document.querySelector(".start");
        temp.remove();


    });

    startButton.addEventListener("click", () => {
        // Get input values from .game-settings-item container
        totalMines = minesInput.value;
        betAmount = betInput.value;
        betAmount = parseFloat(betAmount);

        let box1 = document.querySelector("#mineNumber");
        box1.style = "none";
        let box2 = document.querySelector("#betAmount");
        box2.style = "none";
        //Randomely assign mines
        if (totalMines < 1 || totalMines >= circles.length) {
            alert("Invalid number of mines. Please enter a number between 1 and 24.");

            box1.style.backgroundColor = "red";
            return;

        }
        if (betAmount <= 0) {
            alert("Invalid betting amount. Please enter a number greater than 0.");

            box2.style.backgroundColor = "red";
            return;
        }

        let temp = document.querySelector(".temp"); // is it necessary to use if(temp) ?
        temp.style.display = "none";
        // let audio = new Audio('disclaimer.mp3');
        // audio.play()
        // let audio2 = new Audio('gta-san-andreas-theme-song-best-quality-audiotrimmer-com-57738.mp3');
        // audio2.play();
        // audio2.loop = true;

        assignMines();
        gameStarted = true;
        winnings = 0;
        currentWinnings.textContent = `Current Winnings: $${winnings}`;

        circles.forEach(circle => {
            circle.addEventListener("click", handleCircleClick);

        });
    });


    let walletAmt = 0;
    walletAmount.textContent = `Wallet Amount: $${walletAmt}`;
    cashOutButton.addEventListener("click", () => {
        if (gameStarted) {
            let audio = new Audio('win.mp3');
            audio.play();
            audio.volume = 1;
            walletAmt += winnings;
            walletAmount.textContent = `Wallet Amount: $${walletAmt}`;
            resetGame(3000);


            alert(`You cashed out with $${winnings}`);
            gameStarted = false;
        } else {
            alert("Game not started yet!");
        }

    }
    );

    function resetGame(time) {
        setTimeout(() => {
            circles.forEach(circle => {
                // Remove any child elements (bomb/gem icons)
                while (circle.firstChild) {
                    circle.removeChild(circle.firstChild);
                }
                circle.style.backgroundColor = "";
            });
            // Reset mine positions and circle colors
            mineIndices = [];
            circles.forEach(circle => {
                circle.style.backgroundColor = "";
            });
            winnings = 0;
            currentWinnings.textContent = `Current Winnings: $${winnings}`;
            document.getElementById("mineNumber").value = 0;
            document.getElementById("betAmount").value = 0;
            totalMines = minesInput.value;
            betAmount = betInput.value;
            betAmount = parseFloat(betAmount);
            let temp = document.querySelector(".temp");
            temp.style.display = "";



        }, time);
    }



    // Handle circle click
    function handleCircleClick(event) {
        if (!gameStarted) return;

        const index = Array.from(circles).indexOf(event.target);
        const isMine = mineIndices.includes(index);
        if (isMine) {
            let audio = new Audio('चेतावनी दी थी अब हार.mp3');
            audio.play();
            audio.volume = 0.75;
            event.target.style.backgroundColor = "#262626";
            mineIndices.forEach(i => {
                circles[i].style.backgroundColor = "#262626";
                const bombClone = bomb.cloneNode(true);
                circles[i].appendChild(bombClone);

            })
            // mineIndices.forEach(i => {
            //     // Remove the circle and insert a bomb image in its place
            //     const bombClone = bomb.cloneNode(true);
            //     circles[i].replaceWith(bombClone);
            // });

            resetGame(4000);
            alert("Boom! you hit a mine");
            let audio2 = new Audio('super-mario-death-sound-sound-effect.mp3');
            audio2.currentTime = 0.5;
            audio2.volume = 1;
            audio2.play();
            // autoreset game after 3 seconds
            circles.forEach(circle => circle.removeEventListener("click", handleCircleClick));
            gameStarted = false;


        }
        else {
            event.target.style.backgroundColor = "#262626";
            const gemClone = gem.cloneNode(true);
            event.target.appendChild(gemClone);
            winnings += betAmount; // Increment winnings by bet amount
            currentWinnings.textContent = `Current Winnings: $${winnings}`;
            let audio2 = new Audio('super-mario-coin-sound.mp3');
            // audio2.currentTime = 0.5; 
            audio2.play();

        }
    }


});
