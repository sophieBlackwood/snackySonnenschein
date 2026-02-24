/* ============================= */
/* ELEMENTS */
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const trashBin = document.getElementById("trash-bin");

const squirrelFact = document.getElementById("squirrel-fact");
const newFactBtn = document.getElementById("new-fact");

const TASKS_KEY = "snacky_tasks";
let tasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];

/* ============================= */
/* RENDER TASKS */
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
      </div>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

renderTasks();

/* ============================= */
/* ADD TASK */
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

/* ============================= */
/* COMPLETE TASK + ACORNS */
window.toggleTask = function(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
  launchAcorns();
};

/* ============================= */
/* FALLING ACORNS */
function launchAcorns() {
  for (let i = 0; i < 5; i++) {
    const acorn = document.createElement("div");
    acorn.classList.add("acorn");

    const rect = taskList.getBoundingClientRect();
    acorn.style.left = rect.left + Math.random() * rect.width + "px";
    acorn.style.top = rect.top + "px";

    document.body.appendChild(acorn);
    setTimeout(() => acorn.remove(), 1800);
  }
}

/* ============================= */
/* TRASH ALL */
trashBin.addEventListener("click", () => {
  const items = document.querySelectorAll(".todo-item");
  if (items.length === 0) return;

  trashBin.classList.add("shake");

  items.forEach((item, i) => {
    setTimeout(() => item.classList.add("crumple"), i * 100);
  });

  setTimeout(() => {
    tasks = [];
    renderTasks();
    trashBin.classList.remove("shake");
    launchAcorns();
  }, 800);
});

/* ============================= */
/* SQUIRREL FACTS */
const squirrelFacts = [
  "Squirrels plant thousands of trees every year by forgetting where they buried acorns.",
  "A squirrel’s front teeth never stop growing.",
  "Squirrels can leap up to 10 times their body length.",
  "They use their tails for balance — and as blankets.",
  "Some squirrels pretend to bury nuts to trick thieves watching them.",
  "They can rotate their ankles 180 degrees to climb down trees head-first.",
  "Baby squirrels are called kits.",
  "Squirrels have excellent memory… most of the time.",
  "Even squirrels need snack breaks.",
  "Wingardium Leviosa!"
];

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * squirrelFacts.length);
  squirrelFact.textContent = squirrelFacts[randomIndex];
}

newFactBtn.addEventListener("click", showRandomFact);
showRandomFact();
