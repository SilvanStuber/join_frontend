let greetingText;
let numberToDo;
let numberProgress;
let numberFeedback;
let numberDone;
let expirationDateOfTask = [];
let dateOfTheNextUpcomingTask = [];
let loggedIn = false;

/**
 *Executed when the summary.html is loaded by onload
 *
 */
async function initSummary() {
  await loadUserLoginData();
  await includeHTML();
  await loadContactsFromServer();
  loadStatusOfLogin();
  generateGreetingText();
  setInitialsInTheHeader();
  loadContentGreeting();
  load();
  determineNumberTasks();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategorySummary").classList.add("sidebarCategoryLinkActive");
  loadContentToSummary();
}

/**
 * *
 * Generate welcome text based on the time of day
 *
 * @param {number} time - Time of day
 * @param {string} greetingText - Welcome text
 *
 */
function generateGreetingText() {
  let d = new Date();
  let time = d.getHours();
  if (time < 12) {
    greetingText = "Good morning!";
  }
  if (time > 12) {
    greetingText = "Good afternoon!";
  }
  if (time == 12) {
    greetingText = "Go eat lunch!";
  }
}

/**
 * *
 * Determine content of all tasks
 *
 * @param {string} taskStatus - workstep status
 * @param {string} priority - priority from task
 * @param {string} expirationDate - date when task should be completed
 * @param {number} numberOfTasks - number of tasks
 *
 */
function determineNumberTasks() {
  resetNumbersTasks();
  for (let i = 0; i < tasks.length; i++) {
    let taskStatus = tasks[i]["taskStatus"];
    let priority = tasks[i]["priorityID"];
    let expirationDate = tasks[i]["dueDate"];
    numberOfTasks++;
    validationOfTheContentOfTasks(taskStatus, priority, expirationDate);
  }
  validationOfTheMostRecentDate();
}

/**
 * *
 * Counting and validating the task based on the corresponding content
 *
 * @param {number} numberToDo - counter of To Do tasks
 * @param {number} numberProgress - counter of To Do tasks
 * @param {number} numberFeedback - counter of To Do tasks
 * @param {number} numberDone - counter of To Do tasks
 * @param {number} numberOfUrgentTasks - counter which tasks have the urgent priority
 * @param {number} expirationDateOfTask - date when task should be completed
 *
 */
function validationOfTheContentOfTasks(task, priority, expirationDate) {
  if (task === "todo") {
    numberToDo++;
  }
  if (task === "inProgress") {
    numberProgress++;
  }
  if (task === "awaitFeedback") {
    numberFeedback++;
  }
  if (task === "done") {
    numberDone++;
  }
  if (priority === "priorityUrgent") {
    numberOfUrgentTasks++;
    expirationDateOfTask.push(expirationDate);
  }
}

/**
 * *
 * Validation of the task that has the Urgent priority and is due next
 *
 * @param {string} dateOfTheNextUpcomingTask - date Of The Next Upcoming Task
 * @param {string} dateOfTask - date Of Task
 */
function validationOfTheMostRecentDate() {
  if (expirationDateOfTask < 1) {
    dateOfTheNextUpcomingTask = "No";
  } else {
    expirationDateOfTask.sort((a, b) => b - a);
    let dateOfTask = expirationDateOfTask[0];
    formatDateOfTask(dateOfTask);
  }
}

/**
 * *
 * Validation of the task that has the Urgent priority and is due next
 *
 * @param {number} date - date
 * @param {number} dateOfTask - date of the task
 * @param {string} months - months
 * @param {number} day - formatted date
 * @param {number} year  - year
 * @param {string} dateOfTheNextUpcomingTask- date Of The Next Upcoming Task
 *
 */
function formatDateOfTask(dateOfTask) {
  let date = new Date(dateOfTask);
  let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  dateOfTheNextUpcomingTask = `${month} ${day}, ${year}`;
}

/**
 * *
 * Reset all task counters
 *
 */
function resetNumbersTasks() {
  numberOfTasks = 0;
  numberToDo = 0;
  numberProgress = 0;
  numberFeedback = 0;
  numberDone = 0;
  numberOfUrgentTasks = 0;
  expirationDateOfTask = [];
  dateOfTheNextUpcomingTask = [];
}

/**
 *  Load content to greet the user
 *
 *  @param {string} userName - user name
 *  @param {string} greetingText - Welcome text
 *  @param {boolean} loggedIn -
 * `true` User is logged in,
 * `false` User is not logged in.
 *
 */
function loadContentGreeting() {
  if (!loggedIn) {
    document.getElementById("greetingTextResponsive").innerHTML = greetingText;
    document.getElementById("userNameResponsive").innerHTML = userName;
  } else {
    document.getElementById("greetingBox").classList.add("d-none");
  }
  loggedIn = true;
  saveStatusOfLogin();
}

/**
 *  Save whether the user is logged in in the local storage
 *
 *  @param {boolean} loggedIn -
 * `true` User is logged in,
 * `false` User is not logged in.
 *
 * */
function saveStatusOfLogin() {
  let loggedInAtText = JSON.stringify(loggedIn);
  localStorage.setItem("loggedIn", loggedInAtText);
}

/**
 *  Load whether the user is logged in in the local storage
 *
 *  @param {boolean} loggedIn -
 * `true` User is logged in,
 * `false` User is not logged in.
 *
 * */
function loadStatusOfLogin() {
  let loggedInAtText = localStorage.getItem("loggedIn");
  if (loggedInAtText) {
    loggedIn = JSON.parse(loggedInAtText);
  }
}

/**
 *  Renders the data for Summary
 *
 * @param {number} numberToDo - counter of To Do tasks
 * @param {number} numberDone - counter of To Do tasks
 * @param {number} numberOfUrgentTasks - counter which tasks have the urgent priority
 * @param {string} dateOfTheNextUpcomingTask- date Of The Next Upcoming Task
 * @param {number} numberOfTasks - number of tasks
 * @param {number} numberProgress - counter of To Do tasks
 * @param {number} numberFeedback - counter of To Do tasks
 * @param {string} userName - user name
 * @param {string} greetingText - Welcome text
 *
 * */
function loadContentToSummary() {
  document.getElementById("todosCrowd").innerHTML = numberToDo;
  document.getElementById("doneCrowd").innerHTML = numberDone;
  document.getElementById("urgendCrowd").innerHTML = numberOfUrgentTasks;
  document.getElementById("dateSummary").innerHTML = dateOfTheNextUpcomingTask;
  document.getElementById("tasksNumber").innerHTML = numberOfTasks;
  document.getElementById("tasksNumberProgress").innerHTML = numberProgress;
  document.getElementById("tasksNumberFeedback").innerHTML = numberFeedback;
  document.getElementById("greetingTextSummary").innerHTML = greetingText;
  document.getElementById("userNameSummary").innerHTML = userName;
}
