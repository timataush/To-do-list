// console.log(currentData);
  //   console.log(title);
  //   console.log(description);
  //   console.log(color);
  //   console.log(level);

//  let currentData = JSON.parse(localStorage.getItem('data')) || [];
// let title = document.querySelector('.input model__title').value;
// localStorage.setItem('inf', JSON.stringify(inf));
// console.log(title)
//  localStorage.setItem('title',title)
// localStorage.setItem('description', description);
// localStorage.setItem('title', title);
// localStorage.setItem('color', color);
// localStorage.setItem('level', level);
let clicksave = document.querySelector('.btn.ok');
clicksave.addEventListener('click', addData);

function addData(e) {
  e.preventDefault();

  let title = document.querySelector('.model__title').value;
  let description = document.querySelector('.model__description').value;
  let color = document.querySelector('.input__color').value;
  let level = document.querySelector('.input__level').value;

  let values = {
    title: title,
    description: description,
    color: color,
    level: level,
  };
  let currentData = 
  [];
   currentData.push(values);

localStorage.setItem('data', JSON.stringify(currentData));
}































 