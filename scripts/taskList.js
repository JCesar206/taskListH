const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => renderTask(task));
taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text === "") return;

  const newTask = { text, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  taskInput.value = "";
});

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;
  if (task.completed) li.classList.add("completed");

  li.addEventListener("click", () => { 
  task.completed = !task.completed;
  li.classList.toggle("completed");
  saveTasks();
});

const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";

  deleteBtn.addEventListener("click", e => {
  e.stopPropagation();
  tasks = tasks.filter(t => t !== task);
  saveTasks();
  li.remove();
});

  li.appendChild(deleteBtn);
  taskList.appendChild(li); 
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
}