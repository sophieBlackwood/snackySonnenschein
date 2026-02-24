document.addEventListener("DOMContentLoaded", () => {

  /* ========================= */
  /* THEME TOGGLE */
  /* ========================= */

  const themeToggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

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

  /* ========================= */
  /* TO-DO SYSTEM */
  /* ========================= */

  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
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
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  };

  const addTask = () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  };

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });

  renderTasks();

  /* ========================= */
  /* DAILY EAT REMINDERS */
  /* ========================= */

  const reminderCard = document.getElementById("reminder-card");
  const reminderText = document.getElementById("reminder-text");
  const dismissBtn = document.getElementById("dismiss-reminder");

  const reminderMessages = {
    morning: [
      "Good morning, Brooklyn. Yes, this means food. Luke would like you to cooperate.",
      "Sun’s up. Eat something. I’m not negotiating."
    ],
    lunch: [
      "It’s 12:10. That’s suspiciously close to 'you forgot to eat' time.",
      "Hi. This is your polite-but-not-optional lunch reminder."
    ],
    dinner: [
      "Evening check-in. Please eat dinner before you claim you're 'not that hungry.'",
      "Luke would raise an eyebrow right now. Go eat."
    ]
  };

  const getTodayKey = (type) => {
    const today = new Date().toISOString().split("T")[0];
    return `reminder-${type}-${today}`;
  };

  const showReminder = (type) => {
    if (localStorage.getItem(getTodayKey(type))) return;

    const messages = reminderMessages[type];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    reminderText.textContent = randomMessage;
    reminderCard.classList.remove("hidden");
  };

  dismissBtn.addEventListener("click", () => {
    reminderCard.classList.add("hidden");
  });

  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours === 6 && minutes === 0) {
      localStorage.setItem(getTodayKey("morning"), "shown");
      showReminder("morning");
    }

    if (hours === 12 && minutes === 10) {
      localStorage.setItem(getTodayKey("lunch"), "shown");
      showReminder("lunch");
    }

    if (hours === 18 && minutes === 0) {
      localStorage.setItem(getTodayKey("dinner"), "shown");
      showReminder("dinner");
    }

  }, 60000);

});
