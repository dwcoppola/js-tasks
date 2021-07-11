function setUpLocalStorage() {
    localStorage.nextID === undefined ? localStorage.nextID = 0 : false;
}

function incrementID() {
    localStorage.nextID = Number(localStorage.nextID) + 1;
}

function createTask(name, dueDate) {
    let date = new Date(Date.parse(dueDate) + 14400000)
        .toString().slice(0, 15)
    if (date === "Invalid Date") {
        date = new Date().toString().slice(0, 15)
    }
    const task = {
        'id': localStorage.nextID,
        'name': name,
        'dueDate': date,
        'complete': false
    }
    localStorage[`task-${task.id}`] = JSON.stringify(task);
    incrementID();
}

function getOneTask(id) {
    if (localStorage[`task-${id}`]) {
        return JSON.parse(localStorage[`task-${id}`]);
    } else {
        return false;
    }
}

function getAllTasks() {
    let output = [];
    for (let i=0; i<Number(localStorage.nextID); i++) {
        if (getOneTask(i)) {
            output.push(getOneTask(i)) 
        } 
    }
    return output;
}

function deleteTask(id) {
    localStorage.removeItem(`task-${id}`);
}

function editTask(id, key, newValue) {
    const keys = ['name', 'dueDate'];
    let task = getOneTask(id);
    if (task && newValue && keys.includes(key)) {
        if (key === 'name') {
            task[key] = newValue
        } else {
            let date = new Date(Date.parse(newValue) + 14400000)
                .toString().slice(0, 15);
            date === "Invalid Date" ? 
            task.dueDate = new Date().toString().slice(0, 15) : 
            task.dueDate = date;
        }
        localStorage[`task-${id}`] = JSON.stringify(task);
    }
}

function editTaskDate(id, newDueDate) {
    let task = getOneTask(id);
    if (task && newDueDate) {

        localStorage[`task-${id}`] = JSON.stringify(task);
    } 
}

function toggleComplete(id) {
    let task = getOneTask(id);
    if (task) {
        task.complete ? task.complete = false : task.complete = true;
        localStorage[`task-${id}`] = JSON.stringify(task);
    } 
}

// INTERFACE

function renderMain() {
    const main = document.getElementById('main');
    const tasks = getAllTasks();
    main.innerHTML = 
    `
    <h2>Tasks</h2>
    <div id="task-list">
    </div>
    `
    const list = document.getElementById('task-list');
    for (task of tasks) {
        list.innerHTML +=
        `
        <div class="list-item" id="${task.id}">
            <span>${task.name}</span>
            <span class="right">Due ${task.dueDate}</span>
        </div>
        `
    }
}

setUpLocalStorage();
renderMain();
