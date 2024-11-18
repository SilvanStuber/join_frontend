/**
 * Updates the display od subtasks in the UI
 */
function updateSubtasksDisplay() {
  const allSubtasksDiv = document.getElementById("allSubtasks");
  allSubtasksDiv.innerHTML = "";
  if (subtasks.length === 0) {
    return;
  } else {
    subtasks.forEach((subtask, index) => {
      const subtaskItemDiv = createSubtaskItem(subtask);
      const iconsContainer = createIconsContainer(subtaskItemDiv, subtask, index);
      subtaskItemDiv.appendChild(iconsContainer);
      allSubtasksDiv.appendChild(subtaskItemDiv);
    });
  }
}

/**
 *
 * @param {string} subtaskText - The text content of the suntask.
 * @returns {HTMLElement} The created subtask item element.
 */
function createSubtaskItem(subtaskText) {
  const subtaskItemDiv = document.createElement("div");
  subtaskItemDiv.classList.add("subtaskItem");
  const subtaskItemText = document.createElement("li");
  subtaskItemText.innerText = subtaskText;
  subtaskItemDiv.appendChild(subtaskItemText);
  subtaskItemDiv.addEventListener("dblclick", function () {
    handleEditClick(subtaskItemDiv, subtaskText);
  });
  return subtaskItemDiv;
}

/**
 * Creates an HTML element with a container for icons related to a subtask.
 *
 * @param {HTMLElement} subtaskItemDiv -The container for the subtask item.
 * @param {string} subtaskText - The test content of the subtask.
 * @param {number} index - The index of the subtask in the subtask array.
 * @returns {HTMLElement} - The created icons container element.
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
 * Creates an HTML image element with the specified source and class name.
 *
 * @param {string} src - The source URL of the image for the subtaskItem Div.
 * @param {string} className - The Class name to be applied to the image.
 * @returns {HTMLElement} The created image element.
 */
function createImage(src, className) {
  const img = document.createElement("img");
  img.classList.add(className);
  img.src = src;
  return img;
}

/**
 * Creates an HTML element representing a container for icons related to a subtask during the edit mode.
 *
 * @param {HTMLDivElement} subtaskItemDiv - The container for the subtask item.
 * @param {string} subtaskText - The text content of the subtask.
 * @param {number} index - The index of the subtask in the subtasks array.
 * @returns {HTMLDivElement} - The created icons container element.
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

/**
 * Handles the click event to delete a subtask, removes it from the subtasks array, and removes the corresponding HTML element.
 *
 * @param {HTMLDivElement} subtaskItemDiv - The container for the subtask item.
 * @param {number} index - The index of the subtask in the subtasks array.
 */
function handleDeleteClick(subtaskItemDiv, index) {
  subtasks.splice(index, 1);
  subtaskItemDiv.remove();
}

/**
 * Handles the click event to initiate the editing of a subtask item.
 *
 * @param {HTMLDivElement} subtaskItemDiv - The container for the subtask item.
 * @param {string} subtaskText - The text content of the subtask.
 * @returns {void}
 */
function handleEditClick(subtaskItemDiv, subtaskText) {
  if (!subtaskItemDiv || !subtaskText) {
    return;
  }
  const subtaskItemText = subtaskItemDiv.querySelector("li");
  if (subtaskItemText) {
    startEditing(subtaskItemDiv, subtaskItemText, subtaskText);
  }
}

/**
 * Initiates the editing mode for a subtask item, replacing the text with an input field.
 *
 * @param {HTMLDivElement} subtaskItemDiv - The container for the subtask item.
 * @param {HTMLLIElement} subtaskItemText - The text element of the subtask item.
 * @param {string} subtaskText - The original text content of the subtask.
 */
function startEditing(subtaskItemDiv, subtaskItemText, subtaskText) {
  const currentText = subtaskItemText.innerText;
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;
  editInput.style.outline = "none";
  editInput.style.border = "none";
  subtaskItemDiv.replaceChild(editInput, subtaskItemText);
  subtaskItemDiv.style.backgroundColor = "white";
  editInput.focus();
  editInput.addEventListener("blur", function () {
    finishEditing(editInput, subtaskItemText, subtaskText);
  });
  editInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      editInput.blur();
    }
  });
  const iconsContainer = createIconsContainerWhenEdit(subtaskItemDiv, subtaskText, subtasks.indexOf(subtaskText));
  subtaskItemDiv.replaceChild(iconsContainer, subtaskItemDiv.lastChild);
}

/**
 * Completes the editing mode for a subtask item, updating the text content and the subtasks array.
 *
 * @param {HTMLInputElement} editInput - The input field used for editing.
 * @param {HTMLLIElement} subtaskItemText - The text element of the subtask item.
 * @param {string} subtaskText - The original text content of the subtask.
 */
function finishEditing(editInput, subtaskItemText, subtaskText) {
  let newText = editInput.value.trim();
  if (newText !== "") {
    subtaskItemText.innerText = newText;
    subtasks[subtasks.indexOf(subtaskText)] = newText;
  } else {
    editInput.value = subtaskItemText.innerText;
  }
}

/**
 * Handles the click event for ckecking a subtask, updating its text content and reseting the backgroundcolor.
 *
 * @param {HTMLElement} subtaskItemDiv  - The container for the subtask item.
 * @param {HTMLElement} iconsContainer - The container for the icons related to the subtasks.
 * @param {string} subtaskText - The text content of the subtask.
 * @returns {void}
 */
function handleCheckClick(subtaskItemDiv, iconsContainer, subtaskText) {
  if (!subtaskItemDiv || !iconsContainer || !subtaskText) {
    return;
  }
  const editInput = subtaskItemDiv.querySelector("input");
  if (editInput) {
    const newText = editInput.value.trim();
    if (newText !== "") {
      const updatedSubtaskText = document.createElement("li");
      updatedSubtaskText.innerText = newText;
      subtasks[subtasks.indexOf(subtaskText)] = newText;
      const newIconsContainer = createIconsContainer(subtaskItemDiv, newText, subtasks.indexOf(newText));
      subtaskItemDiv.innerHTML = "";
      subtaskItemDiv.appendChild(updatedSubtaskText);
      subtaskItemDiv.appendChild(newIconsContainer);
    }
  }
  subtaskItemDiv.style.backgroundColor = "";
}

/**
 * Toggles the visibility of the icons vector and image plus related to the subtasks.
 */
function hideVectorAndImgCheck() {
  let vectorAndImgCheck = document.getElementById("vectorAndImgCheck");
  let imgPlus = document.getElementById("addSubtasksPlus");
  let imgPlusContainer = document.getElementById("imgPlusContainer");
  if (vectorAndImgCheck && imgPlus) {
    vectorAndImgCheck.classList.toggle("d-none");
    imgPlus.classList.toggle("d-none");
    imgPlusContainer.classList.toggle("d-none");
  }
}

/**
 * Handles the cklick event fpr a task validating required fields, adding the task, rendering the board, and display success.
 *
 * @param {*Event} event - the click event.
 * @param {string} statusFromUser - THe staus of the task.
 * @returns {void}
 */
async function handleTaskClick(event, statusFromUser) {
  if (event) {
    event.preventDefault();
  }
  let titleValue = document.getElementById("title").value;
  let categoryValue = document.getElementById("categorySelect").textContent;
  let dueDateValue = document.getElementById("dueDate").value;
  if (!checkRequiredFields(titleValue, dueDateValue, categoryValue)) {
    return;
  }
  await addTask(statusFromUser);
  setTimeout(async function () {
    window.location.href = "./board.html";
  }, 1500);
}

/**
 * Displays the task succes message for a certain duration.
 */
function taskSuccess() {
  const success = document.getElementById("task_succes");
  success.classList.remove("d-none");
  setTimeout(function () {
    document.getElementById("task_succes").classList.add("d-none");
  }, 1500);
}

/**
 * Handles input events, removing the border color and hiding the indicator for the specified field.
 *
 * @param {HTMLElement} inputElement - THe imput element triggring the event
 */
function handleInput(inputElement) {
  const elementId = inputElement.id;
  if (elementId === "title") {
    removeBorderColorAndHideIndicator("titleFieldRequired");
  } else if (elementId === "taskCategory") {
    removeBorderColorAndHideIndicator("taskCategory");
  } else if (elementId === "dueDate") {
    removeBorderColorAndHideIndicator("dueDateFieldRequired");
  }
}

/**
 * Removes the border color and hides the indicator for the specified field.
 *
 * @param {string} fieldId - The identifier for the field.
 */
function removeBorderColorAndHideIndicator(fieldId) {
  const fieldIndicator = document.getElementById(fieldId);
  const frameSelector = getFrameSelector(fieldId);
  if (frameSelector) {
    const frame = document.querySelector(frameSelector);
    if (frame) {
      frame.style.border = "";
    }
  }
  if (fieldIndicator) {
    fieldIndicator.style.display = "none";
  }
}

/**
 * Checks if the required fields (title, due date, category) have valid values.
 *
 * @param {string} titleValue - The value of the title field.
 * @param {string} dueDateValue - The value of the due date field.
 * @param {string} categoryValue - The value of the category field.
 * @returns {boolean} - Returns true if all required fields are valid; otherwise, false.
 */
function checkRequiredFields(titleValue, dueDateValue, categoryValue) {
  const fields = [
    { value: titleValue, frameSelector: ".title_frame14", indicatorSelector: "#titleFieldRequired" },
    { value: dueDateValue, frameSelector: ".dueDate_frame14", indicatorSelector: "#dueDateFieldRequired" },
    { value: categoryValue, frameSelector: ".categoryFrame_74", indicatorSelector: null },
  ];
  for (const field of fields) {
    if (!field.value || !field.value.trim() || (field.indicatorSelector && field.value === "Select a task category")) {
      changeBorderColorAndDisplayField(field.frameSelector, field.indicatorSelector);
      if (field.indicatorSelector) {
        hideFieldIndicatorsExcept(field.indicatorSelector);
      }
      return false;
    }
  }
  return true;
}

/**
 * Gets the frame selector based on the given field identifier.
 *
 * @param {string} fieldId - The identifier for the field.
 * @returns {string} - The corresponding frame selector.
 */
function getFrameSelector(fieldId) {
  switch (fieldId) {
    case "titleFieldRequired":
      return ".title_frame14";
    case "dueDateFieldRequired":
      return ".dueDate_frame14";
    default:
      return "";
  }
}

/**
 * Handles the required field logic based on the provided element's class list.
 *
 * @function
 * @param {HTMLElement} element - The HTML element triggering the event.
 */
function required(element) {
  if (element.classList.contains("frame211")) {
    changeBorderColorAndDisplayField(".dueDate_frame14", "#dueDateFieldRequired");
    hideFieldIndicatorsExcept("#dueDateFieldRequired");
  } else if (element.classList.contains("frame203")) {
    changeBorderColorAndDisplayField(".title_frame14", "#titleFieldRequired");
    hideFieldIndicatorsExcept("#titleFieldRequired");
  } else if (element.classList.contains("categoryFrame_74")) {
    changeBorderColorAndDisplayField(".categoryFrame_74");
  }
}

/**
 * Changes the border color and displays the field indicator based on the specified selectors.
 *
 * @param {string} frameSelector - The selector for the frame element.
 * @param {string} fieldIndicatorSelector - The selector for the field indicator element.
 */
function changeBorderColorAndDisplayField(frameSelector, fieldIndicatorSelector) {
  const frame = document.querySelector(frameSelector);
  const fieldIndicator = document.querySelector(fieldIndicatorSelector);
  if (frame) {
    frame.style.border = "1px solid #FF8190";
  }
  if (fieldIndicator) {
    fieldIndicator.style.display = "block";
  }
}

/**
 * Hides all field indicators except the specified one.
 *
 * @param {string} exceptSelector - The selector for the field indicator to be excluded from hiding.
 */
function hideFieldIndicatorsExcept(exceptSelector) {
  const allIndicators = document.querySelectorAll("#titleFieldRequired, #dueDateFieldRequired");
  allIndicators.forEach((indicator) => {
    if (indicator !== document.querySelector(exceptSelector)) {
      indicator.style.display = "none";
    }
  });
}
