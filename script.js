// Get references to DOM elements
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

// Creates and returns an <li> element for a task
function createTaskElement(task) {
  const li = document.createElement('li');
  li.classList.add('todo-list-li');
  li.textContent = task.title;

  // (Optional) Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.style.marginLeft = '10px';
  // This event handler calls deleteTask (make sure your server supports DELETE)
  deleteButton.addEventListener('click', () => deleteTask(task.id));
  li.appendChild(deleteButton);

  return li;
}

// Fetch and render tasks from the server (using the GET /tasks endpoint)
function loadTasks() {
  fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      // Clear the current list
      todoList.innerHTML = '';
      tasks.forEach(task => {
        const li = createTaskElement(task);
        todoList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Send a new task to the server (using the POST /tasks endpoint)
function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: taskText,
        description: '' // update if you include a description field in your UI
      })
    })
    .then(response => response.json())
    .then(newTask => {
      // Option 1: Append the new task without reloading entire list:
      const li = createTaskElement(newTask);
      todoList.appendChild(li);
      
      // Clear the input field
      newTaskInput.value = '';
      
      // Option 2: Alternatively, comment out the above and simply reload all tasks:
      // loadTasks();
    })
    .catch(error => console.error('Error adding task:', error));
  }
}

// (Optional) Delete a task by sending a DELETE request (ensure you implement this endpoint on your server)
function deleteTask(taskId) {
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Remove the task from the UI by reloading the list
      loadTasks();
    } else {
      console.error('Failed to delete task with id', taskId);
    }
  })
  .catch(error => console.error('Error deleting task:', error));
}

// Attach event listeners
addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Load tasks when the page loads
window.onload = loadTasks;