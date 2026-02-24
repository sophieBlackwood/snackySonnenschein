document.addEventListener("DOMContentLoaded", () => {

  /* ---- THEME TOGGLE ---- */
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  const setIcon = () => {
    const isDark = document.body.classList.contains("dark");
    themeToggle.innerHTML = isDark
      ? '<i class="fa-regular fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  };
  setIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
    setIcon();
  });

  /* ---- TODO SYSTEM ---- */
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, idx) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
          <button class="complete-btn"><i class="fa-solid fa-check"></i></button>
          <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;

      li.querySelector(".complete-btn").addEventListener("click", () => {
        tasks[idx].completed = !tasks[idx].completed;
        saveTasks();
        renderTasks();
        confettiBurst(li);
      });
      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(idx, 1);
        saveTasks();
        renderTasks();
      });
      taskList.appendChild(li);
    });
  };

  addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  renderTasks();

  /* ---- REMINDERS ---- */
  const reminderCard = document.getElementById("reminder-card");
  const reminderText = document.getElementById("reminder-text");
  const dismissBtn = document.getElementById("dismiss-reminder");

  const reminderMessages = {
    morning: ["Good morning, sunshine. Eat something ☀️", "Sun’s up! Breakfast time!"],
    lunch: ["It’s 12:10! Lunchtime 🍽️", "Hi! Don’t forget lunch 😋"],
    dinner: ["Evening check-in. Eat dinner 🌙", "Luke would raise an eyebrow now. Go eat!"]
  };

  const getTodayKey = (type) => {
    const today = new Date().toISOString().split("T")[0];
    return `reminder-${type}-${today}`;
  };

  const showReminder = (type) => {
    if (localStorage.getItem(getTodayKey(type))) return;

    const messages = reminderMessages[type];
    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];

    reminderText.textContent = randomMessage;
    reminderCard.classList.remove("hidden");
  };

  dismissBtn.addEventListener("click", () => {
    reminderCard.classList.add("hidden");
  });

  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 6 && now.getMinutes() === 0) {
      localStorage.setItem(getTodayKey("morning"), "shown");
      showReminder("morning");
    }
    if (now.getHours() === 12 && now.getMinutes() === 10) {
      localStorage.setItem(getTodayKey("lunch"), "shown");
      showReminder("lunch");
    }
    if (now.getHours() === 18 && now.getMinutes() === 0) { 
      localStorage.setItem(getTodayKey("dinner"), "shown");
      showReminder("dinner");
    }
  }, 60000);

  /* ---- MOOD CHECK-IN ---- */
  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodDisplay = document.getElementById("mood-display");

  moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.dataset.mood;
      moodDisplay.textContent = `Your sunshine mood: ${mood}`;
    });
  });

  /* ---- MINI CONFETTI ---- */
  const confettiBurst = (el) => {
    for(let i=0;i<15;i++){
      const dot = document.createElement("div");
      dot.style.position = "absolute";
      dot.style.width = dot.style.height = Math.random()*6+4+"px";
      dot.style.background = ["#ffec99","#f0a6ca","#a6e3e9","#ffe066"][Math.floor(Math.random()*4)];
      dot.style.borderRadius = "50%";
      dot.style.top = (el.offsetTop + Math.random()*el.offsetHeight) + "px";
      dot.style.left = (el.offsetLeft + Math.random()*el.offsetWidth) + "px";
      dot.style.opacity = 1;
      dot.style.pointerEvents = "none";
      dot.style.transition = "all 0.8s ease-out";
      document.body.appendChild(dot);
      setTimeout(()=>{
        dot.style.top = parseInt(dot.style.top)-50+"px";
        dot.style.opacity = 0;
      },10);
      setTimeout(()=>document.body.removeChild(dot),800);
    }
  };

});
