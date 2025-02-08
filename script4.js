const choice=["rock","papar","scissor"];
const playerDis=document.getElementById("playerchoice");
const computerDis=document.getElementById("computerchoice");
const resultDis=document.getElementById("result");

function playgame(playerchoice){
    const computerchoice=choice[Math.floor(Math.random()*3)];
   let result=""
   if(playerchoice===computerchoice){
    result="IT IS A DRAW !!!"
   }else{
     switch(playerchoice){
        case "rock":
          result= (computerchoice === "scissor") ?"YOU WIN" : "YOU LOOSS";
          break; 
        case "scissor":
        result=(computerchoice==="paper")?"YOU WIN" : "YOU LOOSE";
        break;
        case "paper":
            result=(computerchoice ==="rock")?"YOU WIN": "YOU LOOSE";

   }}
   playerDis.textContent=`PLAYER: ${playerchoice}`;
   computerDis.textContent=`COMPUTER: ${computerchoice}`;
   resultDis.textContent=result;

   
}
