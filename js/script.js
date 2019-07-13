var ball = document.querySelector(".ball");
var player = document.querySelector(".player");
var gameMap = document.querySelector(".bloks");
var score = document.querySelector(".score");
var x;
var y;
var playerX;

var count = 0;
var resolutionX = true;
var resolutionY = true;
var statusGame = true;
var timer;
var blocks;
// каррта
var map = [
	[, , , , , , , , , , ],
	[, , , , , , , , , , ],
	[, , , , , , , , , , ],
	[, , , , , , , , , , ],
	[, , , , , , , , , , ],

];
var obj = {
    empty: "<div class=empty></div>",
    blok: "<div class=block></div>"
};



function removeBlock(el) {
    el.classList.add("empty");
    el.classList.remove("block");
    score.innerHTML = ++count;

};

function collision() {

    /// границы шара
    var ball_Left = ball.offsetLeft;
    var ball_Top = ball.offsetTop;
    var ball_Bottom = ball_Top + ball.offsetHeight;
    var ball_Right = ball_Left + ball.offsetWidth;

    // границы платформы
    var player_Left = player.offsetLeft;
    var player_Right = player_Left + player.offsetWidth;
    var player_Top = player.offsetTop;

    blocks = document.querySelectorAll(".block");

    for (let i = 0; i < blocks.length; i++) {


        /////границы блока

        var block_Left = blocks[i].offsetLeft;
        var block_Top = blocks[i].offsetTop;
        var block_Bottom = block_Top + blocks[i].offsetHeight;
        var block_Right = block_Left + blocks[i].offsetWidth;

        // коллизия сверху и снизу блока

        if (block_Left <= ball_Left &&
            block_Right >= ball_Right)
        // коллизия снизу блока
        {
            if (
                ball_Top <= block_Bottom &&
                ball_Bottom > block_Bottom
            ) {
                resolutionY = !resolutionY;
                removeBlock(blocks[i]);

            }
            // коллизия сверху блока
            else if (ball_Bottom >= block_Top &&
                ball_Bottom < block_Bottom
            ) {

                resolutionY = !resolutionY;
                removeBlock(blocks[i]);
            }
            // коллизия по бокам блока
        } else if (ball_Top >= block_Top && ball_Bottom <= block_Bottom) {
            // коллизия слевого края блока
            if (ball_Right >= block_Left && ball_Left < block_Left) {
                removeBlock(blocks[i]);
                resolutionX = !resolutionX;
                // коллизия справого края блока
            } else if (ball_Left <= block_Right && ball_Right > block_Right) {
                removeBlock(blocks[i]);
                resolutionX = !resolutionX;
            }


        }
    }
    if (!blocks.length) {
        alert("WIN");
        clearInterval(timer);
        statusGame = true;
    }
    // коллизия с платформой 

    if (ball_Right >= player_Left &&
        ball_Left <= player_Right &&
        ball_Bottom >= player_Top) {
        resolutionY = false;

    }
    // коллизия с платформой 
    if (ball_Bottom == 199) {
        alert("GAME OVER");
        count = 0;
        clearInterval(timer);
        statusGame = true;
        score.innerText = "";
    }


}

function startGame() {
    statusGame = false;
    // сброс карты 
    gameMap.innerHTML = "";
    // формирование карты 
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            map[i][j] = Math.round(Math.random());
            if (map[i][j]) {
                gameMap.innerHTML += obj.blok;
            } else {
                gameMap.innerHTML += obj.empty;
            }

        }

    }
    // нач координаты шара
    x = 200;
    y = 180;
    // нач координаты платформой
    playerX = 180;
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    // старт игры 
    timer = setInterval(moveBall, 10);
}

document.addEventListener("keydown", function (e) {

    switch (e.keyCode) {
        case 37:
            if (playerX > 0) {
                playerX -= 20;
            }
            break;
        case 39:
            if (playerX < 340) {
                playerX += 20;
            }
            break;
        case 32:
            if (statusGame == true) {
                startGame();
            }
            break;
    }

    player.style.left = playerX + "px";
})



function moveBall() {
    // коллизии со стенками карты
    if (resolutionX == true) {
        if (x >= 389) {
            resolutionX = false;
        }
        x++;
    }

    if (resolutionX == false) {
        if (x <= 0) {
            resolutionX = true;
        }
        x--;
    }

    if (resolutionY == true) {
        if (y >= 189) {
            resolutionY = false;
        }
        y++;
    }

    if (resolutionY == false) {
        if (y <= 0) {
            resolutionY = true;
        }
        y--;
    }
    // коллизии с блоками 
    collision();

    ball.style.left = x + "px";
    ball.style.top = y + "px";
};
