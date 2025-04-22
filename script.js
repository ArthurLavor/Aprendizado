const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function renderTasks() {

    todoList.innerHTML = '';
    const tasks = loadTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => toggleTask(index));

        const deletebtn = document.createElement('button')
        deletebtn.textContent = 'excluir';
        deletebtn.classList.add('delete-btn');
        deletebtn.addEventListener('click', () => deleteTask(deletebtn));

        li.appendChild(span);
        li.appendChild(deletebtn);
        todoList.appendChild(li);
    })
}

function addTask() {
    const text = newTaskInput.value.trim();
    if(text !== ''){
        const tasks = loadTasks();
        tasks.push ({text: text, completed: false});
        saveTasks(tasks);
        newTaskInput.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    const tasks = loadTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    const tasks = loadTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keyup', (event) => {
    if(event.key === 'enter'){
        addTask();
    }
})

renderTasks();