/**
 * Handles the click event for deleting a subtask.
 * @param {HTMLElement} subtaskItemDiv - The div element representing the subtask item.
 * @param {number} index - The index of the subtask to be deleted.
 */
function handleDeleteClick(subtaskItemDiv, index) {
  subtasks.splice(index, 1);
  subtaskItemDiv.remove();
}

/**
 * Handles the addition of assigned contacts during task editing.
 */
function checkboxAddTaskEdit() {
  let checkboxes = document.querySelectorAll(".inputCheckBox");
  assigned = [];
  checkboxes.forEach((checkbox, index) => {
    let label = document.querySelector(`.nameContact[for=myCheckbox_Edit${index}]`);
    if (checkbox.checked && label) {
      assigned.push(label.textContent);
    }
  });
}

/**
 * Gets the task status based on the task ID.
 * @param {string} taskId - The ID of the task for which to retrieve the status.
 * @returns {string} - The status of the specified task.
 */
function getStatusTaskId(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let idOfTaskStatus = tasks[i]["id"];
    if (idOfTaskStatus === taskId) {
      return tasks[i]["taskStatus"];
    }
  }
}

/**
 * Gets the priority ID based on the task ID.
 * @param {string} taskId - The ID of the task for which to retrieve the priority ID.
 * @returns {string} - The priority ID of the specified task.
 */
function getPrioTaskId(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let idOfTaskPrio = tasks[i]["id"];
    if (idOfTaskPrio === taskId) {
      return tasks[i]["priorityID"];
    }
  }
}

/**
 * Handles the click event to hide the assigned board during task editing.
 * @param {Event} event - The click event object.
 * @param {string} taskId - The ID of the task being edited.
 */
function hideAssignedBoardEdit(event, taskId) {
  if (event.target.id !== "assignedBoard") {
    let list = document.getElementById("listContactEdit");
    let arrow = document.getElementById("arrowAssignedEdit");
    let arrowDrop = document.getElementById("arrow_drop_downHoverAssignedEdit");
    let dateAddTaskEdit = document.getElementById("dateAddTaskEdit");
    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrowDrop.classList.toggle("rotate");
  }
  displayAvatarEditBoart(selecetContactsEdit, contacts, colors);
  if (!assignedMenuOpen) {
    validateAssignedContacts(taskId);
  }
  assignedMenuOpen = true;
}

function calculationOfTheAmountAssignedList(taskId) {
  let highList = 40;
  if (tasks[taskId].assigned.length > 0) {
    highList = tasks[taskId].assigned.length * 40;
  }
  return highList;
}

/**
 * Displays avatar images for selected contacts during task editing.
 * @param {number[]} selecetContactsEdit - Array of selected contact indices.
 * @param {Array} contacts - Array of available contacts.
 * @param {Array} colors - Array of color codes.
 */
function displayAvatarEditBoart(selecetContactsEdit, contacts, colors) {
  let contactAvatarEdit = document.getElementById("contactAvatarEditBoard");
  contactAvatarEdit.innerHTML = "";
  for (let i = 0; i < selecetContactsEdit.length; i++) {
    let surnameBoard = "";
    let selectedIndexBoar = selecetContactsEdit[i];
    let contact = contacts[selectedIndexBoar];
    let name = contact.name;
    let firstnameBoard = name.split(" ")[0][0].toUpperCase();
    if (name.split(" ")[1]) {
      surnameBoard = name.split(" ")[1][0].toUpperCase();
    }
    let currentContactContentBoard = generateAvatarAddTaskBoard(selectedIndexBoar, contact, firstnameBoard, surnameBoard);
    contactAvatarEdit.innerHTML += currentContactContentBoard;
  }
}

/**
 * Handles the click event when a contact is checked during task editing.
 * @param {number} i - The index of the selected contact.
 * @param {HTMLElement} liElementEdit - The list item element representing the contact.
 * @param {HTMLElement} nameElementEdit - The name element of the contact.
 * @param {HTMLElement} labelElementEdit - The label element for styling the contact checkbox.
 */
function contactCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit) {
  if (!selecetContactsEdit.includes(i)) {
    selecetContactsEdit.push(i);
  }
  displayAvatarEditBoart(selecetContactsEdit, contacts, colors);
  liElementEdit.classList.add("contactListSelected");
  nameElementEdit.classList.add("nameContactWhite");
  labelElementEdit.style.setProperty("background-image", "url('')");
  assignedWwasEdited = true;
}

/**
 * Handles the click event when a contact is not checked during task editing.
 * @param {number} i - The index of the deselected contact.
 * @param {HTMLElement} liElementEdit - The list item element representing the contact.
 * @param {HTMLElement} nameElementEdit - The name element of the contact.
 * @param {HTMLElement} labelElementEdit - The label element for styling the contact checkbox.
 */
function contactNotCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit) {
  let index = selecetContactsEdit.indexOf(i);
  if (index > -1) {
    selecetContactsEdit.splice(index, 1);
  }
  liElementEdit.classList.remove("contactListSelected");
  nameElementEdit.classList.remove("nameContactWhite");
  labelElementEdit.style.setProperty("background-image", "url('')");
  assignedWwasEdited = true;
}

/**
 * Validates the state of a contact checkbox during task editing and updates the display accordingly.
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} liElementEdit - The list item element representing the contact.
 * @param {HTMLElement} nameElementEdit - The name element of the contact.
 * @param {HTMLElement} labelElementEdit - The label element for styling the contact checkbox.
 * @param {Event} event - The change event object.
 */
function validationContactsCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit, event) {
  if (event.target.checked) {
    contactCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit);
  } else {
    contactNotCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit);
  }
}

/**
 * Renders a contact on the add task board with a checkbox and additional details.
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} contactsList - The list element to which the contact is appended.
 */
function renderContactsAddTaskBoard(i, contactsList) {
  let surnameBoard = "";
  let contact = contacts[i];
  let nameEdit = contact.name;
  let firstnameBoard = nameEdit.split(" ")[0][0].toUpperCase();
  if (nameEdit.split(" ")[1]) {
    surnameBoard = nameEdit.split(" ")[1][0].toUpperCase();
  }
  let contactElement = document.createElement("li");
  contactElement.classList.add("contactListBoard");
  contactElement.innerHTML = generateContactsAddTaskBoard(nameEdit, firstnameBoard, surnameBoard, i);
  contactsList.appendChild(contactElement);
  addCheckboxChangeListener(i, contactsList);
}

/**
 * Adds a change listener to the checkbox for a contact.
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} contactsList - The list element containing the contact.
 */
function addCheckboxChangeListener(i, contactsList) {
  const liElementEdit = contactsList.getElementsByTagName("li")[i];
  const nameElementEdit = contactsList.getElementsByTagName("label")[i];
  const checkboxEdit = document.getElementById(`myCheckbox_Edit${i}`);
  checkboxEdit.addEventListener("change", function (event) {
    const labelElementEdit = document.querySelectorAll(".nameContact")[i];
    validationContactsCheckedEdit(i, liElementEdit, nameElementEdit, labelElementEdit, event);
  });
}

/**
 * Sorts the contacts array alphabetically by name.
 */
function sortContactsBoard() {
  contacts.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

/**
 * Renders the contacts for editing tasks on the board.
 * @function
 */
function renderEditTask() {
  let contactsList = document.getElementById("contactListBoard");
  contactsList.innerHTML = "";
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    renderContactsAddTaskBoard(i, contactsList);
  }
  document.getElementById("searchContactsBoard").addEventListener("keyup", handleContactSearchEdit);
}

/**
 * Handles the keyup event for searching contacts during task editing.
 * @function
 */
function handleContactSearchEdit() {
  let input = document.getElementById("searchContactsBoard");
  let filter = input.value.toUpperCase();
  let contacts = document.getElementsByClassName("contactListBoard");
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let nameElement = contact.getElementsByClassName("nameContact").name;
    let txtValue = nameElement.textContent || nameElement.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      contact.style.display = "";
    } else {
      contact.style.display = "none";
    }
  }
}

/**
 * Toggles the visibility of vector and image check elements during task editing.
 * @function
 */
function hideVectorAndImgCheckEdit() {
  let vectorAndImgCheck = document.getElementById("vectorAndImgCheckEdit");
  let imgPlus = document.getElementById("addSubtasksPlusEdit");
  let imgPlusContainer = document.getElementById("imgPlusContainerEdit");
  if (vectorAndImgCheck && imgPlus) {
    vectorAndImgCheck.classList.toggle("d-none");
    imgPlus.classList.toggle("d-none");
    imgPlusContainer.classList.toggle("d-none");
  }
}

/**
 * Validates assigned contacts during task editing and sets the corresponding checkboxes as checked.
 * @param {string} taskId - The ID of the task being edited.
 * @function
 */
function validateAssignedContacts(taskId) {
  selecetContactsEdit = [];
  let index = validateIndexFromTask(taskId);
  let task = tasks[index];
  let assignedCardEdited = task["assigned"];
  for (let i = 0; i < assignedCardEdited.length; i++) {
    let contactCardEdited = assignedCardEdited[i];
    for (let c = 0; c < contacts.length; c++) {
      const contactFromArray = contacts[c].name;
      if (contactFromArray === contactCardEdited) {
        setCheckedToAssigned(c);
      }
    }
  }
}

/**
 * Sets the "checked" state for a contact checkbox during task editing.
 * @param {number} c - The index of the contact in the contacts array.
 * @function
 */
function setCheckedToAssigned(c) {
  let contactsList = document.getElementById("contactListBoard");
  const liElement = contactsList.getElementsByTagName("li")[c];
  const nameElement = contactsList.getElementsByTagName("label")[c];
  const labelElement = document.querySelectorAll(".nameContact")[c];
  contactCheckedEdit(c, liElement, nameElement, labelElement);
  document.getElementById(`myCheckbox_Edit${c}`).checked = true;
}

/**
 * Finds the index of a task in the tasks array based on the task ID.
 * @param {string} taskId - The ID of the task to find.
 * @returns {number} - The index of the task in the tasks array.
 */
function validateIndexFromTask(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let id = task["id"];
    if (id === taskId) {
      return i;
    }
  }
}

/**
 * Saves the currently assigned contacts before any edits.
 * @param {string} taskId - The ID of the task being edited.
 */
function saveUneditedAssigned(taskId) {
  oldAssigned = [];
  let index = validateIndexFromTask(taskId);
  let task = tasks[index];
  let assignedArray = task["assigned"];
  for (let i = 0; i < assignedArray.length; i++) {
    let assignedFromTask = assignedArray[i];
    oldAssigned.push(assignedFromTask);
  }
}

/**
 * Saves the initially existing subtasks before any edits.
 * @param {string} taskId - The ID of the task being edited.
 */
function saveOldSubs(taskId) {
  oldSubs = [];
  let index = validateIndexFromTask(taskId);
  let task = tasks[index];
  let subsArray = task["subtasks"];
  for (let s = 0; s < subsArray.length; s++) {
    const subsFromTask = subsArray[s];
    oldSubs.push(subsFromTask);
  }
}

/**
 * Changes the work phase (task status) of a task.
 * @param {string} currentWorkStep - The updated work phase.
 * @param {string} taskId - The ID of the task being updated.
 */
async function changeWorkPhase(currentWorkStep, taskId) {
  let index = validateIndexFromTask(taskId);
  tasks[index].taskStatus = currentWorkStep;
  changeColorButtonResponsiveWorkStep(currentWorkStep);
  updateHtml();
  let newTaskData = await generateNewDataToBackendTasks(tasks[index], tasks[index].subtasks);
  updateTaskOnServer(newTaskData, tasks[index].id);
  renderProgressbar();
  renderSmallContats();
}

/**
 * Changes the color of the responsive work step buttons based on the current work phase.
 * @param {string} currentWorkStep - The current work phase of the task.
 */
function changeColorButtonResponsiveWorkStep(currentWorkStep) {
  resetColorButtonResponsiveWorkStep();
  switch (currentWorkStep) {
    case "todo":
      document.getElementById("responsiveButtonToDo").classList.add("responsiveButtonColor");
      break;
    case "inProgress":
      document.getElementById("responsiveButtonInProgress").classList.add("responsiveButtonColor");
      break;
    case "awaitFeedback":
      document.getElementById("responsiveButtonAwaitFeedBack").classList.add("responsiveButtonColor");
      break;
    case "done":
      document.getElementById("responsiveButtonDone").classList.add("responsiveButtonColor");
      break;
  }
}

/**
 * Resets the color of all responsive work step buttons.
 */
function resetColorButtonResponsiveWorkStep() {
  document.getElementById("responsiveButtonToDo").classList.remove("responsiveButtonColor");
  document.getElementById("responsiveButtonInProgress").classList.remove("responsiveButtonColor");
  document.getElementById("responsiveButtonAwaitFeedBack").classList.remove("responsiveButtonColor");
  document.getElementById("responsiveButtonDone").classList.remove("responsiveButtonColor");
}
