let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let players = document.querySelector(".players");
let msgContainer = document.querySelector(".msg-container");
let reset = document.querySelector(".reset");
let setNames = document.querySelector("#set-name");
let form1 = document.querySelector("#player1");
let form2 = document.querySelector("#player2");
let p1 = document.querySelector("#p-1");
let p2 = document.querySelector("#p-2");
let h1 = document.querySelector("h1");

let turnO = true;

let player = [];

let grid = {
    "b00" : "ab",
    "b01" : "ab",
    "b02" : "ab",
    "b10" : "ab",
    "b11" : "ab",
    "b12" : "ab",
    "b20" : "ab",
    "b21" : "ab",
    "b22" : "ab"
}


function checkWinner(){
    let v1 = grid["b00"]!=null && grid["b00"]==grid["b01"] && grid["b01"]==grid["b02"];
    let v2 = grid["b10"]!=null && grid["b10"]==grid["b11"] && grid["b11"]==grid["b12"];
    let v3 = grid["b20"]!=null && grid["b20"]==grid["b21"] && grid["b21"]==grid["b22"];
    let v4 = grid["b00"]!=null && grid["b00"]==grid["b10"] && grid["b10"]==grid["b20"];
    let v5 = grid["b01"]!=null && grid["b01"]==grid["b11"] && grid["b11"]==grid["b21"];
    let v6 = grid["b02"]!=null && grid["b02"]==grid["b12"] && grid["b12"]==grid["b22"];
    let v7 = grid["b00"]!=null && grid["b00"]==grid["b11"] && grid["b11"]==grid["b22"];
    let v8 = grid["b20"]!=null && grid["b20"]==grid["b11"] && grid["b11"]==grid["b02"];
    return v1 || v2 || v3 || v4 || v5 || v6 || v7 || v8;
}


function winner(idx){
    msg.innerText = `Congratulations! The Winner is ${player[idx]}`;
    msgContainer.classList.toggle("hide");
    players.classList.toggle("hide");
    reset.classList.toggle("hide");
    disabled();
}


function disabled(){
    for(let ele in grid){
        grid[ele] = "node";
    }
}

for(let box of boxes){
    box.addEventListener("click", function(event){
        let id = event.target.id;
        if(grid[id] == null){
            const mark = turnO ? "O" : "X";
            grid[id] = mark;
            event.target.innerText = mark;
            if(checkWinner()) winner(turnO ? 0 : 1);
            turnO = !turnO;
        }
    });
}

setNames.addEventListener("click", function(event){
    p1.innerText = `${form1.value}`;
    player.push(form1.value);
    player.push(form2.value);
    p2.innerText = `${form2.value}`;
    form1.classList.toggle("hide");
    form1.classList.toggle("hide");
    form2.classList.toggle("hide");
    reset.classList.toggle("hide");
    setNames.classList.toggle("hide");
    resetGame();
});

function resetGame(){
    for(let box of boxes){
        box.innerText = "";
    }
    for(let key in grid){
        grid[key] = null;
    }
    turnO = true;
}
reset.addEventListener("click", function(event){
    resetGame();
});