const {changeWindow} = require('./buttom_logic')
const fs = require('fs');

window.addEventListener('keydown', (event) => {
    console.log("event arrived")
    if (event.key === 'r' || event.key === 'R') {
      changeWindow('reset');
    }
})

const folderPath = './winning_img';

// Read the contents of the directory
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  let number = Math.floor(Math.random() * files.length)
  let img = document.getElementsByClassName("img")
  console.log(files[number])
  img[0].src=folderPath+"/"+files[number]
})