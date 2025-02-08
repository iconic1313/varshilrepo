// for board

var boxsize=25;
var rows=20;
var cols=20;
var board;
var context;

var snackx=boxsize*5;
var snacky=boxsize*5;
 var snackbody=[];
var velociyx=0;
var velociyy=0;
var foodx;
var foody;
var gameover=false;
window.onload = function() {
    board=document.getElementById("board");
    board.height= rows*boxsize;
    board.width= cols*boxsize;  
    context=board.getContext("2d");
    placefood();
    document.addEventListener("keyup",changedirection);
    setInterval(update,1000/10);

}
function update(){
if(gameover){
    return;
}
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="green";
    context.fillRect(foodx,foody,boxsize,boxsize);
    if (snackbody.length > 0) {
        snackbody.unshift([snackx, snacky]); // Add current head position
        snackbody.pop(); // Remove last part to maintain length
    }
    
    snackx+=velociyx*boxsize;
    snacky+=velociyy*boxsize;

    context.fillStyle="red";
    for(let i=0;i<snackbody.length;i++){
        context.fillRect(snackbody[i][0],snackbody[i][1],boxsize,boxsize);
    }
    context.fillStyle = "blue";
    context.fillRect(snackx, snacky, boxsize, boxsize);
    if(snackx==foodx && snacky==foody){
        snackbody.push([foodx,foody]);
        placefood();
    }
    if(snackx<0 || snacky>=cols*boxsize || snacky<0 || snackx>=rows*boxsize){
        gameover=true;
        alert("Game Over");
   }
}

function changedirection(e){
    if(e.code=="ArrowUp" && velociyy!=1){
        velociyx=0;        
        velociyy=-1;
    }   
    if(e.code=="ArrowDown" &&velociyy!=-1){
        velociyx=0;        
        velociyy=1;
    }
    if(e.code=="ArrowLeft" &&velociyx!=1){
        velociyx=-1;        
        velociyy=0;
    }
    if(e.code=="ArrowRight" &&velociyx!=-1){
        velociyx=1;        
        velociyy=0;
    }
    
    
}
function placefood(){
    foodx=Math.floor(Math.random()*cols)*boxsize;
    foody=Math.floor(Math.random()*rows)*boxsize;
}