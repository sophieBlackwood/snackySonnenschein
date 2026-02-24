/* ================================================= */
/* ELEMENTS */
/* ================================================= */

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

const squirrelFact = document.getElementById("squirrel-fact");
const newFactBtn = document.getElementById("new-fact");

/* ================================================= */
/* STORAGE */
/* ================================================= */

const TASKS_KEY = "snacky_tasks";

/* ================================================= */
/* TASKS */
/* ================================================= */

let tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">
          <i class="fa-solid fa-check"></i>
        </button>
        <button onclick="deleteTask(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

renderTasks();

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});

window.toggleTask = function(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
};

window.deleteTask = function(index) {
  tasks.splice(index, 1);
  renderTasks();
};

/* ================================================= */
/* SQUIRREL FACTS */
/* ================================================= */

const squirrelFacts = [
  "Squirrels plant thousands of trees every year by forgetting where they buried acorns.",
  "A squirrel’s front teeth never stop growing.",
  "Squirrels can leap up to 10 times their body length.",
  "They use their tails for balance — and as blankets.",
  "Some squirrels pretend to bury nuts to trick thieves watching them.",
  "They can rotate their ankles 180 degrees to climb down trees head-first.",
  "Baby squirrels are called kits.",
  "Squirrels have excellent memory… most of the time."
  "Wingardium Leviosa!"
];

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * squirrelFacts.length);
  squirrelFact.textContent = squirrelFacts[randomIndex];
}

newFactBtn.addEventListener("click", showRandomFact);

showRandomFact();
