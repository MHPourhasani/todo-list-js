const $ = document;
const hamMenu = $.querySelector('.hamMenu');

const inputElem = $.querySelector('#inputElem');
const addTodoBtn = $.querySelector('#addTodoBtn');
const clearInputBtn = $.querySelector('#clearInputBtn');

const inCompleteTodoList = $.querySelector('#inCompleteTodoList');
// const inputElem = $.querySelector('#inputElem');
// const inputElem = $.querySelector('#inputElem');

// create todos Array
let todosArray = [];

// create addTodo function ==> addTodoBtn event Listener
clearInputBtn.addEventListener('click', function () {
	inputElem.value = '';
});

// create addTodo function ==> addTodoBtn event Listener
function addTodo() {
	let inputValue = inputElem.value.trim();

	if (inputValue) {
		let newTodoObj = {
			id: todosArray.length + 1,
			todoTitle: inputValue,
			status: 'inComplete',
		};
		todosArray.push(newTodoObj);
		setlocalStorageFunc(todosArray);
		addTodoGenerator(todosArray);
		console.log(todosArray);

		inputElem.classList.add('border-violet-600');
		inputElem.classList.remove('border-red-600', 'placeholder:text-red-600');
		inputElem.placeholder = 'Add new Todo ...';
	} else {
		inputElem.classList.remove('border-violet-600');
		inputElem.placeholder = 'Invalid Todo ...';
		inputElem.classList.add('border-red-600', 'placeholder:text-red-600');
	}
}

// add todos to not status section
function addTodoGenerator(todosArray) {
	let newLiElem, newLableElem, newDivElem, newDoingBtn, newCompleteBtn, newDeleteBtn;
	inCompleteTodoList.innerHTML = '';

	todosArray.forEach(function (todo) {
		newLiElem = $.createElement('li');
		newLiElem.className =
			'w-11/12 my-2 p-2 border-b-1 border-gray-300 flex items-center justify-between';

		newLableElem = $.createElement('lable');
		newLableElem.innerHTML = todo.todoTitle;
		newLableElem.className = 'text-gray-700 text-sm';

		// newDivElem
		newDivElem = $.createElement('div');
		newDivElem.className = 'flex items-center justify-center';

		// newDoingBtn
		newDoingBtn = $.createElement('button');
		// newCompleteBtn.innerHTML = '<i class="fa-light fa-squarw-check"></i>';
		newDoingBtn.innerHTML = 'Doing';
		newDoingBtn.className =
			'bg-sky-500 mx-1 text-white text-sm rounded-md flex items-center justify-center';

		// newCompleteBtn
		newCompleteBtn = $.createElement('button');
		// newCompleteBtn.innerHTML = '<i class="fa-light fa-squarw-check"></i>';
		newCompleteBtn.innerHTML = '<i class="bi bi-check2-square"></i>';
		// newCompleteBtn.innerHTML = 'complete';
		newCompleteBtn.className =
			'bg-green-500 mx-1 text-white text-sm rounded-md flex items-center justify-center';

		// newDeleteBtn add delete handler
		newDeleteBtn = $.createElement('button');
		// let newIElem = $.createElement('i');
		// newIElem.className='class="bi bi-trash">'
		// newDeleteBtn.append(newIElem)
		newDeleteBtn.innerHTML = '&#xF5DE';
		// newDeleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';

		// newDeleteBtn.innerHTML = 'delete';
		newDeleteBtn.className =
			'bg-red-500 mx-1 text-white text-sm rounded-md flex items-center justify-center';
		newDeleteBtn.addEventListener('click', function (e) {
			e.target.parentElement.parentElement.remove();
		});

		// append newCompleteBtn and newDeleteBtn to newDivElem
		newDivElem.append(newDoingBtn, newCompleteBtn, newDeleteBtn);
		// append newLableElem and newDivElem to newLiElem
		newLiElem.append(newLableElem, newDivElem);
		// append newLiElem to inCompleteTodoList
		inCompleteTodoList.append(newLiElem);

		inputElem.value = '';
	});
}

// set localStorage Function
function setlocalStorageFunc(todosArray) {
	localStorage.setItem('todos', JSON.stringify(todosArray));
}

// get localStorage Function
function getlocalStorageFunc() {
	let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
	if (localStorageTodos) {
		todosArray = localStorageTodos;
	} else {
		todosArray = [];
	}
	
	addTodoGenerator(todosArray);
}

// create load Window Event Listener
window.addEventListener('load', getlocalStorageFunc);

// create addTodoBtn Event Listener
addTodoBtn.addEventListener('click', addTodo);
// addTodoBtn.addEventListener('touchend', addTodo);
inputElem.addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		addTodo();
	}
});
