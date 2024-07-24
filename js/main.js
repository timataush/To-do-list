let modalBtn = document.querySelectorAll('.header__creature')
let modalOverlay = document.querySelector('.modal__overlay')
let modalDialog = document.querySelector('.modal__dialog')
let modalExit = document.querySelector('.modal__close')
let save = document.querySelector('.btn.ok')
let cancel = document.querySelector('.btn.cancel')

modalExit.addEventListener('click', modalClose)
modalOverlay.addEventListener('click', overlayExit)
save.addEventListener('click', createTask)
cancel.addEventListener('click', modalClose)
let tasksData = JSON.parse(localStorage.getItem('data')) || []

for (let creature of modalBtn) {
	creature.addEventListener('click', openModal)
}

function openModal() {
	toggleWarning()
	modalOverlay.style.display = 'block'
	modalDialog.style.display = 'block'
}

function toggleWarning() {
	let title = document.querySelector('.modal__input-title')
	let description = document.querySelector('.modal__input-description')
	title.classList.remove('warning')
	description.classList.remove('warning')
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

	document.querySelector('.modal__input-title').value = ''
	document.querySelector('.modal__input-description').value = ''
	document.querySelector('.modal__input-color').value = ''
	document.querySelectorAll('.modal__input-level').value = ''
	document.querySelector('input[name="level"][value="Low"]').checked = true
}
function warning() {
	let title = document.querySelector('.modal__input-title')
	let description = document.querySelector('.modal__input-description')
	let valid = true

	if (!title.value) {
		title.classList.add('warning')
		valid = false
	} else {
		title.classList.remove('warning')
	}
	if (!description.value) {
		description.classList.add('warning')
		valid = false
	} else {
		description.classList.remove('warning')
	}
	return valid
}

function createTask(e) {
	e.preventDefault()

	let title = document.querySelector('.modal__input-title').value
	let description = document.querySelector('.modal__input-description').value
	let color = document.querySelector('.modal__input-color').value
	let levelElements = document.querySelectorAll('.modal__input-level')
	let level

	for (let element of levelElements) {
		if (element.checked) {
			level = element.value
			break
		}
	}

	let values = {
		title,
		description,
		color,
		level,
		time: new Date().getTime(),
	}
	tasksData.push(values)
	localStorage.setItem('data', JSON.stringify(tasksData))
	
	if (!warning()) {
		return
	}
  toggleWarning()
	reset()
}

// let title = document.querySelector('.modal__input-title')
// let description = document.querySelector('.modal__input-description')
// title.classList.remove('warning')
// description.classList.remove('warning')
