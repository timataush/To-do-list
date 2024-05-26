let modalBtn = document.querySelectorAll('.creature');
let modalOverlay = document.querySelector('.modal__overlay');
let modalDialog = document.querySelector('.modal__dialog');
for(let creature of modalBtn ){
creature.addEventListener('click', create);
function create(){ 
  modalOverlay.style.display = 'block';
  modalDialog.style.display = 'block';
}};

let modalExit = document.querySelector('.modal__close');
modalExit.addEventListener('click', exit);
function exit(e){ 
   e.preventDefault();
  modalOverlay.style.display = 'none';
  modalDialog.style.display = 'none';
};

modalOverlay.onclick = function(e){
  if(e.target === modalOverlay){
  modalOverlay.style.display = 'none';
  modalDialog.style.display = 'none';
  }
};
let clickExite = document.querySelector('.btn.ok');
clickExite.onclick = function(){
  modalOverlay.style.display = 'none';
  modalDialog.style.display = 'none';
};

