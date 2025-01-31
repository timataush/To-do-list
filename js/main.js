// Важные объявления переменных
let modalBtn = document.querySelectorAll('.header__creature')
let modalOverlay = document.querySelector('.modal__overlay')
let modalDialog = document.querySelector('.modal__dialog')
let modalExit = document.querySelector('.modal__close')
let save = document.querySelector('.btn.ok')
let cancel = document.querySelector('.btn.cancel')
let inputTitle = document.querySelector('.modal__input-title')
let inputDescription = document.querySelector('.modal__input-description')
let warningCreate = document.querySelector('.main__warning')
let counterElement = document.querySelector('.counter')
let counterValue = document.querySelector('.counter__quantity-num')

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
		counterElement.style.display = 'block'
	}

	counterAll = tasksData.length
	counterValue.innerHTML = `${counter}/${counterAll}`

	// Создание задач из LocalStorage
	tasksData.forEach(task => {
		addTask(task)
	})
}

inputTitle.addEventListener('input', inputChange)
inputDescription.addEventListener('input', inputChange)

function addTask(data) {
	let { title, description, color, level, time, isDone = false } = data

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
                <span class="newTask__right-time">${new Date(time).toLocaleString()}</span>
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

	let newTaskContainer = newTask.querySelector('.newTask__container')
	newTaskContainer.style.borderColor = color

	// Обработчик "delete"
	let deleteButton = newTask.querySelector('.newTask__btn-delete')
	deleteButton.addEventListener('click', () => {
		removeTask(newTask, time)
		if (tasksData.length <= 0) {
			warningCreate.style.display = 'block'
		}
	})

	let completeButton = newTask.querySelector('.newTask__btn-complete')
	completeButton.addEventListener('click', () => {
		toggleCompleteTask(time)
	})

	let editButton = newTask.querySelector('.newTask__btn-edit')
	editButton.addEventListener('click', () => {
		editTask(data)
	})
}

function removeTask(taskElement, taskTime) {
	taskElement.remove()
	tasksData = tasksData.filter(task => task.time !== taskTime)
	localStorage.setItem('data', JSON.stringify(tasksData))
	counterAll--
	counterValue.innerHTML = `${counter}/${counterAll}`
	checkCounter()
}

function toggleCompleteTask(taskTime) {
	let menuComplete = document.querySelector('.menu-complete')
	menuComplete.style.display = 'block'

	let task = tasksData.find(task => task.time === taskTime)

		
		
	if (task) {
		task.isDone = true
		let containerComplete = document.createElement('div')
		containerComplete.className = 'newTask'
		containerComplete.innerHTML = `
	        <div class="newTask__container">
	            <div class="newTask__left">
	                <span class="newTask__left-title">${task.title}</span>
	                <span class="newTask__left-description">${
										task.description
									}</span>
	                <span class="newTask__left-level">${task.level}</span>
	            </div>
	            <div class="newTask__right">
	                <span class="newTask__right-time">${new Date(
										task.time
									).toLocaleString()}</span>
	                <div class="newTask__right-btn">
	                    <button data-action="edit" class="newTask__btn-edit">edit</button>
	                    <button data-action="delete" class="newTask__btn-delete">delete</button>
	                </div>
	            </div>
	        </div>
	    `
		let parent = document.querySelector('.menu-complete')
		parent.append(containerComplete)

		tasksData = tasksData.filter(task => task.time !== taskTime)
		localStorage.setItem('data', JSON.stringify(tasksData))
		// task.remove()
		// removeTask(task, taskTime)

		counter++
		counterValue.innerHTML = `${counter}/${counterAll}`

		// Добавляем обработчики для кнопок выполненной задачи
		containerComplete
			.querySelector('.newTask__btn-delete')
			.addEventListener('click', () => {
				removeTask(containerComplete, task.time)
			})
		containerComplete
			.querySelector('.newTask__btn-edit')
			.addEventListener('click', () => {
				editTask(task)
			})
	}
	
}

function editTask(taskData) {
	openModal()
	inputTitle.value = taskData.title
	inputDescription.value = taskData.description
	document.querySelector('.modal__input-color').value = taskData.color
	document.querySelector(`input[name="level"][value="${taskData.level}"]`).checked = true

	save.removeEventListener('click', createTask)
	save.addEventListener('click', () => {
		updateTask(taskData.time)
	})
}

function updateTask(taskTime) {
	if (!warning()) return

	let updatedTask = {
		title: inputTitle.value,
		description: inputDescription.value,
		color: document.querySelector('.modal__input-color').value,
		level: document.querySelector('input[name="level"]:checked').value,
		time: taskTime,
		isDone: false
	}

	tasksData = tasksData.map(task => task.time === taskTime ? updatedTask : task)
	localStorage.setItem('data', JSON.stringify(tasksData))
	reset()
	init()
}

function checkCounter() {
	if (counterAll <= 0) {
		counterElement.style.display = 'none'
	} else {
		counterElement.style.display = 'block'
	}
}

function inputChange() {
	toggleWarning()
}

modalBtn.forEach(creature => {
	creature.addEventListener('click', openModal)
})

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
	document.querySelector('input[name="level"][value="Low"]').checked = true
	save.removeEventListener('click', updateTask)
	save.addEventListener('click', createTask)
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

function createTask(e) {
	e.preventDefault()

	if (!warning()) return

	warningCreate.style.display = 'none'

	let newTaskData = {
		title: inputTitle.value,
		description: inputDescription.value,
		color: document.querySelector('.modal__input-color').value,
		level: document.querySelector('input[name="level"]:checked').value,
		time: new Date().getTime(),
		isDone: false
	}

	tasksData.push(newTaskData)
	localStorage.setItem('data', JSON.stringify(tasksData))

	addTask(newTaskData)
	reset()

	counterAll++
	counterValue.innerHTML = `${counter}/${counterAll}`
	checkCounter()
}

if (tasksData.length) {
	warningCreate.style.display = 'none'
}
``
