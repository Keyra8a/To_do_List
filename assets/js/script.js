const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = '';
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => toggleDone(index));

        // Texto
        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.margin = '0 8px';
        span.style.textDecoration = task.done ? 'line-through' : 'none';

        // Botón eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => removeTask(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

function addTask() {
    const text = input.value.trim();
    if (!text) {
        alert('La tarea no puede estar vacía.');
        return;
    }

    const tasks = getTasks();
    tasks.push({ text, done: false });
    saveTasks(tasks);

    input.value = '';
    renderTasks();
}

function toggleDone(index) {
    const tasks = getTasks();
    tasks[index].done = !tasks[index].done;
    saveTasks(tasks);
    renderTasks();
}

function removeTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

addBtn.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', renderTasks);
