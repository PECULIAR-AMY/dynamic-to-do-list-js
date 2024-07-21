document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push(taskItem.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task element
    function createTaskElement(taskText) {
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        removeButton.onclick = function() {
            taskList.removeChild(newTask);
            saveTasks();
        };

        newTask.appendChild(removeButton);
        taskList.appendChild(newTask);
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task');
        } else {
            createTaskElement(taskText);
            saveTasks();
            taskInput.value = '';
        }
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from local storage when the DOM has fully loaded
    loadTasks();

    console.log('The DOM has fully loaded');
});