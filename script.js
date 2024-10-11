function rules(){
    let rule = document.querySelector("#blockrules");
    rule.style.display = "none";
}
let scoreshow = document.querySelector("#scoreshow")
let slider = document.querySelector(".slider");
let val = document.querySelector("#Value");
let number = document.querySelector("#numbers")
let difficulty = 5;
let failedclick=0;
let score=0;
let checkclick=0;
let randomnum =11;
let constdiff=5000;
let starcik=0;
let interval=0;
let hasseven=0;
function showx(){
    let fails = document.querySelectorAll(".x");
    switch(failedclick){
        case 0:
            fails[0].style.display= "none";
            fails[1].style.display= "none";
            fails[2].style.display= "none";
            break;
        case 1:
            fails[0].style.display= "block";
            break;
        case 2:
            fails[1].style.display= "block";
            break;
        case 3:
            fails[2].style.display= "block";

    }
}
function scoreupdate(){
    scoreshow.innerHTML= "SCORE <br>" + score;
}
slider.oninput = function() {
    difficulty = this.value;
    val.innerHTML = difficulty;
}
function gameoverhide(){
    let gameover = document.querySelector("#gameend");
    gameover.style.display = "none";
}
function gameovershow(){
    let scoreover = document.querySelector("#results");
    scoreover.innerHTML = "Your score is <br>" + score;
    let gameover = document.querySelector("#gameend");
    gameover.style.display = "flex";
}
function passivepoints(){
    for(let i of (randomnum).toString().split("")){
        if (i=='7'){
            hasseven=1;
            break;
        }
    }
    if(randomnum%7!=0 && checkclick!=1 && hasseven==0)score++;
}

function game(){
    showx();
    if(starcik==1){
        passivepoints();
        scoreupdate();
        
        hasseven = 0;
        if(failedclick>=3){
            clearInterval(interval);
            starcik=0;
            gameovershow();
            return;
        }
        if(randomnum%7==0 && checkclick !=1){
            starcik=0;
            clearInterval(interval);
            gameovershow();
            return;
        }
        else for(let i of (randomnum).toString().split("")){
            if (i=='7'){
                hasseven=1;
                break;
            }
        }
        if(hasseven==1 && checkclick != 1){
            starcik=0;
            clearInterval(interval);
            gameovershow();
            return;
        }
        randomnum=Math.floor(Math.random()*100+1)
        number.innerHTML=randomnum;
        checkclick=0;
        hasseven=0;
        }
    }
function start(){
    if (starcik!=1){
        clearInterval(interval);
        starcik=1;
        score=0;
        failedclick=0;
        hasseven=0;
        randomnum=12;
        constdiff=difficulty*1000;
        checkclick=1;
        game();
        interval=setInterval(game, constdiff);
    }
    
}
function check(){
    if (starcik==1){
        checkclick=1;
        if(randomnum%7==0){
            score++;
            clearInterval(interval);
            game();
            interval=setInterval(game, constdiff);
            return;
        }
        else for(let i of (randomnum).toString().split("")){
            if (i=='7'){
                hasseven=1;
                break;
            }
        }
        if(hasseven===0){
            failedclick++;
            if(score>0){score--;}
            clearInterval(interval);
            game();
            interval=setInterval(game, constdiff);
        }
        else{
            score++;
            clearInterval(interval);
            game();
            interval=setInterval(game, constdiff);
        }
    }
}