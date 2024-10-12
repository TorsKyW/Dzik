function rules(){
    let rule = document.querySelector("#blockrules");
    rule.style.display = "none";
}
let licznik=0;
let suma=0;
let srednia=0;
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
let timer = 0;
let secs=0.0;
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
    srednia = Math.round((suma/licznik)*100)/100;
    if(isNaN(srednia)==true){
        srednia="No correct answer"
    }
    let scoreover = document.querySelector("#results");
    scoreover.innerHTML = "Your score is <br>" + score + "<br> Your average reaction time was <br>" + srednia + "s";
    let gameover = document.querySelector("#gameend");
    gameover.style.display = "flex";
}
function hasseven(){
    for(let i of (randomnum).toString().split("")){
        if (i=='7'){
            return true;
        }
    }
    return false;
}
function passivepoints(){
    if(randomnum%7!=0 && checkclick!=1 && hasseven()==false)score++;resettimer();
}
function resettimer(){
    clearInterval(timer);
    secs=0.0;
    timer = setInterval(() => {
        secs+=0.1;
    }, 100);
}
function game(){
    showx();
    if(starcik==1){
        passivepoints();
        scoreupdate();
        if(failedclick>=3){
            clearInterval(interval);
            starcik=0;
            clearInterval(timer);
            gameovershow();
            return;
        }
        if(randomnum%7==0 && checkclick !=1){
            starcik=0;
            clearInterval(interval);
            clearInterval(timer);
            gameovershow();
            return;
        }
        if(hasseven()==true && checkclick != 1){
            starcik=0;
            clearInterval(interval);
            clearInterval(timer);
            gameovershow();
            return;
        }
        randomnum=Math.floor(Math.random()*100+1)
        number.innerHTML=randomnum;
        checkclick=0;
        }
    }
function start(){
    if (starcik!=1){
        clearInterval(interval);
        licznik=0;
        suma=0;
        starcik=1;
        score=0;
        failedclick=0;
        randomnum=12;
        constdiff=difficulty*1000;
        checkclick=1;
        secs=0.0;
        timer = setInterval(() => {
            secs+=0,1;
        }, 100);
        game();
        interval=setInterval(game, constdiff);
    }
    
}
function check(){
    if (starcik==1){
        checkclick=1;
        if(randomnum%7==0){
            score++;
            licznik++;
            suma+=secs;
            resettimer();
            clearInterval(interval);
            game();
            interval=setInterval(game, constdiff);
            return;
        }
        else if(hasseven()==false){
            failedclick++;
            if(score>0){score--;}
            clearInterval(interval);
            game();
            interval=setInterval(game, constdiff);
        }
        else{
            score++;
            licznik++;
            suma+=secs;
            resettimer();
            clearInterval(interval);
            game();
            interval=setInterval(game, constdiff);
        }
    }
}