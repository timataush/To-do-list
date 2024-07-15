let modalBtn = document.querySelectorAll('.header__creature');
let modalOverlay = document.querySelector('.modal__overlay');
let modalDialog = document.querySelector('.modal__dialog');
 for(let creature of modalBtn ){
creature.addEventListener('click', create);
};

function create(){ 
  modalOverlay.style.display = 'block';
  modalDialog.style.display = 'block';
 }

let modalExit = document.querySelector('.modal__close');
modalExit.addEventListener('click', closeExit);
function closeExit(e){ 
  e.preventDefault();
  modalOverlay.style.display = 'none';
  modalDialog.style.display = 'none';
};

modalOverlay.addEventListener('click', backgroundExit);
 function backgroundExit(e){
  if(e.target === modalOverlay){
  modalOverlay.style.display = 'none';
  modalDialog.style.display = 'none';
  }
};





let save = document.querySelector('.btn.ok');

save.addEventListener('click', exite);
function exite(){
  modalOverlay.style.display = 'none';
  modalDialog.style.display = 'none';
}

save.addEventListener('click', createTask);
function createTask(e) {
  e.preventDefault();

  let title = document.querySelector('.input__title').value;
  let description = document.querySelector('.input__description').value;
  let color = document.querySelector('.input__color').value;
  let level = document.querySelector('.input__level').value;

  let values = {
    title: title,
    description: description,
    color: color,
    level: level,
  };
  let currentData = [];
   currentData.push(values);

localStorage.setItem('data', JSON.stringify(currentData));
console.log(level)
};

