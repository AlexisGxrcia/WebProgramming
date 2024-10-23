let selectedIndex = 'all';
let selectedCategory = 'all';

const defaultTasks = {
    'Buy Bananas': {
        category: 'all',
        finished: false
    },
    'Buy Play': {
        category: 'work',
        finished: true
    },
};

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');

    if (!storedTasks) {
        localStorage.setItem('tasks', JSON.stringify(defaultTasks));
        return defaultTasks;
    }

    return JSON.parse(storedTasks);
}

const tasks = loadTasks();
JSON.stringify(tasks)

const addTask = () => {
    const name = document.getElementById('input-task').value;

    if (name.length < 1) {
        alert('The task field cannot be empty');
        return;
    }

    tasks[name] = {
        category: selectedCategory,
        finished: false
    };

    localStorage.setItem('tasks', JSON.stringify(tasks));
    addDisplayAddTask(true);
    updateSelectedIndex();
}

const updateSelectedIndex = () => {
    document.querySelectorAll('.task-category').forEach(li => {
        if (li.getAttribute('data-id') === selectedIndex) li.style.fontWeight = 'bold'
        else li.style.fontWeight = 'normal'

        const taskList = document.getElementById('taskList');

        taskList.innerHTML = '';
        const searchResults = document.getElementById('search-task').value;
        console.log(searchResults);

        if (selectedIndex !== 'all') {
            Object.entries(tasks).filter(([taskName, taskDetails]) => taskDetails.category === selectedIndex && (searchResults.length === 0 || taskName.includes(searchResults))).forEach(([taskName, taskDetails]) => {
                createTaskElement(taskName, taskDetails.category, taskDetails.finished);
            });
        } else {
            Object.entries(tasks).filter(([taskName, taskDetails]) => taskName.includes(searchResults) || searchResults.length === 0).forEach(([taskName, taskDetails]) => {
                createTaskElement(taskName, taskDetails.category, taskDetails.finished);
            });
        }
    });
}

const updateSelectedCategory = () => {
    Array.from(document.getElementById('select-category').children).forEach(li => {
        if (li.getAttribute('data-id') === selectedCategory) {
            li.style.border = '1px solid rgba(0, 0, 0, 0.53)'
            li.style.boxShadow = '1px 1px 8px rgba(0, 0, 0, 0.55)'
        } else {
            li.style.border = 'none'
            li.style.boxShadow = 'none'
        }
    });
}

const toggleComplete = (checkbox) => {
    const task = checkbox.nextElementSibling;
    if (checkbox.checked) {
        tasks[task.textContent].finished = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.classList.toggle('completed');
    } else {
        tasks[task.textContent].finished = false;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.classList.remove('completed');
    }
}

const addDisplayAddTask = (remove = false) => {
    document.querySelector('.add-task').style.display = remove ? 'none' : 'block';
    document.querySelector('.main').style.filter = remove ? '' : 'blur(5px)';

    if (remove) {
        Array.from(document.querySelector('.main').children).forEach(child => child.style.pointerEvents = '')
    } else Array.from(document.querySelector('.main').children).forEach(child => child.style.pointerEvents = 'none');
}

const createTaskElement = (task, category, checked) => {
    const li = document.createElement('li');
    li.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.onclick = function() {toggleComplete(this)};

    const taskSpan = document.createElement('span');
    if (checked) taskSpan.classList.add('completed')
    taskSpan.textContent = task;

    const labelSpan = document.createElement('span');
    labelSpan.textContent = category;
    labelSpan.classList.add('label-all', 'label-' + category);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');

    deleteIcon.onclick = function() {
        delete tasks[task];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskList.removeChild(li);
    };

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(labelSpan);
    li.appendChild(deleteIcon);

    const taskList = document.getElementById('taskList');
    taskList.appendChild(li);
}

Array.from(document.getElementById('select-category').children).forEach(li => {
    li.addEventListener('click', () => {
        selectedCategory = li.getAttribute('data-id');
        updateSelectedCategory();
    })
});

document.querySelectorAll('.task-category').forEach(li => {
    li.addEventListener('click', () => {
        selectedIndex = li.getAttribute('data-id');
        updateSelectedIndex();
    })
});

document.getElementById('search-task').addEventListener('keydown', () => updateSelectedIndex())
document.querySelector('.close-icon').addEventListener('click', () => addDisplayAddTask(true))
document.getElementById('add-task').addEventListener('click', () => {
    selectedCategory = 'all'
    addDisplayAddTask();
    updateSelectedCategory();
})

updateSelectedIndex();