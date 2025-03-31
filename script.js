let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true;
let count = 0;

const winningPattern =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            // player O
            box.innerText = "O";
            box.style.color ="gold"
            turnO = false;
        }
        else{
            //player X
            box.innerText ="X";
            box.style.color ="pink"
            turnO = true;
        }
        box.disabled=true;//if box was clicked then again was not clicked
        count++;

        let isWinner =checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
       
    })
})


const checkWinner = ()=>{
    for(let pattern of winningPattern){
        // console.log(pattern); // all pattern
        // console.log(pattern[0],pattern[1],pattern[2]);//individuals index
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);//individual box
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText)

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val ){
                // console.log("winner",pos1Val);
                showWinner(pos1Val);
            }
        }
    }
}

const gameDraw = ()=>{
    msg.innerHTML=`Game was  draw`
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner)=>{
    msg.innerHTML=`Congratulation Winner is ${winner}`
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const resetGame = ()=>{
    count =0;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const newGame = ()=>{
    turnO = true;
    count =0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

resetBtn.addEventListener("click",resetGame)
newGameBtn.addEventListener("click",newGame)
