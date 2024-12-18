let selecetContactsEdit = [];
let assignedMenuOpen = false;
let oldAssigned = [];
let newSubs = [];
let subtaskRendering = [];
let editSubs = [];
let subtaskIndex = 0;
let tasksIdFromServer;
let editedTask;
let assignedWwasEdited = false;

/**
 * Edits the large card based on the given taskId.
 * @param {string} taskId - The ID of the task to be edited.
 */
function editLargCard(taskId) {
  saveOldSubs(taskId);
  let editCard = document.getElementById("desingLagrCard");
  editCard.style.display = "flex";
  editCard.style.alignItems = "center";
  editCard.style.height = "97%";
  document.getElementById("largesCard").classList.add("d-None");
  document.getElementById("addTaskLargeCard").innerHTML = "";
  document.getElementById("addTaskLargeCard").innerHTML = generateAddEditeTask(taskId);
  document.getElementById("addTaskLargeCard").style.display = "flex";
  document.getElementById("addTaskLargeCard").style.width = "100%";
  document.getElementById("addTaskLargeCard").style.overflow = "scroll";
  document.getElementById("addTaskLargeCard").style.justifyContent = "center";
  document.getElementById("addTaskLargeCard").style.marginTop = "22üx";
  edittaskArea(taskId);
  renderEditTask();
  saveUneditedAssigned(taskId);
  setColorButtonResponsiveWorkStep(taskId);
}

/**
 * Sets the color of the responsive work step button based on the task's status.
 * @param {string} taskId - The ID of the task for which to set the color.
 */
function setColorButtonResponsiveWorkStep(taskId) {
  let index = validateIndexFromTask(taskId);
  let task = tasks[index];
  let taskStatus = task["taskStatus"];
  changeColorButtonResponsiveWorkStep(taskStatus);
}

/**
 * Finds a task in the tasks array based on the given taskId.
 * @param {string} taskId - The ID of the task to be found.
 * @returns {Object|null} - The found task object or null if not found.
 */
function findTaskById(taskId) {
  const foundTask = tasks.find((task) => task.id === taskId);
  return foundTask;
}

/**
 * Activates the priority styling for the specified priority element.
 * @param {string} priorityID - The ID of the priority element to be activated.
 */
function activatePriority(priorityID) {
  const priorityElement = document.getElementById(priorityID);
  if (priorityElement) {
    priorityElement.classList.add(`${priorityID}-active`);

    let imgPaths = document.querySelectorAll(`.img-${priorityID}`);
    imgPaths.forEach((path) => {
      path.classList.add("imgPrio-active");
    });
  }
}

/**
 * Edits the task area based on the given taskId.
 * @param {string} taskId - The ID of the task to be edited.
 */
function edittaskArea(taskId) {
  const foundTask = findTaskById(taskId);
  document.getElementById("editTitle").value = foundTask.title;
  document.getElementById("editDescription").value = foundTask.description;
  document.getElementById("editDueDate").value = foundTask.dueDate;
  activatePriority(foundTask.priorityID);
  displayAssignedContacts(foundTask.assigned);
  displaySubtasks(foundTask.subtasks);
}

/**
 * Displays assigned contacts on the edit board.
 * @param {string} assignedContacts - Array of contacts assigned to the task.
 */
function displayAssignedContacts(assignedContacts) {
  const contactsLargeCard = document.getElementById("editAssignedContacts");
  assignedContacts.forEach((contact, index) => {
    const name = contact.split(" ");
    const firstnameInitial = name[0].charAt(0).toUpperCase();
    const surnameInitial = name[1] ? name[1].charAt(0).toUpperCase() : "";
    const newContactElement = document.createElement("div");
    newContactElement.classList.add("boardLargContactsAvatar");
    newContactElement.innerHTML = /*html*/ `
      <div class="EditVersionCircel" id="circle-${index}" style="background-color: ${colors[index]}">
        <p class="nameIdList" id="name-id">${firstnameInitial}${surnameInitial}</p>
      </div>
    `;
    contactsLargeCard.appendChild(newContactElement);
  });
}

/**
 * Saves the edited task details to the board.
 * @param {string} taskId - The ID of the task to be saved.
 */
function saveEditTaskBoard(taskId) {
  tasksIdFromServer = taskId;
  let foundTask = findTaskById(taskId);
  let status = getStatusTaskId(taskId);
  let selectedPriorityBoard = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
  let priorityContentBoard = selectedPriorityBoard ? selectedPriorityBoard.innerHTML : "";
  let selectedPriorityIDBoard = "";
  let category = defineCategory(taskId);
  if (selectedPriorityBoard) {
    selectedPriorityIDBoard = selectedPriorityBoard.id;
  }
  checkboxAddTaskEdit();
  priorityContentArray.unshift(priorityContentBoard);
  loadNewBoard(taskId, foundTask, status, priorityContentBoard, selectedPriorityIDBoard, category);
}

/**
 * Loads a new board based on the specified parameters, handling task assignment and updating the task's status and priority.
 * If no tasks are currently assigned, it reverts to a previously saved assignment state. It then generates an edited version
 * of the task with the new parameters, saves the task's completion status based on its priority, and initializes the board state.
 *
 * @param {string} taskId - The unique identifier for the task to be loaded.
 * @param {object} foundTask - The task object found that needs to be edited.
 * @param {string} status - The new status to be assigned to the task.
 * @param {string} priorityContentBoard - Content related to the task's priority on the board.
 * @param {string} selectedPriorityIDBoard - The ID of the selected priority for the task on the board.
 * @param {string} category - The category the task belongs to.
 */
async function loadNewBoard(taskId, foundTask, status, priorityContentBoard, selectedPriorityIDBoard, category) {
  if (!assignedWwasEdited) {
    assigned = oldAssigned.slice();
  }
  await saveEditedTask(foundTask, taskId, status, selectedPriorityIDBoard, priorityContentBoard, assigned, category);
  subtasks = [];
  editSubs = [];
  saveRevisedTaskCompletion(priorityContentBoard);
  assignedWwasEdited = false;
}

/**
 * Saves edited task data.
 *
 * @param {Object} foundTask - Original task.
 * @param {string} taskId - Task ID.
 * @param {string} status - Task status.
 * @param {string} selectedPriorityIDBoard - Priority ID.
 * @param {string} priorityContentBoard - Priority content.
 * @param {Array} assigned - Assigned members.
 * @param {string} category - Task category.
 */
async function saveEditedTask(foundTask, taskId, status, selectedPriorityIDBoard, priorityContentBoard, assigned, category) {
  editedTask = {
    title: document.getElementById("editTitle").value,
    description: document.getElementById("editDescription").value,
    due_date: document.getElementById("editDueDate").value,
    task_status: status,
    priority_content: selectedPriorityIDBoard,
    assigned: assigned,
    category: category,
    sub_tasks: oldSubs.slice(),
  };
  await updateTaskOnServer(editedTask, taskId);
}

/**
 * Saves the revised task completion details to local storage.
 * @param {string} priorityContentBoard - The priority content for the revised task completion.
 */
async function saveRevisedTaskCompletion(priorityContentBoard) {
  await loadUserLoginData();
  await loadTasksFromServer();
  await includeHTML();
  await loadContactsFromServer();
  setInitialsInTheHeader();
  removeStyleSidebar();
  addTextColor();
  updateHtml();
  renderSmallContats();
  closeCard();
  assignedMenuOpen = false;
  console.log("1111", tasks);
}

/**
 * Defines the assigned contacts for a given task ID.
 * @param {string} taskId - The ID of the task for which to define assigned contacts.
 * @returns {string} - The array of assigned contacts for the specified task.
 */
function defineAssigned(taskId) {
  let index = validateIndexFromTask(taskId);
  let assigned = tasks[index]["assigned"];
  return assigned;
}

/**
 * Defines the category for a given task ID.
 * @param {string} taskId - The ID of the task for which to define the category.
 * @returns {string} - The category of the specified task.
 */
function defineCategory(taskId) {
  let index = validateIndexFromTask(taskId);
  let category = tasks[index]["category"];
  return category;
}

/**
 * Deletes a subtask at the specified index.
 * @param {number} index - The index of the subtask to be deleted.
 */
function deleteSubs(index) {
  subtasks.splice(index, 1);
  oldSubs.splice(index, 1);
  const subtaskItem = document.querySelectorAll(".subtaskItem")[index];
  subtaskItem.remove();
  displaySubtasks();
}

/**
 * Adds a subtask to the subtasks array during task editing.
 */
function addSubtasksEdit() {
  const subtaskInput = document.getElementById("inputSubtasksEdit").value;
  if (!subtaskInput) {
    return;
  } else {
    subtasks = [];
    document.getElementById("inputSubtasksEdit").value = "";
    let newSubtaskData = {
      description: subtaskInput,
      completed: false,
    };
    oldSubs.push(newSubtaskData);
    displaySubtasks();
  }
}

/**
 * Displays subtasks on the editing board.
 */
function displaySubtasks() {
  const subtasksElement = document.getElementById("editSubtasks");
  subtasksElement.innerHTML = "";
  for (let i = 0; i < oldSubs.length; i++) {
    const subtask = oldSubs[i].description;
    subtasksElement.innerHTML += generateDisplaySubtasksHTML(i, subtask);
  }
}

/**
 * Edits a subtask at the specified index.
 * @param {number} index - The index of the subtask to be edited.
 */
function editSub(index) {
  let oldSub = oldSubs[index].description;
  document.getElementById(`subsTaskEdit${index}`).innerHTML = generateInputEditSubtask(index);
  document.getElementById(`subtaskEdite${index}`).value = oldSub;
}

/**
 * Deletes a subtask being edited at the specified index.
 * @param {number} index - The index of the subtask to be deleted.
 */
function deleteSubTaskEdite(index) {
  oldSubs.splice(index, 1);
  displaySubtasks();
}

/**
 * Saves the edited subtask at the specified index.
 * @param {number} index - The index of the subtask to be saved.
 */
function saveEditetSubTask(index) {
  let newSubtask = document.getElementById(`subtaskEdite${index}`).value;
  oldSubs[index].description = newSubtask;
  displaySubtasks();
}

/**
 * Creates an icons container for subtasks with edit and delete functionality.
 * @param {HTMLElement} subtaskItemDiv - The div element representing the subtask item.
 * @param {string} subtaskText - The text content of the subtask.
 * @param {number} index - The index of the subtask.
 * @returns {HTMLElement} - The icons container element.
 */
function createIconsContainer(subtaskItemDiv, subtaskText, index) {
  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("iconsContainer");
  const editImg = createImage("./assets/img/edit_task.png", "editSubTask");
  iconsContainer.appendChild(editImg);
  const vector = createImage("./assets/img/vector.png", "vector");
  iconsContainer.appendChild(vector);
  const deleteImg = createImage("./assets/img/delete_contacts.png", "delete");
  iconsContainer.appendChild(deleteImg);
  deleteImg.addEventListener("click", () => handleDeleteClick(subtaskItemDiv, index));
  editImg.addEventListener("click", () => handleEditClick(subtaskItemDiv, subtaskText));
  return iconsContainer;
}

/**
 * Creates an image element with the specified source and class name.
 * @param {string} src - The source URL of the image.
 * @param {string} className - The class name to be added to the image element.
 * @returns {HTMLImageElement} - The created image element.
 */
function createImage(src, className) {
  const img = document.createElement("img");
  img.classList.add(className);
  img.src = src;
  return img;
}

/**
 * Creates an icons container for subtasks with delete, check, and vector (edit) buttons during editing.
 * @param {HTMLElement} subtaskItemDiv - The div element representing the subtask item.
 * @param {string} subtaskText - The text content of the subtask.
 * @param {number} index - The index of the subtask.
 * @returns {HTMLElement} - The icons container element.
 */
function createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, index) {
  const iconsContainerWhenEdit = document.createElement("div");
  iconsContainerWhenEdit.classList.add("iconsContainer");
  const deleteImg = createImage("./assets/img/delete_contacts.png", "delete");
  deleteImg.classList.add("delete");
  iconsContainerWhenEdit.appendChild(deleteImg);
  deleteImg.addEventListener("click", () => handleDeleteClick(subtaskItemDiv, index));
  const vector = createImage("./assets/img/vector.png", "vector");
  iconsContainerWhenEdit.appendChild(vector);
  const check = createImage("./assets/img/done.png", "subtaskCheck");
  check.classList.add("subtasksCheck");
  iconsContainerWhenEdit.appendChild(check);
  check.addEventListener("click", () => handleCheckClick(subtaskItemDiv, iconsContainerWhenEdit, subtaskText));
  return iconsContainerWhenEdit;
}
