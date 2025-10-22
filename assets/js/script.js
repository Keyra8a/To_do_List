function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const ul = document.getElementById('task-list');
    ul.innerHTML = '';

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        // --- Checkbox ---
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => toggleDone(index));

        // --- Texto de la tarea ---
        const span = document.createElement('span');
        span.textContent = task.text;
        span.style.textDecoration = task.done ? 'line-through' : 'none';
        span.classList.add('task-text');

        // --- Botón Editar ---
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.addEventListener('click', () => editTask(index));

        // --- Botón Eliminar ---
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => deleteTask(index));

        // Agregar todo al <li>
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById('task-input');
    const text = input.value.trim();

    if (text === '') {
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

function editTask(index) {
    const tasks = getTasks();
    const currentText = tasks[index].text;

    const newText = prompt('Editar tarea:', currentText);

    if (newText !== null) { 
        const trimmed = newText.trim();
        if (trimmed !== '') {
            tasks[index].text = trimmed;
            saveTasks(tasks);
            renderTasks();
        } else {
            alert('La tarea no puede quedar vacía.');
        }
    }
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-task-btn');
    addBtn.addEventListener('click', addTask);

    // Crear lista si no existe aún
    if (!document.getElementById('task-list')) {
        const ul = document.createElement('ul');
        ul.id = 'task-list';
        document.querySelector('.todo-container').appendChild(ul);
    }

    renderTasks();
});
