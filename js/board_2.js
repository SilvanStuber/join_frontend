/**
 * Updates the progress bar and related elements for a specific task.
 * @param {string} taskId - The ID of the task.
 * @param {number} index - The index of the task.
 */
function updateProgress(taskId, indexTask, indexOfSubTask) {
  const checkboxes = document.querySelectorAll(`.checkbox-input-${taskId}`);
  const checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
  const smallProgressDiv = document.getElementById(`smallProgress-${taskId}`);
  smallProgressDiv.textContent = `${checkedCheckboxes.length}/${checkboxes.length}`;
  `${checkedCheckboxes.length}/${checkboxes.length}`;
  let valueOfTheSubtaskBreak = `${checkedCheckboxes.length}/${checkboxes.length}`;
  const progressBar = document.getElementById(`progress-${taskId}`);
  const percentageCompleted = (checkedCheckboxes.length / checkboxes.length) * 100;
  progressBar.style.width = `${percentageCompleted}%`;
  saveStateOfSubTask(taskId, indexOfSubTask);
}

/**
 * Finds a task with the specified ID and opens its large card for editing.
 * @param {string} taskId - The ID of the task.
 */
function editLargCard(taskId) {
  const task = tasks.find((task) => task.id === taskId);
}

/**
 * Closes the large card.
 */
function closeCard() {
  const largeCardElement = document.getElementById("popUpWindow");
  largeCardElement.style.transform = "translateX(500%)";
  assignedMenuOpen = false;
}

/**
 * Renders the small contacts on the board.
 */
function renderSmallContats() {
  contacts.innerHTML = "";
  if (tasks.length === 0) {
    return;
  }
  for (let i = 0; i < tasks.length; i++) {
    let assigned = tasks[i]["assigned"];
    let idTask = tasks[i]["id"];
    let contactsSmallCard = document.getElementById(`boardAssigend-${idTask}`);
    let maxContactsToShow = 3;
    let totalAssigned = assigned.length;
    renderContentUserLargeCard(assigned, idTask, contactsSmallCard, maxContactsToShow, totalAssigned, i);
    if (totalAssigned > maxContactsToShow) {
      contactsSmallCard.innerHTML += generateManyContactsSmal(totalAssigned, maxContactsToShow);
    }
  }
}

/**
 * Renders small contact cards for a task in the large card view.
 * @param {string[]} assigned - Array of assigned contacts.
 * @param {string} idTask - ID of the task.
 * @param {HTMLElement} contactsSmallCard - Container for small contact cards.
 * @param {number} maxContactsToShow - Maximum number of contacts to display.
 * @param {number} totalAssigned - Total number of assigned contacts.
 * @returns {number} - Total number of assigned contacts.
 */
function renderContentUserLargeCard(assigned, idTask, contactsSmallCard, maxContactsToShow, totalAssigned, taskIndex) {
  for (let a = 0; a < Math.min(maxContactsToShow, totalAssigned); a++) {
    let surname = "";
    let name = assigned[a].replace(/_/g, " ");
    let firstname = name[0].toUpperCase();
    let names = assigned[a].replace(/_/g, " ").split(" ");
    if (names[1]) {
      surname = names[1].toUpperCase().charAt(0);
    }
    contactsSmallCard.innerHTML += generateContactsSmalCard(a, firstname, surname);
  }
  return totalAssigned;
}

/**
 * Renders large contact cards for a task in the large card view.
 * @param {object} task - The task object.
 */
function renderLargeContats(task) {
  const contactsLargeCard = document.getElementById("boardAssigendLargCard");
  contacts.innerHTML = "";
  if (task && task["assigned"]) {
    const assigned = task["assigned"];
    for (let d = 0; d < assigned.length; d++) {
      let surname = "";
      const assigendAvatar = assigned[d];
      let name = assigned[d].replace(/_/g, " ");
      let firstname = name[0].toUpperCase();
      let names = assigned[d].replace(/_/g, " ").split(" ");
      if (names[1]) {
        surname = names[1].toUpperCase().charAt(0);
      }
      contactsLargeCard.innerHTML += generatCircleContactsLargeCard(d, firstname, surname, assigendAvatar);
    }
  }
}

/**
 * Renders edit contacts in the large card view.
 */
function renderEditContacts() {
  const contactsLargeCard = document.getElementById("boardAssigendLargCard");
  contactsLargeCard.innerHTML = "";
  for (let d = 0; d < assigned.length; d++) {
    contactsLargeCard.innerHTML += generateEditContacts(assigned[d], colors[d]);
  }
}

/**
 * Appends the generated add task content to the board.
 * @param {string} taskStatusFromBoard - Task status received from the board.
 */
function appendGeneratedAddTask(taskStatusFromBoard) {
  statusFromUser = taskStatusFromBoard;
  let addWindow = document.getElementById("popUpAddWindow");
  addWindow.classList.add("openAddWindow");
  let addBoard = document.getElementById("addBoard");
  let newDivAddTask = document.createElement("div");
  newDivAddTask.classList.add("addWindowCss");
  newDivAddTask.innerHTML = generate_addTask(statusFromUser);
  addBoard.appendChild(newDivAddTask);
  let contactsList = document.getElementById("contactList");
  contactsList.innerHTML = "";
  generateContentAppendAddTask(contactsList, handleContactSearch);
}

/**
 * Generates content to be appended for adding a task.
 * @param {HTMLElement} contactsList - Container for contact list.
 * @param {Function} handleContactSearch - Function for handling contact search.
 */
function generateContentAppendAddTask(contactsList, handleContactSearch) {
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    renderContactsAddTask(i, contactsList);
  }
  document.getElementById("searchContacts").addEventListener("keyup", handleContactSearch);
  changeColour("priorityMedium");
}

/**
 * Searches for tasks based on the input.
 */
function searchTask() {
  let terminal = document.getElementById("searchInput").value.toLowerCase();
  let foundTaskIds = [];
  for (let i in tasks) {
    let taskTitle = tasks[i].title.toLowerCase();
    if (taskTitle.includes(terminal)) {
      foundTaskIds.push(tasks[i].id);
    }
  }
  notSearchTasks(foundTaskIds);
}

/**
 * Shows or hides tasks based on the search results.
 * @param {string[]} foundTaskIds - Array of task IDs found in the search.
 */
function notSearchTasks(foundTaskIds) {
  for (let task of tasks) {
    let taskElement = document.getElementById("smallCardId-" + task.id);
    if (foundTaskIds.includes(task.id)) {
      taskElement.style.display = "flex";
    } else {
      taskElement.style.display = "none";
    }
  }
}

/**
 * Closes the add task board.
 */
function closeAddBoard() {
  let addWindow = document.getElementById("popUpAddWindow");
  addWindow.classList.remove("openAddWindow");
  let addBoard = document.getElementById("addBoard");
  let newDivAddTask = document.querySelector(".addWindowCss");
  if (newDivAddTask) {
    addBoard.removeChild(newDivAddTask);
  }
  location.reload();
}

/**
 * Changes the image based on the hover state.
 * @param {boolean} isHovered - Indicates whether the element is being hovered.
 */
function changeImage(isHovered) {
  var textElemet = document.getElementById("delete-task-title");
  var imageElement = document.getElementById("delete-task-image");
  if (isHovered) {
    imageElement.src = "./assets/img/delete.png";
  } else {
    imageElement.src = "./assets/img/delete_contacts.png";
  }
}

/**
 * Changes the edit image based on the hover state.
 * @param {boolean} isHovered - Indicates whether the element is being hovered.
 */
function changeEditImage(isHovered) {
  var imageElement = document.getElementById("edit-task-image");
  if (isHovered) {
    imageElement.src = "./assets/img/edit2.png";
  } else {
    imageElement.src = "./assets/img/edit_task.png";
  }
}
