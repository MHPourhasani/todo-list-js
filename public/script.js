const $ = document;
const inputElem = $.querySelector('#inputElem');
const addTodoBtn = $.querySelector('#addTodoBtn');

const notStatusTodoList = $.querySelector('#notStatusTodoList');
// const inputElem = $.querySelector('#inputElem');
// const inputElem = $.querySelector('#inputElem');

// create todos Array
let todosArray = [];

// create addTodo function ==> addTodoBtn event Listener
function addTodo(params) {
	let inputValue = inputElem.value.trim();

	if (inputValue) {
		let newTodoObj = {
			id: todosArray.length + 1,
			todoTitle: inputValue,
			status: 'not Status',
		};

		todosArray.push(newTodoObj);
		setlocalStorageFunc(todosArray);
		addTodoToNotStatus(todosArray);
		console.log(todosArray);

		inputElem.classList.add('border-violet-600');
	} else {
		inputElem.classList.remove('border-violet-600');
		inputElem.classList.add('border-red-600');
		inputElem.placeholder = 'Invalid Todo ...';
	}
}

// add todos to not status section
function addTodoToNotStatus(todosArray) {
	let newLiElem, newLableElem, newDivElem, newCompleteBtn, newDeleteBtn;

	todosArray.forEach(function (todo) {
		newLiElem = $.createElement('li');
		newLiElem.className = 'w-11/12 my-1 p-2 flex items-center justify-between';

		newLableElem = $.createElement('lable');
		newLableElem.innerHTML = todo.todoTitle;
		newLableElem.className = 'text-gray-700 text-sm';

		newDivElem = $.createElement('div');
		newDivElem.className = 'flex items-center justify-center';

		newCompleteBtn = $.createElement('button');
		newCompleteBtn.innerHTML = '<i class="fa-light fa-squarw-check"></i>';
		newCompleteBtn.className = 'bg-green-500 mx-1 rounded-md flex items-center justify-center';

		newDeleteBtn = $.createElement('button');
		newDeleteBtn.innerHTML = '<i class="fa-light fa-trash"></i>';
		newDeleteBtn.className = 'bg-red-500 mx-1 rounded-md flex items-center justify-center';

		// append newCompleteBtn and newDeleteBtn to newDivElem
		newDivElem.append(newCompleteBtn, newDeleteBtn);
		// append newLableElem and newDivElem to newLiElem
		newLiElem.append(newLableElem, newDivElem);
		// append newLiElem to notStatusTodoList
		notStatusTodoList.append(newLiElem);

		inputElem.value = '';
	});
}

// localStorage Function
function setlocalStorageFunc(todosArray) {
	localStorage.setItem('todos', JSON.stringify(todosArray));
}

// create addTodoBtn Event Listener
addTodoBtn.addEventListener('click', addTodo);
