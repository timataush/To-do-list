let modalBtn = document.querySelectorAll('.header__creature');
let modalOverlay = document.querySelector('.modal__overlay');
let modalDialog = document.querySelector('.modal__dialog');
let modalExit = document.querySelector('.modal__close');
let save = document.querySelector('.btn.ok');
let time = new Date();

modalExit.addEventListener('click', modalClose);
modalOverlay.addEventListener('click', overlayExit);
save.addEventListener('click', createTask);

let tasksData = JSON.parse(localStorage.getItem('data')) || [];


 for(let creature of modalBtn ){
creature.addEventListener('click', openModal);
}

function openModal(){ 
  modalOverlay.style.display = 'block';
  modalDialog.style.display = 'block';
 }

function modalClose(e){ 
  e.preventDefault();
  reset()
  clearF();
}

function overlayExit(e){
  if(e.target === modalOverlay){
  reset()
  
  clearF()
}}

function reset(){
  modalOverlay.style.display = 'none';
  modalDialog.style.display = 'none';
}
function clearF() {
     document.querySelector('.modal__input-title').value = '';
     document.querySelector('.modal__input-description').value = '';
     document.querySelector('.modal__input-color').value = '';
     document.querySelectorAll('.modal__input-level').value = '';
    }   



    function warning() {
    let title = document.querySelector('.modal__input-title').value;
    let description = document.querySelector('.modal__input-description').value;
    
    if (!title || !description ) {
        alert("ЗАПОЛНИТЕ ВСЕ ПОЛЯ!!!!");
        return false;
    }
    return true;
}


function createTask(e) {
  e.preventDefault();

  if (!warning()) {
        return; 
    }

  let title = document.querySelector('.modal__input-title').value;
  let description = document.querySelector('.modal__input-description').value;
  let color = document.querySelector('.modal__input-color').value;
  let levelElements = document.querySelectorAll('.modal__input-level');
  let level;

    for (let element of levelElements) {
        if (element.checked) {
            level = element.value;
            break;
        }
    }

  let values = {
    title,
    description,
    color,
    level,
    time
  };
tasksData.push(values);
localStorage.setItem('data', JSON.stringify(tasksData));
clearF();
reset();
}

