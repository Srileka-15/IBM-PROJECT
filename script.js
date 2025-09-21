const toggleTheme = document.getElementById("toggleTheme");
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
function applyTheme() {
  if (darkMode) {
    document.body.classList.add("dark");
    toggleTheme.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark");
    toggleTheme.textContent = "🌙 Dark Mode";
  }
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}
toggleTheme.addEventListener("click", () => {
  darkMode = !darkMode;
  applyTheme();
});
applyTheme();


const taskForm = document.getElementById("taskForm");
const taskContainer = document.getElementById("taskContainer");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


const ctx = document.getElementById("studyChart").getContext("2d");
let studyChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Math", "Physics", "Programming", "Electronics"],
    datasets: [{
      label: "Study Hours",
      data: [0, 0, 0, 0],
      backgroundColor: ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});


function renderTasks() {
  taskContainer.innerHTML = "";
  let subjectHours = { Math: 0, Physics: 0, Programming: 0, Electronics: 0 };

  tasks.forEach((task, index) => {
    subjectHours[task.subject] += parseInt(task.hours);

    const li = document.createElement("li");
    li.textContent = `${task.name} - ${task.subject} (${task.hours} hrs)`;
    taskContainer.appendChild(li);
  });

  studyChart.data.datasets[0].data = [
    subjectHours.Math,
    subjectHours.Physics,
    subjectHours.Programming,
    subjectHours.Electronics
  ];
  studyChart.update();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = document.getElementById("taskName").value;
  const taskSubject = document.getElementById("taskSubject").value;
  const taskHours = document.getElementById("taskHours").value;

  tasks.push({ name: taskName, subject: taskSubject, hours: taskHours });
  taskForm.reset();
  renderTasks();
});

renderTasks();






