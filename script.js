
let map =   
    [
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    ];

    let arrBi =[
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ];
       
function boardBuild(arr){
    let board = document.getElementById("board");

    for(let i = 0; i < arr.length; i++) {
        let coluna = document.createElement("div");
        coluna.classList.add("columns");
        coluna.id = i ;
        board.appendChild(coluna);
        

        let celulas = arr[i];
        let pegaColuna = document.getElementsByClassName("columns")[i];
        for(let x = 0; x < celulas.length; x++) {
            let createCel = document.createElement("div");
            createCel.classList.add("celulas");
            createCel.classList.add(`celulas${x}`)
            createCel.id = `C${i + 1}L${x + 1}`;
            pegaColuna.appendChild(createCel);
            
        }
    
    }
    
}
boardBuild(map);


let counter = 0;

let actualColumn;
let actualCel;
let columnSelected;
let filho;
let columnPosition;
let child;

let column1 = document.getElementById("0");
let column2 = document.getElementById("1");
let column3 = document.getElementById("2");
let column4 = document.getElementById("3");
let column5 = document.getElementById("4");
let column6 = document.getElementById("5");
let column7 = document.getElementById("6");


function game(ev){
    
    filho = document.createElement('div');
    columnSelected = ev.currentTarget.id;
   
    columnPosition = parseInt(columnSelected);
   
    actualColumn =  document.getElementById(columnSelected)
    if(actualCel = actualColumn.getElementsByClassName("celulas")[0].childElementCount !== 0){
        return;
    }
    counter++;

    redblackCount(actualColumn)

   
    let evCurrTarg = ev.currentTarget;
    
    for(let i =0; i < evCurrTarg.children.length; i++){
        
        if(evCurrTarg.children[i].childElementCount > 0){
            child = evCurrTarg.children[i].children;
            redBlack(child,evCurrTarg,i)
            
           

        } else {
            continue;
        }
        
        
    }

    winDiagonalCondition();
    horizontalCondition();

    drawn()
    
   
}

/************************
  *  ADD EVENTO DE CLICK *
  ************************/

const addClick = () => {
    column1.addEventListener("click", game);
    column2.addEventListener("click", game);
    column3.addEventListener("click", game);
    column4.addEventListener("click", game);
    column5.addEventListener("click", game);
    column6.addEventListener("click", game);
    column7.addEventListener("click", game);
}

addClick();
let getVictory2 = document.getElementById('victory2');
let getVictory = document.getElementById('victory1');
let sectionGame = document.getElementById('teste');
let drawnMensage = document.getElementById('drawn');

function verticalVictory(child, evCurrTarg, i, arrBi){
    if(arrBi[Number(evCurrTarg.id)][i - 1] === arrBi[Number(evCurrTarg.id)][i] && 
    arrBi[Number(evCurrTarg.id)][i - 2] === arrBi[Number(evCurrTarg.id)][i] &&
    arrBi[Number(evCurrTarg.id)][i - 3] === arrBi[Number(evCurrTarg.id)][i] 
    ){
        if(child[0].classList.value === "ballBlack") {
            victory()
            removeClick();
        } else {
            victory2()
            removeClick();
        }
        
    } 
   
}

/***********************************
 *  CONDIÇÃO DE VITÓRIA HORIZONTAL *
 ***********************************/




 const horizontal = (letter) => {
    for (let i = 0; i < arrBi.length; i++) {
        for (let j = 0; j < arrBi[i].length; j++) {
            if (arrBi[i][j] === letter && 
            (i + 1) < 7 &&
            arrBi[i + 1][j] === letter &&
            (i + 2) < 7 &&
            arrBi[i + 2][j] === letter &&
            (i + 3) < 7 &&
            arrBi[i + 3][j] === letter) {
                return true;
            }
        }
    }
 }

 const horizontalCondition = () => {
 
    if (horizontal(black)) {

        removeClick();
        console.log("horizontal black")

        getVictory.classList.remove('hidden');


    } else if (horizontal(red)) {

        removeClick();
        console.log("horizontal red")
        
        getVictory2.classList.remove('hidden');

    }

}

// percorrer todas as colunas so que na mesma posicao do elemento
let actualBall;

function redblackCount(actualColumn){
    for(let i = 0; i <= 5; i++){
        

        actualCel = actualColumn.children[i]
        if(actualCel.childElementCount !== 0 ){
            return;
        }  

        if (actualCel.childElementCount === 0) { 
            
            if (counter % 2 === 0) {
                actualCel.appendChild(filho);
                filho.classList.add('ballRed');
                actualBall = "R";
                
                
            } else {
                
                actualCel.appendChild(filho);
                filho.classList.add('ballBlack');
                actualBall = "B";
                

            }
            turnPlayer(actualBall);
        }
        
    }
    
}
let audioCat1 = document.getElementById("audiocat1");
let audioCat2 = document.getElementById("audiocat2");
let audioCat3 = document.getElementById("audiocat3");







function redBlack(child,evCurrTarg,i){
    
    if(child[0].classList.value === "ballBlack"){
        arrBi[Number(evCurrTarg.id)][i] = "B";
        verticalVictory(child, evCurrTarg, i, arrBi)
        audioCat1.play();
       
        // vitoria do black
        // horizonVictory(child, evCurrTarg, i, arrBi)
    
    } else {
        arrBi[Number(evCurrTarg.id)][i] = "R"
        verticalVictory(child, evCurrTarg, i, arrBi)
        audioCat2.play();
       
        
        // vitoria do red
        // horizonVictory(child, evCurrTarg, i, arrBi)
    }
}

const createMap = () => {
    let getBoard = document.getElementById('board');
    let map = [];
    for (let i = 0; i < 7; i++) {
        map.push([]);
        for (let j = 0; j < 6; j++) {
            map[i].push(getBoard.children[i].children[j]);
        }
    }
    return map;
}
createMap();

function drawn(){
    let countCol = 0;
    for (let i = 0; i < 7; i++) {
        let idCel = `C${i + 1}L1`;
        let cel = document.getElementById(idCel);
        if(cel.hasChildNodes(true)) {
            countCol++
        }
    }
   
    if(countCol === 7) {
        removeClick();
        drawnMensage.classList.remove('hidden');
        sectionGame.classList.add('hidden');
        audioCat3.play();
        return true
        
    }
}

/*********************************
 *  CONDIÇÃO DE VITÓRIA DIAGONAL *
 *********************************/



 const black = "B";
 const red = "R";

 const winDiagonalCondition = () => {
     diagonalUpRight();
     diagonalUpLeft();
 }

 const upRight = (letter) => {
    for (let i = 0; i < arrBi.length; i++) {
        for (let j = 0; j < arrBi[i].length; j++) {
            if (arrBi[i][j] === letter && 
            (i + 1) < 7 && (j - 1) > -1 &&
            arrBi[i + 1][j - 1] === letter &&
            (i + 2) < 7 && (j - 2) > -1 &&
            arrBi[i + 2][j - 2] === letter &&
            (i + 3) < 7 && (j - 3) > -1 &&
            arrBi[i + 3][j - 3] === letter) {
                return true;
            }
        }
    }
 }
 
 const diagonalUpRight = () => {
 
    if (upRight(black)) {

        removeClick();
        victory();


    } else if (upRight(red)) {

        victory2();
        removeClick();
        

    }
 }

 const upLeft = (letter) => {
    for (let i = 0; i < arrBi.length; i++) {
        for (let j = 0; j < arrBi[i].length; j++) {
            if (arrBi[i][j] === letter && 
            (i - 1) > -1 && (j - 1) > -1 &&
            arrBi[i - 1][j - 1] === letter &&
            (i - 2) > -1 && (j - 2) > -1 &&
            arrBi[i - 2][j - 2] === letter &&
            (i - 3) > -1 && (j - 3) > -1 &&
            arrBi[i - 3][j - 3] === letter) {
                return true;
            }
        }
    }
 }
 
 const diagonalUpLeft = () => {
 
    if (upLeft(black)) {

        removeClick();
        
        victory()

    } else if (upLeft(red)) { 
        
       victory2()
       removeClick();

    }   
 }

 /***************************
  *  REMOVE EVENTO DE CLICK *
  ***************************/

 const removeClick = () => {
    column1.removeEventListener("click", game);
    column2.removeEventListener("click", game);
    column3.removeEventListener("click", game);
    column4.removeEventListener("click", game);
    column5.removeEventListener("click", game);
    column6.removeEventListener("click", game);
    column7.removeEventListener("click", game);
 }


let gatinho1 = document.getElementById('gatinho1')
let gatinho2 = document.getElementById('gatinho2')

 const turnPlayer = (actualBall) => {
    if(actualBall === "R"){
        gatinho2.classList.remove('borderGatinho2')
        gatinho1.classList.add('borderGatinho1')
        
    } else {
        gatinho1.classList.remove('borderGatinho1')
        gatinho2.classList.add('borderGatinho2')
    }
   
}
 /*****************
  *  RESTART GAME *
  *****************/


let btnreset = document.getElementById("btnreset");
let btnreset1 =document.getElementById("btnreset1");
let btnreset2 =document.getElementById("btnreset2");

 const restartGame = () => {
    
    arrBi =[
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ];
    getVictory2.classList.add('hidden');
    getVictory.classList.add('hidden');
    drawnMensage.classList.add('hidden');
    sectionGame.classList.remove('hidden');

    let getBoard = document.getElementById('board');
    getBoard.innerHTML = '';

    boardBuild(map);

    counter = 0;

    column1 = document.getElementById("0");
    column2 = document.getElementById("1");
    column3 = document.getElementById("2");
    column4 = document.getElementById("3");
    column5 = document.getElementById("4");
    column6 = document.getElementById("5");
    column7 = document.getElementById("6");
    
    addClick();    

 }
 btnreset.addEventListener("click",restartGame);
 btnreset1.addEventListener("click",restartGame);
 btnreset2.addEventListener("click",restartGame);

 function victory(){
    getVictory.classList.remove('hidden')
    sectionGame.classList.add('hidden');

 }

 function victory2() {
     getVictory2.classList.remove('hidden');
     sectionGame.classList.add('hidden');
 }
