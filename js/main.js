// Важные объявления переменных
let modalBtn = document.querySelectorAll('.header__creature')
let modalOverlay = document.querySelector('.modal__overlay')
let modalDialog = document.querySelector('.modal__dialog')
let modalExit = document.querySelector('.modal__close')
let save = document.querySelector('.btn.ok')
let cancel = document.querySelector('.btn.cancel')
let inputTitle = document.querySelector('.modal__input-title')
let inputDescription = document.querySelector('.modal__input-description')
let warningCreate = document.querySelector('.main')
let addCounter = document.querySelector('.counter')
let counterValueComplete = document.querySelector('.counter__quantity-num-complete')
let counterValueAll = document.querySelector('.counter__quantity-num-all')

// Обработчики событий
modalExit.addEventListener('click', modalClose)
modalOverlay.addEventListener('click', overlayExit)
save.addEventListener('click', createTask)
cancel.addEventListener('click', modalClose)





// Счетчики задач
let counter = 0
let counterAll = 0

// LocalStorage
let tasksData = JSON.parse(localStorage.getItem('data')) || []

init()
function init() {
	if (tasksData.length) {
		warningCreate.style.display = 'none'
		addCounter.style.display = 'block'
	}
	counter = 0
	counterAll = tasksData.length
	counterValueComplete.innerHTML = counter
	counterValueAll.innerHTML = counterAll

	// Создание задач из LocalStorage
	tasksData.forEach(element => {
		addTask(element)
	})
}

inputTitle.addEventListener('input', inputChange)
inputDescription.addEventListener('input', inputChange)

function addTask(data) {
	let { title, description, color, level, time } = data

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
									time
								).toLocaleString()}</span>
                <div class="newTask__right-btn">
                    <button data-action="complete" class="newTask__btn-complete">complete</button>
                    <button data-action="edit" class="newTask__btn-edit">edit</button>
                    <button data-action="delete" class="newTask__btn-delete">delete</button>
                </div>
            </div>
        </div>
    `

	let parent = document.querySelector('.counter')
	parent.insertAdjacentElement('afterend', newTask)

	let newTaskContainer = document.querySelector('.newTask__container')
	newTaskContainer.style.borderColor = color

	// Обработчик "delete"
	let deleteButton = newTask.querySelector('.newTask__btn-delete')
	deleteButton.addEventListener('click', () => {
		removeTask(newTask, time)
		if (tasksData.length <= 0) {
			warningCreate.style.display = 'block'
		}
	})

	// обработчик "edit"
	
	// let editButton = document.querySelector('.newTask__btn-edit') 
  // editButton.addEventListener('click', () => {
	// 	editTask(index, time)
	// })
	

	// Обработчик "complete"
	let completeButton = newTask.querySelector('.newTask__btn-complete')
	completeButton.addEventListener('click', () => {
		let menuComplete = document.querySelector('.menuComplete')
		menuComplete.style.display = 'block'

		counter++
		counterValueComplete.innerHTML = counter
	})
}

// исправляю чужой код
// function editTask(index, time) {
// 	if (!curTask.classList.contains('edit')) {
// 		// При первом нажатии на кнопку редактирования, начинаем редактировать.
// 		curTask.classList.add('edit') // Добавляем класс
// 		curTask.querySelector(
// 			'.task'
// 		).innerHTML = `<input type="test" value="${tasks[index].task}">` // Вместо задачи добавляем инпут с редактированием
// 	} else {
// 		// При втором нажатии, когда класс `.edit` есть, мы сохраним
// 		let newTask = curTask.querySelector('.task > input').value
// 		tasks[index].task = newTask
// 		curTask.querySelector('.task').innerText = newTask
// 		curTask.classList.remove('edit')
// 		// storage();
// 	}
// }

function removeTask(taskElement, taskTime) {
	// Удаляем элемент из DOM
	taskElement.remove()

	// Обновляем данные в localStorage
	tasksData = tasksData.filter(task => task.time !== taskTime)
	localStorage.setItem('data', JSON.stringify(tasksData))

	// Обновляем счетчик задач
	counterAll--
	counterValueAll.innerHTML = counterAll

	// Проверка необходимости отображения счетчика задач
	checkCounter()
}

function checkCounter() {
	if (counterAll <= 0) {
		addCounter.style.display = 'none'
	} else {
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
// на всякий случай
if (tasksData.length) {
	warningCreate.style.display = 'none'
}

function createTask(e) {
	e.preventDefault()

	if (!warning()) return

	warningCreate.style.display = 'none'

	let title = inputTitle.value
	let description = inputDescription.value
	let color = document.querySelector('.modal__input-color').value
	let levelElements = document.querySelectorAll('.modal__input-level')
	let level = ''

	levelElements.forEach(element => {
		if (element.checked) {
			level = element.value
		}
	})

	let newTaskData = {
		title,
		description,
		color,
		level,
		time: new Date().getTime(),
	}

	tasksData.push(newTaskData)
	localStorage.setItem('data', JSON.stringify(tasksData))

	addTask(newTaskData)
	reset()

	// Обновляем счётчик задач
	counterAll++
	counterValueAll.innerHTML = counterAll
	checkCounter()
}

