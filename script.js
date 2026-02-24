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
    li.setAttribute("draggable", "true");
    li.dataset.index = index;

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

    // Drag events
    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", (e) => {
      li.classList.remove("dragging");
      const rect = trashBin.getBoundingClientRect();
      // Use clientX/clientY instead of pageX/pageY because no scrolling
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        removeTask(index, li);
      }
    });
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
    const acorn = document.createElement("i");
    acorn.classList.add("fa-solid", "fa-acorn", "acorn");

    acorn.style.left = Math.random() * window.innerWidth + "px";
    acorn.style.top = "-20px";
    acorn.style.fontSize = 12 + Math.random() * 14 + "px";
    acorn.style.animationDuration = 2 + Math.random() + "s";

    const sway = Math.random() > 0.5 ? 1 : -1;
    acorn.style.setProperty("--sway-dir", sway);

    document.body.appendChild(acorn);

    setTimeout(() => acorn.remove(), 2500);
  }
}

/* ============================= */
/* REMOVE SINGLE TASK */
function removeTask(index, liElement) {
  liElement.classList.add("crumple");

  setTimeout(() => {
    tasks.splice(index, 1);
    renderTasks();
    launchAcorns();
  }, 700);

  // Shake trash bin
  trashBin.classList.add("shake");
  setTimeout(() => trashBin.classList.remove("shake"), 400);
}

/* ============================= */
/* SQUIRREL FACTS */
const squirrelFacts = [
  // 🐿️ SQUIRRELS (feral energy)
  "Squirrels can survive falls from extreme heights because their terminal velocity is low.",
  "A squirrel’s teeth never stop growing — ever.",
  "Squirrels ankles rotate 180 degrees so they can descend trees headfirst like tiny parkour demons.",
  "Grey squirrels can remember thousands of nut locations.",
  "In some cities, squirrels recognize humans who feed them.",
  "A group of squirrels is called a scurry.",

  // 🩰 DANCE / BALLET
  "Pointe shoes contain no wood — just glue, fabric, and pain.",
  "Male ballet dancers lift partners that can weigh more than they do.",
  "Professional dancers can have resting heart rates similar to elite athletes.",
  "Some contemporary choreography is structured using Fibonacci spirals.",
  "Ballet originated in royal courts before it was performed on stage.",
  "Your brain rewires faster when learning choreography than when memorizing text.",

  // 💻 CODE
  "The first computer bug was an actual moth trapped in hardware (1947).",
  "JavaScript was created in 10 days and now runs the internet.",
  "A missing semicolon has caused billion-dollar outages.",
  "CSS specificity is calculated as a weighted hierarchy, not a single number.",
  "There are more possible chess games than atoms in the observable universe — and computers can calculate many of them.",
  "The Apollo 11 guidance computer had less processing power than a calculator.",
  "Indentation errors have launched rockets incorrectly.",
  "The word 'robot' comes from a Czech word meaning forced labor.",

  // 🎲 D&D
  "Critical hits were not in the original D&D rules.",
  "Alignment used to be only Law vs Chaos — no Good or Evil.",
  "The Beholder was inspired by a nightmare.",
  "Rolling a natural 20 gives you a 5% miracle probability.",
  "Early D&D included random dungeon generation tables.",
  "Dice probability curves change drastically between a d20 and 3d6.",
  "Some campaigns have lasted over 30 real-world years.",
  "Mimics exist because players kept trusting treasure chests.",

  // 🧠 PSYCHOLOGY
  "Your brain predicts reality before you consciously perceive it.",
  "Memory is reconstructed every time you recall it.",
  "Rejection activates the same brain regions as physical pain.",
  "The mere-exposure effect makes you like things just because you see them often.",
  "Cognitive dissonance can make people defend obviously wrong beliefs.",
  "Your brain can fill in visual gaps without you noticing.",
  "Sleep deprivation can mimic symptoms of anxiety disorders.",
  "Humans are terrible at intuitively understanding probability.",
  "Confidence and competence are only weakly correlated.",

  // 🔥 EXTRA CHAOTIC
  "Octopuses have three hearts and blue blood.",
  "Bananas are berries. Strawberries are not.",
  "Sharks existed before trees.",
  "Honey found in ancient tombs is still edible.",
  "There are more trees on Earth than stars in the Milky Way.",
  "Time moves slightly faster on a mountain than at sea level.",
  "You are statistically more likely to die taking a selfie than from a shark attack.",

  // LUKE
  "Have you eaten today?",
  "Wingardium Leviosa!",
];

function showRandomFact() {
  const randomIndex = Math.floor(Math.random() * squirrelFacts.length);
  squirrelFact.textContent = squirrelFacts[randomIndex];
}

newFactBtn.addEventListener("click", showRandomFact);
showRandomFact();
