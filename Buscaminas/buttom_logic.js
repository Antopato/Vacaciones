const {ipcRenderer} = require('electron')


function checkState(button){
    let cell = JSON.parse(button.getAttribute('data-json'))
    if(cell.bomb=="YES"){
        button.textContent = "Boom"
        button.style.backgroundColor= 'red';
        changeWindow("loose")
        return true
    }
    else{
        let a = nearBombs(button);
        button.textContent = a;
        button.style.backgroundColor= 'blue'
        if(a!=0 && cell.check==false){
          cont++;
          console.log(cont + "due to a number ",a );
          cell.check=true
          button.setAttribute('data-json', JSON.stringify(cell));
        }
        if(a==0 && cell.check==false){
          cont++;
          console.log(cont + "due to a cero")
          cell.check=true
          button.setAttribute('data-json', JSON.stringify(cell));
          let number = cell.num 
          switch(findPosition(number)){
            case 1:  // sólo hay fallo arriba
            checkState(button_array[number-1])
            checkState(button_array[number+1])
            checkState(button_array[number+MAX_ROWS-1])
            checkState(button_array[number+MAX_ROWS])
            checkState(button_array[number+MAX_ROWS+1])
            break;
      
          case 2:  // fallo arriba izq
            checkState(button_array[number+1])
            checkState(button_array[number+MAX_ROWS])
            checkState(button_array[number+MAX_ROWS+1])
            break;
      
          case 3:  //fallo arriba der
            checkState(button_array[number-1])
            checkState(button_array[number+MAX_ROWS-1])
            checkState(button_array[number+MAX_ROWS])
            break;
      
          case 4:  //fallo abajo sólo
            checkState(button_array[number-MAX_ROWS+1])
            checkState(button_array[number-MAX_ROWS])
            checkState(button_array[number-MAX_ROWS-1])
            checkState(button_array[number-1])
            checkState(button_array[number+1])
            break;
          case 5:  //fallo abajo izq
            checkState(button_array[number-MAX_ROWS])
            checkState(button_array[number-MAX_ROWS+1])
            checkState(button_array[number+1])
            break;
      
          case 6:  //fallo abajo der
            checkState(button_array[number-MAX_ROWS-1])
            checkState(button_array[number-MAX_ROWS])
            checkState(button_array[number-1])
            break;
      
          case 7:  //fallo sólo izq
            checkState(button_array[number-MAX_ROWS])
            checkState(button_array[number-MAX_ROWS+1])
            checkState(button_array[number+1])
            checkState(button_array[number+MAX_ROWS])
            checkState(button_array[number+MAX_ROWS+1])
            break;
      
          case 8:  //fallo sólo der
          checkState(button_array[number-MAX_ROWS-1])
          checkState(button_array[number-MAX_ROWS])
          checkState(button_array[number-1])
          checkState(button_array[number+MAX_ROWS-1])
          checkState(button_array[number+MAX_ROWS])
          break;
      
          default:
            checkState(button_array[number-MAX_ROWS+1])
            checkState(button_array[number-MAX_ROWS])
            checkState(button_array[number-MAX_ROWS-1])
            checkState(button_array[number-1])
            checkState(button_array[number+1])
            checkState(button_array[number+MAX_ROWS-1])
            checkState(button_array[number+MAX_ROWS])
            checkState(button_array[number+MAX_ROWS+1])
            
          }
        }

        if(cont== (MAX_COLUMNS*MAX_ROWS)-MAX_BOMBS){changeWindow('win')} 
    }
  }
  
  
  function checkStateNoBoom(button){
    let cell = JSON.parse(button.getAttribute('data-json'))
  
    if(cell.bomb=="YES"){
        return true
    }
    else{
        return false
    }
  }
  
  function nearBombs(button){
    let count = 0;
    let cell = JSON.parse(button.getAttribute('data-json'))
    let number = cell.num 
    switch(findPosition(number)){
      case 1:  // sólo hay fallo arriba
        if(checkStateNoBoom(button_array[number-1])){count++}
        if(checkStateNoBoom(button_array[number+1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS-1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS+1])){count++}
        return count;
        break;
  
      case 2:  // fallo arriba izq
        if(checkStateNoBoom(button_array[number+1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS+1])){count++}
        return count;
        break;
  
      case 3:  //fallo arriba der
        if(checkStateNoBoom(button_array[number-1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS-1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS])){count++}
        return count;
        break;
  
      case 4:  //fallo abajo sólo
        if(checkStateNoBoom(button_array[number-MAX_ROWS+1])){count++}
        if(checkStateNoBoom(button_array[number-MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number-MAX_ROWS-1])){count++}
        if(checkStateNoBoom(button_array[number-1])){count++}
        if(checkStateNoBoom(button_array[number+1])){count++}
        return count;
        break;
      case 5:  //fallo abajo izq
        if(checkStateNoBoom(button_array[number-MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number-MAX_ROWS+1])){count++}
        if(checkStateNoBoom(button_array[number+1])){count++}
        return count;
        break;
  
      case 6:  //fallo abajo der
        if(checkStateNoBoom(button_array[number-MAX_ROWS-1])){count++}
        if(checkStateNoBoom(button_array[number-MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number-1])){count++}
        return count;
        break;
  
      case 7:  //fallo sólo izq
        if(checkStateNoBoom(button_array[number-MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number-MAX_ROWS+1])){count++}
        if(checkStateNoBoom(button_array[number+1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS+1])){count++}
        return count;
        break;
  
      case 8:  //fallo sólo der
      if(checkStateNoBoom(button_array[number-MAX_ROWS-1])){count++}
      if(checkStateNoBoom(button_array[number-MAX_ROWS])){count++}
      if(checkStateNoBoom(button_array[number-1])){count++}
      if(checkStateNoBoom(button_array[number+MAX_ROWS-1])){count++}
      if(checkStateNoBoom(button_array[number+MAX_ROWS])){count++}
      return count;
      break;
  
      default:
        if(checkStateNoBoom(button_array[number-MAX_ROWS+1])){count++}
        if(checkStateNoBoom(button_array[number-MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number-MAX_ROWS-1])){count++}
        if(checkStateNoBoom(button_array[number-1])){count++}
        if(checkStateNoBoom(button_array[number+1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS-1])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS])){count++}
        if(checkStateNoBoom(button_array[number+MAX_ROWS+1])){count++}
        return count;
        
    }
  }
  
  function findPosition(num){
    let array= [0,0,0,0]
    if(num<MAX_ROWS){array[0]=1}//pegado arriba
    if(num>(MAX_ROWS*(MAX_COLUMNS-1)-1)){array[1]=1}//pegado abajo
    if(num%MAX_ROWS==0){array[2]=1}//pegado izquierda
    if(num%MAX_ROWS==MAX_ROWS-1){array[3]=1}//pegado derecha
  

    if(array.toString() == [1,0,0,0].toString()){
      return 1
    } else if(array.toString() == [1,0,1,0].toString()){
      return 2
    } else if(array.toString() == [1,0,0,1].toString()){
      return 3
    } else if(array.toString() == [0,1,0,0].toString()){

      return 4
    } else if(array.toString() == [0,1,1,0].toString()){
      return 5
    } else if(array.toString() == [0,1,0,1].toString()){
      return 6
    } else if(array.toString() == [0,0,1,0].toString()){
      return 7
    } else if(array.toString() == [0,0,0,1].toString()){
      return 8
    }
    return 10
  }
  function setFlag(button){
    let cell = JSON.parse(button.getAttribute('data-json'))
    cell.state="FLAG"
    button.textContent = "Flag"
    button.style.backgroundColor= 'green';
    button.setAttribute('data-json', JSON.stringify(cell));
  }
  function setNormal(button){
    let cell = JSON.parse(button.getAttribute('data-json'))
    cell.state="NORMAL"
    button.textContent = ""
    button.style.backgroundColor= 'grey';
    button.setAttribute('data-json', JSON.stringify(cell));
  }

  function changeWindow(x) {
    ipcRenderer.send('changeWindow',x );
  }


  module.exports = {checkState,setFlag,setNormal,changeWindow}