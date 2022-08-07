alert('ok')
const score=document.querySelector('.score')
const startScreen=document.querySelector('.start-screen')

const gameArea=document.querySelector('.gameArea')


startScreen.addEventListener('click', start)
document.addEventListener('keydown',pressDown)
document.addEventListener('keyup', pressUp)

let player={speed:5};


let keys = { ArrowLeft: false, ArrowDown: false, ArrowRight: false,ArrowUp:false };

function moveLines(){

    let line=document.querySelectorAll('.lines')

    line.forEach(line=>{
        // we want loop through the line object

        // we need to have a variable for itrs y postion
  
console.log(line.y);
if(line.y>750){
    line.y-=750
}
line.y+=player.speed;
line.style.top=line.y+'px'

    })
}

// this function is going to help move our obstacles on the way

function moveObstacles(){
    let obs=document.querySelectorAll('.obstacle')

    obs.forEach(obs=>{
        // we want loop through the line object

        // we need to have a variable for itrs y postion
  
console.log(obs.y);
if(obs.y>1500){
    obs.y-=1500 
    obs.style.left=Math.floor(Math.random()*150)+ 'px'
}
obs.y+=player.speed;
obs.style.top=obs.y+'px'

    })
}



function playGame(){

    // select our car class we just created from html
    

    let car=document.querySelector('.car')
    moveLines()
    moveObstacles();
let road=gameArea.getBoundingClientRect()

// the getBoundingClientRect() method returns the size of an element and its position relative to the viewport, in x, y, width, height, with values

console.log(road)
console.log(player.x)
    if(player.start){
       if (keys.ArrowUp && player.y>(road.top -450)) {
         player.y -= player.speed;
        //  increase the y coordinates
       }
       if (keys.ArrowDown && player.y<(road.bottom + 100) ) {
         player.y += player.speed;
        //  decrease the y coordinates
       }
       if (keys.ArrowLeft && player.x>0) {
         player.x -= player.speed;
        //  decrease the x coordinates
       }
       if (keys.ArrowRight && player.x<(road.width-50)) {
         player.x += player.speed;
        //  increase the x coordinates
       }

       car.style.left=player.x+'px'
       car.style.top=player.y+'px'
// console.log(player.y)

// the values of player x a nd y are added to our object playe using offsetLeft and offsetTop in the start function

        window.requestAnimationFrame(playGame);

    }

}

//  start is a very impportant function here
function start(){
    // we want the startScreen to be hidden when we click the start btn
    startScreen.classList.add('hide')

    // And we want the gameScreen or gameArea to be display when we click the start btn
    gameArea.classList.remove('hide')
    console.log(player.start)
    player.start=true;
    // we want playGame to be invoke when we click the start button
    window.requestAnimationFrame(playGame);
    let car= document.createElement("div");

    car.innerText='my car'

    // and we want to append this to the gameArea
    car.setAttribute('class','car');

    gameArea.appendChild(car);

    for(var i=0;i<=5;i++){
let lines=document.createElement('div')
lines.classList.add('lines')
lines.y=i*150;
lines.style.top=(i*150) + 'px'

gameArea.appendChild(lines)
    }

    player.x=car.offsetLeft;
    player.y=car.offsetTop
    console.log(player)

    // this is how our object looks like speed: 5
// {start: true
// x: 300, speed:5,
// y: 512}

    

// this code is responsible for creating little obstacle cars(randomly in oujr game)

 
for(var i=0;i<=3;i++){
    let obstacle=document.createElement('div')
    obstacle.classList.add('obstacle')

    // set their position to be random and out of the screen, so that should bump or come into the screen but later
    // obstacle.y=Math.floor(Math.random()*500)*-1;
    obstacle.y=((i+1)*600)*-1;
    obstacle.style.top=obstacle.y + 'px'
    obstacle.style.left=Math.floor(Math.random()*150) + 'px'
    obstacle.style.backgroundColor='black';
    
    gameArea.appendChild(obstacle)
        }

}

function pressDown(e){
    e.preventDefault();
    keys[e.key]=true
    console.log(keys)
}

function pressUp(e){
    e.preventDefault();
    keys[e.key]=false
    console.log(keys)
}