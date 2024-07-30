// важные объявления переменных
let modalBtn = document.querySelectorAll('.header__creature')
let modalOverlay = document.querySelector('.modal__overlay')
let modalDialog = document.querySelector('.modal__dialog')
let modalExit = document.querySelector('.modal__close')
let save = document.querySelector('.btn.ok')
let cancel = document.querySelector('.btn.cancel')
let inputTitle = document.querySelector('.modal__input-title')
let inputDescription = document.querySelector('.modal__input-description')
// объявления функций
modalExit.addEventListener('click', modalClose)
modalOverlay.addEventListener('click', overlayExit)
save.addEventListener('click', createTask)
cancel.addEventListener('click', modalClose)
// localStorage
let tasksData = JSON.parse(localStorage.getItem('data')) || []

inputTitle.addEventListener('input', inputChange)
inputDescription.addEventListener('input', inputChange)


 //создание задач
tasksData.forEach(element => {
	addTask(element)
})
//  основной элемент
// function addTask(data) {
// 	let inputTitle = document.querySelector('.modal__input-title').value
// 	let inputDescription = document.querySelector('.modal__input-description').value
// 	let levelElements = document.querySelectorAll('.modal__input-level').value

// 	let newTask = document.createElement('span')
// 	newTask.innerHTML = ` <!-- <div class="counter">
// 		  <div class="counter__top">
// 		  	 <div class="counter__quantity-text">Количество задач</div>
// 			  <div class="counter__quantity-num">
// 				  <div class="counter__quantity-num-complete"></div>&#47;
// 					<div class="counter__quantity-num-all"></div>
// 			  </div>
// 		</div>
// 		<div class="counter__bottom">Все задачи</div>
// 	</div>

// 	<div class="newTask">
// 		<div class="newTask__container">
// 			<div class="newTask__left">
// 				<span class="newTask__left-title"> ${inputTitle} </span>
// 				<span class="newTask__left-Description"> ${inputDescription} </span>
// 				<span class="newTask__left-level"> ${levelElements} </span>
// 			</div>
// 			<div class="newTask__right">
// 				<span class="newTask__right-time"> ${levelElements} </span>
// 				<div class="newTask__right-btn">
// 					<button class="newTask__btn-complete">complete</button>
// 					<button class="newTask__btn-adit">adit</button>
// 					<button class="newTask__btn-delete">delete</button>
// 				</div>
// 			</div>
// 		</div>
// 	</div> -->

// `
// 	// new Date().getTime()
// 	let parent = document.querySelector('.main__warning')
// 	// console.log(newTask)
// 	parent.append(newTask)
// }


// ...................
function addTask(data) {
	let { title, description, color, level } = data // Получаем данные из объекта

	let newTask = document.createElement('div')
	newTask.className = 'newTask'
	newTask.innerHTML = `
        <div class="newTask__container">
            <div class="newTask__left">
                <span class="newTask__left-title">${title}</span>
                <span class="newTask__left-description">${description}</span>
                <span class="newTask__left-level">${level}</span>
            </div>
            <div class="newTask__right">
                <span class="newTask__right-time">${new Date(
									data.time
								).toLocaleString()}</span>
                <div class="newTask__right-btn">
                    <button class="newTask__btn-complete">complete</button>
                    <button class="newTask__btn-adit">edit</button>
                    <button class="newTask__btn-delete">delete</button>
                </div>
            </div>
        </div>
    `

	let parent = document.querySelector('.main__warning')
	parent.append(newTask)

	let hrElement = document.querySelector('.hr') // Находим элемент <header>
	hrElement.insertAdjacentElement('afterend', newTask) // Вставляем новый элемент после <header>
}
// .........................
// Обработчик для кнопки "delete"
    let deleteButton = document.querySelector('.newTask__btn-delete');
    deleteButton.addEventListener('click', deleteTask()) 
		function deleteTask(){
        removeTask(newTask, time);
    }


function removeTask(taskElement, taskTime) {
    // Удаляем элемент из DOM
    taskElement.remove();

    // Обновляем данные в localStorage
    tasksData = tasksData.filter(task => task.time !== taskTime);
    localStorage.setItem('data', JSON.stringify(tasksData));
}

// ....................

// важные функции
let warningCreate = document.querySelector('.main')
function warningCreateClose() {
	warningCreate.style.display = 'none'
}

// // Создание счётчика
let btnComplete = document.querySelector('.newTask__btn-complete')
let btnDelete = document.querySelector('.newTask__btn-delete')
let counterValueComplete = document.querySelector('.counter__quantity-num-complete')
let counterValueAll = document.querySelector('.counter__quantity-num-all')
let counter = 0
let counterAll = 0
counterValueComplete.innerHTML = counter
counterValueAll.innerHTML = counter

save.addEventListener('click', () => {
	counterAll++
	counterValueAll.innerHTML = counterAll
})
btnComplete.addEventListener('click',() => {
	counter++
	counterValueComplete.innerHTML = counter
})

btnDelete.addEventListener('click', () => {
	if (counter <= 0) {
		counter = 1
	}
	counter--
	counterValueComplete.innerHTML = counter
})
/////////////////////////////////
let addCounter = document.querySelector('.counter')

function checkCounter(){
if(counterAll <= 0){
	addCounter.style.display = 'none'
}
else{
	addCounter.style.display = 'block'
}
}

function inputChange() {
	toggleWarning()
}

for (let creature of modalBtn) {
	creature.addEventListener('click', openModal)
}

function openModal() {
	toggleWarning()
	modalOverlay.style.display = 'block'
	modalDialog.style.display = 'block'
}

function toggleWarning() {
	inputTitle.classList.remove('warning')
	inputDescription.classList.remove('warning')
}

function modalClose(e) {
	e.preventDefault()
	reset()
	toggleWarning()
}

function overlayExit(e) {
	if (e.target === modalOverlay) {
		reset()
	}
}

function reset() {
	modalOverlay.style.display = 'none'
	modalDialog.style.display = 'none'

	inputTitle.value = ''
	inputDescription.value = ''
	// document.querySelector('.modal__input-color').value = ''
	document.querySelectorAll('.modal__input-level').value = ''
	document.querySelector('input[name="level"][value="Low"]').checked = true
}

function warning() {
	inputTitle.value
		? inputTitle.classList.remove('warning')
		: inputTitle.classList.add('warning')
	inputDescription.value
		? inputDescription.classList.remove('warning')
		: inputDescription.classList.add('warning')

	return inputTitle.value && inputDescription.value
}
// основной элемент
// function createTask(e) {
// 	e.preventDefault()
// 	let title = inputTitle.value
// 	let description = inputDescription.value
// 	let color = document.querySelector('.modal__input-color').value
// 	let levelElements = document.querySelectorAll('.modal__input-level')
// 	let level

// 	for (let element of levelElements) {
// 		if (element.checked) {
// 			level = element.value
// 			break
// 		}
// 	}

// 	let values = {
// 		title,
// 		description,
// 		color,
// 		level,
// 		time: new Date().getTime(),
// 	}
// 	tasksData.push(values)
// 	localStorage.setItem('data', JSON.stringify(tasksData))

// 	if (!warning()) return
// 	reset()
// 	warningCreateClose()
// 	addTask()
// }


function createTask(e) {
    e.preventDefault();

    if (!warning()) return;

    let title = inputTitle.value;
    let description = inputDescription.value;
    let color = document.querySelector('.modal__input-color').value;
    let levelElements = document.querySelectorAll('.modal__input-level');
    let level = '';

    levelElements.forEach(element => {
        if (element.checked) {
            level = element.value;
        }
    });

    let newTaskData = {
        title,
        description,
        color,
        level,
        time: new Date().getTime(),
    };

    tasksData.push(newTaskData);
    localStorage.setItem('data', JSON.stringify(tasksData));

    addTask(newTaskData);
    reset();
    warningCreateClose();
		checkCounter()
}

