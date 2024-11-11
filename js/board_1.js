let draggedElementId;
let stateOfTask = ["checkbox-2-0", "checkbox-2-1", "checkbox-3-1"];
let subtaskLevel = [
  {
    taskId: 2,
    percentageCompleted: 100,
    valueOfTheSubtaskBreak: "2/2",
  },
  {
    taskId: 3,
    percentageCompleted: 50,
    valueOfTheSubtaskBreak: "1/2",
  },
];

/**
 * Initializes the board and performs necessary setup tasks.
 */
async function boardInit() {
  await load();
  await includeHTML();
  await loadContactsFromServer();
  loadUserData();
  setInitialsInTheHeader();
  loadStateOfSubTask();
  loadLevelOfSubtask();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryBorard").classList.add("sidebarCategoryLinkActive");
  updateHtml();
  renderSmallContats();
}

/**
 * Filters tasks based on their status.
 * @param {string} taskStatus - The status to filter tasks by.
 * @returns {Array} - An array of tasks with the specified status.
 */
function filterTasksByStatus(taskStatus) {
  return tasks.filter((t) => t["taskStatus"] === taskStatus);
}

/**
 * Updates the HTML content for tasks with the specified status.
 * @param {string} taskStatus - The status of the tasks to update.
 * @param {string} elementId - The ID of the HTML element to update.
 */
function updateHtmlForStatus(taskStatus, elementId) {
  const tasksByStatus = filterTasksByStatus(taskStatus);
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  if (tasksByStatus.length === 0) {
    element.innerHTML = '<p class="noTask">Keine Aufgaben vorhanden</p>';
  } else {
    for (let i = 0; i < tasksByStatus.length; i++) {
      const task = tasksByStatus[i];
      element.innerHTML += generateSmallCard(task, i);
    }
  }
}

/**
 * Renders the progress bar based on the subtask levels.
 */
function renderProgressbar(task) {
  let progressBar = 0;
  let numberOfCompleted = 0;
  let percentOfProgressbar = 0;
  task.subtasks.forEach((subTask) => {
    if (subTask.completed === true) {
      numberOfCompleted++;
    }
  });
  percentOfProgressbar = (numberOfCompleted / task.subtasks.length) * 100;
  setTimeout(() => {
    document.getElementById(`smallProgress-${task.id}`).innerHTML = `${numberOfCompleted}/${task.subtasks.length}`;
    progressBar = document.getElementById(`progress-${task.id}`);
    progressBar.style.width = `${percentOfProgressbar}%`;
  }, 100);
}

/**
 * Updates the HTML content for tasks with different statuses.
 * @function
 */
function updateHtml() {
  updateHtmlForStatus("todo", "todo");
  updateHtmlForStatus("inProgress", "inProgress");
  updateHtmlForStatus("awaitFeedback", "awaitFeedback");
  updateHtmlForStatus("done", "done");
}

/**
 * Removes the "imgPrio-active" class from SVG elements in the given container.
 * @param {Element} container - The container element containing SVG elements.
 */
function removeActiveClassFromSvgElements(container) {
  let svgElements = container.querySelectorAll(".img-priorityUrgent, .img-priorityMedium, .img-priorityLow");
  svgElements.forEach((svgElement) => {
    svgElement.classList.remove("imgPrio-active");
  });
}

/**
 * Generates HTML content for a small task card.
 * @param {Object} task - The task object containing information.
 * @param {number} i - The index of the task in the list.
 * @returns {string} - HTML content for the small task card.
 */
function generateSmallCard(task, i) {
  let currenCategory = task.category[0];
  let currentPriorityContent = task.priorityContent || "";
  let tempDiv = document.createElement("div");
  let taskID = task["id"];
  tempDiv.innerHTML = currentPriorityContent;
  tempDiv.classList.add("selectedPriorityContentDiv");
  removeActiveClassFromSvgElements(tempDiv);
  let clonedContentDiv = document.createElement("div");
  clonedContentDiv.appendChild(tempDiv.cloneNode(true));
  removeActiveClassFromSvgElements(clonedContentDiv);
  return generateSelectedPriorityContent(currenCategory, clonedContentDiv, taskID, task, i);
}

/**
 * Generates HTML content for a selected priority in a small task card.
 * @param {string} currenCategory - The current category of the task.
 * @param {Element} clonedContentDiv - The cloned content div element.
 * @param {string} taskID - The ID of the task.
 * @param {Object} task - The task object containing information.
 * @param {number} i - The index of the task in the list.
 * @returns {string} - HTML content for the selected priority in a small task card.
 */
function generateSelectedPriorityContent(currenCategory, clonedContentDiv, taskID, task, i) {
  let className = typeof currenCategory === "string" ? currenCategory.replace(/\s+/g, "") : "";
  let selectedPriorityContentDiv = clonedContentDiv.querySelector(".selectedPriorityContentDiv");
  ["textUrgent", "textMedium", "textLow"].forEach((className) => {
    let textElement = selectedPriorityContentDiv.querySelector("." + className);
    if (textElement) {
      textElement.textContent = "";
    }
  });
  let smallProgressDiv = "";
  if (task.subtasks.length > 0) {
    renderProgressbar(task);
    smallProgressDiv = generateProgressBar(task.id, task.subtasks.length);
  }
  return generateSmallCardHTML(task, className, clonedContentDiv, smallProgressDiv, i, taskID);
}

/**
 * Sets the ID of the dragged element.
 * @param {string} id - The ID of the dragged element.
 */
function startDragged(id) {
  draggedElementId = id;
}

/**
 * Moves a task to the specified task status and updates the UI.
 * @param {string} taskStatus - The status to move the task to.
 */
async function moveIt(taskStatus) {
  const taskIndex = tasks.findIndex((task) => task.id === draggedElementId);
  if (taskIndex !== -1) {
    tasks[taskIndex].taskStatus = taskStatus;
    let newTaskData = await generateNewDataToBackendTasks(tasks[taskIndex], tasks[taskIndex].subtasks);
    updateTaskOnServer(newTaskData, tasks[taskIndex].id);
    updateHtml();
    renderSmallContats();
  }
}

/**
 * Prevents the default behavior of a drag-and-drop event.
 * @param {Event} ev - The drag-and-drop event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Highlights the specified element by adding a CSS class.
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * Removes the highlight from the specified element by removing a CSS class.
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

/**
 * Renders the state of subtasks for a given task.
 * @param {Object} task - The task object containing subtasks.
 */
function openCard(taskId) {
  load();
  let largeCardElement = document.getElementById("popUpWindow");
  let task = tasks.find((t) => t.id === taskId);
  if (task) {
    largeCardElement.innerHTML = generateLargeCard(task);
    largeCardElement.style.transform = "translateX(0%)";
    renderLargeContats(task);
    setColorButtonResponsiveWorkStep(taskId);
  }
  renderLargeContats();
  loadLevelOfSubtask();
  renderSubtaskState(task);
}

/**
 * Renders the state of subtasks for a given task.
 * @param {Object} task - The task object containing subtasks.
 */
function renderSubtaskState(task) {
  let taskId = task["id"];
  let subTask = task["subtasks"];
  for (let i = 0; i < subTask.length; i++) {
    let renderTaskId = `checkbox-${taskId}-${i}`;
    let indexTaskId = getTaskId(renderTaskId);
  }
}

/**
 * Saves the state of a subtask (checked or unchecked) to local storage.
 * @param {string} taskId - The ID of the task associated with the subtask.
 * @param {number} index - The index of the subtask.
 */
async function saveStateOfSubTask(taskId, subTaskId, indexOfSubTask) {
  let indexTask = tasks.findIndex((task) => task.id === taskId);
  let stateOfSubTask = tasks[indexTask].subtasks[indexOfSubTask].completed;
  if (!stateOfSubTask) {
    tasks[indexTask].subtasks[indexOfSubTask].completed = true;
  } else {
    tasks[indexTask].subtasks[indexOfSubTask].completed = false;
  }
  let newTaskData = await generateNewDataToBackendTasks(tasks[indexTask], tasks[indexTask].subtasks);
  updateTaskOnServer(newTaskData, taskId);
}

/**
 * Generates task data to be sent to the backend.
 */
async function generateNewDataToBackendTasks(newTask, subTaskData) {
  return {
    title: newTask.title,
    task_status: newTask.taskStatus,
    description: newTask.description,
    assigned: newTask.assigned,
    due_date: newTask.dueDate,
    priority_content: newTask.priorityID,
    sub_tasks: subTaskData,
    category: newTask.category,
  };
}

/**
 * Gets the index of a subtask in the stateOfTask array.
 * @param {string} id - The ID of the subtask.
 * @returns {number} - The index of the subtask in the stateOfTask array.
 */
function getTaskId(id) {
  let index = stateOfTask.indexOf(id);
  return index;
}

/**
 * Asynchronously saves the level of a subtask, including its percentage completed and value of the subtask break.
 * @param {string} taskId - The ID of the task associated with the subtask.
 * @param {number} percentageCompleted - The percentage completed for the subtask.
 * @param {string} valueOfTheSubtaskBreak - The value of the subtask break.
 * @function
 */
async function saveLevelOfSubtask(taskId, percentageCompleted, valueOfTheSubtaskBreak) {
  await getLevelTaskId(taskId);
  pushLevelOfSubtask(taskId, percentageCompleted, valueOfTheSubtaskBreak);
  saveLevelOfSubtaskLocalStorage();
}

/**
 * Saves the subtask levels to local storage in JSON format.
 */
function saveLevelOfSubtaskLocalStorage() {
  let subtaskLevelAtText = JSON.stringify(subtaskLevel);
  localStorage.setItem("subtaskLevel", subtaskLevelAtText);
}

/**
 * Gets the index of a task in subtaskLevel array and removes it.
 * @param {string} taskId - The ID of the task.
 */
function getLevelTaskId(taskId) {
  for (let i = 0; i < subtaskLevel.length; i++) {
    let idOfTasklevel = subtaskLevel[i]["taskId"];
    if (idOfTasklevel === taskId) {
      subtaskLevel.splice(i, 1);
    }
  }
}

/**
 * Adds a subtask level to the subtaskLevel array.
 * @param {string} taskId - The ID of the task.
 * @param {number} percentageCompleted - The percentage completed for the subtask.
 * @param {string} valueOfTheSubtaskBreak - The value of the subtask break.
 */
function pushLevelOfSubtask(taskId, percentageCompleted, valueOfTheSubtaskBreak) {
  let level = {
    taskId: taskId,
    percentageCompleted: percentageCompleted,
    valueOfTheSubtaskBreak: valueOfTheSubtaskBreak,
  };
  subtaskLevel.push(level);
}

/**
 * Deletes a subtask level based on the index of the corresponding task in the tasks array.
 * @param {number} indexOfTask - The index of the task in the tasks array.
 */
function deleteLevelOfSubtask(indexOfTask) {
  let idOfTask = tasks[indexOfTask]["id"];
  for (let i = 0; i < subtaskLevel.length; i++) {
    let idOfTasklevel = subtaskLevel[i]["taskId"];
    if (idOfTasklevel === idOfTask) {
      subtaskLevel.splice(i, 1);
    }
  }
  saveLevelOfSubtaskLocalStorage();
  loadLevelOfSubtask();
}

/**
 * Loads the state of subtasks from local storage.
 */
function loadStateOfSubTask() {
  let idAtText = localStorage.getItem("id");
  if (idAtText) {
    stateOfTask = JSON.parse(idAtText);
  }
}

/**
 * Loads subtask levels from local storage and updates the subtaskLevel variable.
 */
function loadLevelOfSubtask() {
  let subtaskLevelAtText = localStorage.getItem("subtaskLevel");
  if (subtaskLevelAtText) {
    subtaskLevel = JSON.parse(subtaskLevelAtText);
  }
}

/**
 * Generates HTML for a large card based on the provided task object.
 * @param {object} task - The task object.
 * @returns {string} - The generated HTML for the large card.
 */
function generateLargeCard(task) {
  let currentPriorityContent = task.priorityContent || "";
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = currentPriorityContent;
  tempDiv.classList.add("selectedPriorityContentDiv");
  tempDiv.classList.add("blackImport");
  removeActiveClassFromSvgElements(tempDiv);
  let clonedContentDiv = document.createElement("div");
  clonedContentDiv.appendChild(tempDiv.cloneNode(true));
  removeActiveClassFromSvgElements(clonedContentDiv);
  let currenCategory = task.category[0];
  let className = typeof currenCategory === "string" ? currenCategory.replace(/\s+/g, "") : "";
  const subsHtml = generateSubtasksHTML(task);
  let taskId = task["id"];
  return generateLargeCardHTML(task, className, clonedContentDiv, subsHtml, taskId);
}
