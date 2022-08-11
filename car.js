
const score = document.querySelector(".score");
const startScreen = document.querySelector(".start-screen");

const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressDown);
document.addEventListener("keyup", pressUp);

let player = { speed: 5, score: 0 };



// testing branchng in git

let keys = {
  ArrowNonence:'continue',
  ArrowLeft: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowUp: false,
};

function moveLines() {
  let line = document.querySelectorAll(".lines");

  line.forEach((line) => {
    // we want loop through the line object

    // we need to have a variable for itrs y postion

    console.log(line.y);
    if (line.y > 750) {
      line.y -= 750;
    }
    line.y += player.speed;
    line.style.top = line.y + "px";
  });
}


function endGame(){
    
    player.start=false;
 
    score.innerText=`score was ${player.score} and Game is over`;

    // we want  to start our gameover when we hit collision



    startScreen.classList.remove('hide');
    player.score=0;
    startScreen.innerText='Restart'
  


    // implementation of local storage
}

// this function is going to help move our obstacles on the way

function moveObstacles(car) {
  let obs = document.querySelectorAll(".obstacle");

  obs.forEach((obs) => {
    // we want loop through the line object

    // we need to have a variable for itrs y postion

    // check for colision
    if(collisionDetection(car, obs)){
        

        // this function is going to end oour game
        endGame();
    }

    console.log(obs.y);
    if (obs.y >= 1500) {
      obs.y -= 600; 
      obs.style.left = Math.floor(Math.random() * 150) + "px";
    }
    obs.y += player.speed;
    obs.style.top = obs.y + "px";
  });
}



// this  functon is going  to detect whether there is a collision taking place between the player and the enemies(other cars) our function is going to take two params a and b 
// and check for collision as follows


function collisionDetection(a,b){


    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();

    // we want to return false from our function if the cars overlapp

    return !(
        (aRect.bottom < bRect.top)||(aRect.top > bRect.bottom) || (aRect.right< bRect.left) || (aRect.left>bRect.right)
    );

}

function playGame() {
  // select our car class we just created from html

  let car = document.querySelector(".car");
  moveLines();
  moveObstacles(car);
  
  let road = gameArea.getBoundingClientRect();

  // the getBoundingClientRect() method returns the size of an element and its position relative to the viewport, in x, y, width, height, with values

  console.log(road);
  console.log(player.x);
  if (player.start) {
    if (keys.ArrowUp && player.y > road.top - 450) {
      player.y -= player.speed;
      //  increase the y coordinates
    }
    if (keys.ArrowDown && player.y < road.bottom + 100) {
      player.y += player.speed;
      //  decrease the y coordinates
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
      //  decrease the x coordinates
    }
    if (keys.ArrowRight && player.x < road.width - 50) {
      player.x += player.speed;
      //  increase the x coordinates
    }

    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
    // console.log(player.y)

    // the values of player x a nd y are added to our object playe using offsetLeft and offsetTop in the start function

    window.requestAnimationFrame(playGame);

    player.score++;
    score.innerText=`the score is ${player.score} `
  }
}

//  start is a very impportant function here
function start() {
  // we want the startScreen to be hidden when we click the start btn
  startScreen.classList.add("hide");

  // And we want the gameScreen or gameArea to be display when we click the start btn
  gameArea.classList.remove("hide");
  
  score.innerText=player.score
  gameArea.innerHTML="";
  player.start = true;
  // we want playGame to be invoke when we click the start button
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");

  car.innerText = "my car";

  // and we want to append this to the gameArea
  car.setAttribute("class", "car");

  gameArea.appendChild(car);

  for (var i = 0; i <= 5; i++) {
    let lines = document.createElement("div");
    lines.classList.add("lines");
    lines.y = i * 150;
    lines.style.top = (i * 150) + "px";

    gameArea.appendChild(lines);
  }

  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  console.log(player);

  // this is how our object looks like speed: 5
  // {start: true
  // x: 300, speed:5,
  // y: 512}

  // this code is responsible for creating little obstacle cars(randomly in our game)

  for (var i = 0; i <= 3; i++) {
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    // set their position to be random and out of the screen, so that should bump or come into the screen but later
    // obstacle.y=Math.floor(Math.random()*500)*-1;
    obstacle.y = (i + 1) * 600 * -1;
    obstacle.style.top = obstacle.y + "px";
    obstacle.style.left = Math.floor(Math.random() * 150) + "px";
    obstacle.style.backgroundColor = "black";

    gameArea.appendChild(obstacle);
  }
}

function pressDown(e) {
  e.preventDefault();
  keys[e.key] = true;
  console.log(keys);
}

function pressUp(e) {
  e.preventDefault();
  keys[e.key] = false;
  console.log(keys);
}
