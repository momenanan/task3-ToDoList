document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    tasks.forEach((task, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        
        let taskText = document.createElement("span");
        taskText.textContent = task;
        taskText.contentEditable = true;
        taskText.onblur = () => saveTask(index, taskText.textContent);
        
        let editBtn = document.createElement("i");
        editBtn.classList.add("ri-edit-box-line", "icon");
        editBtn.onclick = () => editTask(index);
        
        let deleteBtn = document.createElement("i");
        deleteBtn.classList.add("ri-delete-bin-line", "icon");
        deleteBtn.onclick = () => deleteTask(index);
        
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(deleteBtn);
        
        taskList.appendChild(taskDiv);
    });
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let taskText = document.getElementsByClassName("task")[index].getElementsByTagName("span")[0];
    taskText.contentEditable = true;
    taskText.focus();
}

function saveTask(index, updatedText) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index] = updatedText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function loadTasks() {
    renderTasks();
}
