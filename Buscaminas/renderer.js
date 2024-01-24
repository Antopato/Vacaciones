const {checkState, setFlag, setNormal, changeWindow} = require('./buttom_logic')
const {ipcRenderer} = require('electron')

// Require the Electron module
const states = ["NORMAL","FLAG"]
var MAX_BOMBS = 10
var MAX_ROWS = 10
var MAX_COLUMNS = 7
var button_array = []
var win = 0;
var cont=0;
// Get a reference to the button element in the HTML
const myButtons = document.querySelectorAll('.button');
let bomb_nums = generateRandomNumbers(MAX_BOMBS,0,myButtons.length)


// Function to be executed when the button is clicked

window.addEventListener('keydown', (event) => {
  console.log("event arrived")
  if (event.key === 'r' || event.key === 'R') {
    changeWindow('reset');
  }
})

var i = 0
myButtons.forEach((button)=>{
  button.addEventListener('mousedown', (event)=>buttonHandlerFirst(button,event));
  let jsonData = JSON.parse(button.getAttribute('data-json'));
  if(bomb_nums.indexOf(i)==-1){
    jsonData = {state:"NORMAL",bomb:"NO",num:i++,check:false}
  }else{
    jsonData = {state:"NORMAL",bomb:"YES",num:i++,check:false}
    console.log("bomba en ",i)
  }
  button.setAttribute('data-json', JSON.stringify(jsonData));
  button_array.push(button)
})





function buttonHandlerFirst(buton,event){
    // Perform actions when the button is clicked
    let cell = JSON.parse(buton.getAttribute('data-json'))
    if(event.button==0 && cell.state==states[0]){
      if(!checkState(buton)){win++;}
      //else{losingPage()}
    }else if(event.button=2 && cell.state==states[0]){
      setFlag(buton);
    }else if(event.button=2 && cell.state==states[1]){
      setNormal(buton);
    }
    if (win == (MAX_ROWS*MAX_COLUMNS - MAX_BOMBS)){

    }

  
} 





function generateRandomNumbers(count, min, max) {  
  const numbersPool = Array.from({ length: max - min + 1 }, (_, index) => index + min);
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbersPool.length);
    const selectedNumber = numbersPool[randomIndex];
    randomNumbers.push(selectedNumber);
    numbersPool.splice(randomIndex, 1);
  }

  return randomNumbers;
}

function getText(){
  var elements = document.getElementsByClassName("Ending text");
  return elements[0]
}

