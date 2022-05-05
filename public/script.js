const $ = document;
const inputElem = $.querySelector('#inputElem');
const addTodoBtn = $.querySelector('#addTodoBtn');

const inCompleteTodoList = $.querySelector('#inCompleteTodoList');
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
		inputElem.classList.remove('border-red-600', 'placeholder:text-red-600');
	} else {
		inputElem.classList.remove('border-violet-600');
		inputElem.placeholder = 'Invalid Todo ...';
		inputElem.classList.add('border-red-600', 'placeholder:text-red-600');
	}
}

// add todos to not status section
function addTodoToNotStatus(todosArray) {
	let newLiElem, newLableElem, newDivElem, newDoingBtn, newCompleteBtn, newDeleteBtn;

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
		newCompleteBtn.innerHTML = 'complete';
		newCompleteBtn.className =
			'bg-green-500 mx-1 text-white text-sm rounded-md flex items-center justify-center';

		// newDeleteBtn add delete handler
		newDeleteBtn = $.createElement('button');
		// newDeleteBtn.innerHTML = '<i class="fa-light fa-trash"></i>';
		newDeleteBtn.innerHTML = 'delete';
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

// localStorage Function
function setlocalStorageFunc(todosArray) {
	localStorage.setItem('todos', JSON.stringify(todosArray));
}

// create addTodoBtn Event Listener
addTodoBtn.addEventListener('click', addTodo);
inputElem.addEventListener('keydown', function (e) {
	if (e.keyCode === 13) {
		addTodo();
	}
});
