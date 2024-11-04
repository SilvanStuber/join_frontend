/**
 *
 * @param {string} category - the priority category.
 * @returns {string} the css class of the selected priority category.
 */
function getCategoryPriorityColor(category) {
  switch (category) {
    case "Urgent":
      return "priorityUrgent";
    case "Medium":
      return "priorityMedium";
    case "Low":
      return "priorityLow";
    default:
      return "priorityMedium";
  }
}

/**
 * Saves task-related data values to local storage
 */
async function save() {
  localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
  localStorage.setItem("currentId", JSON.stringify(currentId));
  localStorage.setItem("title", JSON.stringify(title));
  localStorage.setItem("description", JSON.stringify(description));
  localStorage.setItem("assigned", JSON.stringify(assigned));
  localStorage.setItem("dueDate", JSON.stringify(dueDate));
  localStorage.setItem("priorityContentArray", JSON.stringify(priorityContentArray));
  localStorage.setItem("subtasks", JSON.stringify(subtasks));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("category", JSON.stringify(category));
  localStorage.setItem("subT", JSON.stringify(subT));
}

/**
 * Loads task values/data from local storage in to variables
 */
function load() {
  let taskStautsAsText = localStorage.getItem("taskStatus");
  let idAsText = localStorage.getItem("currentId");
  let titleAsText = localStorage.getItem("title");
  let descriptionAsText = localStorage.getItem("description");
  let assignedAsText = localStorage.getItem("assigned");
  let dueDateAsText = localStorage.getItem("dueDate");
  let priorityContentArrayText = localStorage.getItem("priorityContentArray");
  let subtaskAsText = localStorage.getItem("subtasks");
  let tasksAsText = localStorage.getItem("tasks");
  let categoryAsText = localStorage.getItem("category");
  let subTAsText = localStorage.getItem("subT");
  setToVariable(taskStautsAsText, idAsText, titleAsText, descriptionAsText, assignedAsText, dueDateAsText, priorityContentArrayText, subtaskAsText, tasksAsText, categoryAsText, subTAsText);
}

/**
 * Sets loaded data from local storage to corresponding variables.
 *
 * @param {string} taskStautsAsText - Task status data as text from local storage.
 * @param {string} idAsText - Current ID data as text from local storage.
 * @param {string} titleAsText - Title data as text from local storage.
 * @param {string} descriptionAsText - Description data as text from local storage.
 * @param {string} assignedAsText - Assigned contacts data as text from local storage.
 * @param {string} dueDateAsText - Due date data as text from local storage.
 * @param {string} priorityContentArrayText - Priority content array data as text from local storage.
 * @param {string} subtaskAsText - Subtasks data as text from local storage.
 * @param {string} tasksAsText - Tasks data as text from local storage.
 * @param {string} categoryAsText - Category data as text from local storage.
 * @param {string} subTAsText - Subtasks data array as text from local storage.
 */
function setToVariable(taskStautsAsText, idAsText, titleAsText, descriptionAsText, assignedAsText, dueDateAsText, priorityContentArrayText, subtaskAsText, tasksAsText, categoryAsText, subTAsText) {
  if (taskStautsAsText && idAsText && titleAsText && descriptionAsText && assignedAsText && dueDateAsText && priorityContentArrayText && subtaskAsText && subTAsText && categoryAsText) {
    taskStatus = JSON.parse(taskStautsAsText);
    currentId = JSON.parse(idAsText);
    title = JSON.parse(titleAsText);
    description = JSON.parse(descriptionAsText);
    assigned = JSON.parse(assignedAsText);
    dueDate = JSON.parse(dueDateAsText);
    priorityContentArray = JSON.parse(priorityContentArrayText);
    subtasks = JSON.parse(subtaskAsText);
    tasks = JSON.parse(tasksAsText) || [];
    subT = JSON.parse(subTAsText) || [];
    category = JSON.parse(categoryAsText) || [];
  }
}

/**
 * Sets up listeners to hide the task category list when clicking outside of it.
 */
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    let categoryFrame = document.getElementById("categoryFrame_74");
    let list = document.getElementById("list");
    let isClickInsideCategoryFrame = categoryFrame && categoryFrame.contains(event.target);
    let isClickInsideList = list && list.contains(event.target);
    let arrow = document.getElementById("arrow");
    let arrowDrop = document.getElementById("arrow_drop_downHover");
    if (!isClickInsideCategoryFrame && categoryFrame && categoryFrame.offsetParent !== null && !isClickInsideList) {
      list.classList.add("hide");
      arrow.classList.remove("rotate");
      arrowDrop.classList.remove("rotate");
      categoryFrame.style.border = "";
    }
  });
});

/**
 * Hides the assigned contacts list and updates avatars based on user actions.
 *
 *  @param {Event} [event] - The event object.
 */
function hideAssigned(event) {
  let list = document.getElementById("listContact");
  let arrow = document.getElementById("arrowAssigned");
  let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");
  if (event && event.target && event.target.id !== "assigned") {
    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrowDrop.classList.toggle("rotate");
  } else {
    list.classList.add("hide");
    arrow.classList.remove("rotate");
    arrowDrop.classList.remove("rotate");
  }
  displayAvatar(selectedContacts, contacts, colors);
}

/**
 * Sets up listeners to hide the assigned contacts list when clicking outside of it.
 */
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    let listContact = document.getElementById("listContact");
    let assignedElement = document.getElementById("assigned");
    let arrow = document.getElementById("arrowAssigned");
    let arrowDrop = document.getElementById("arrow_drop_downHoverAssigned");
    let isClickInsideList = listContact && listContact.contains(event.target);
    let isClickOnAssigned = assignedElement && assignedElement.contains(event.target);
    if (!isClickInsideList && listContact && listContact.offsetParent !== null && !isClickOnAssigned) {
      listContact.classList.add("hide");
      arrow.classList.remove("rotate");
      arrowDrop.classList.remove("rotate");
      displayAvatar(selectedContacts, contacts, colors);
    }
  });
});

/**
 * Generates HTML for adding contacts to a task.
 *
 * @function
 * @param {string} name - Full name of the contact.
 * @param {string} firstname - First name of the contact.
 * @param {string} surname - Surname of the contact.
 * @param {number} i - Index of the contact.
 * @returns {string} HTML content for adding contacts to a task.
 */
function generateContactsAddTask(name, firstname, surname, i) {
  return /*html*/ `
  <div class="circleAvatar" id="circle-${i}" style="background-color: ${colors[i]}">
    <p class="nameIdList" id="name-id">${firstname}${surname}</p>
  </div>                
  <div class="custom-checkbox">            
    <input class="inputCheckBox" type="checkbox" id="myCheckbox_${i}">                    
    <label class="nameContact" for="myCheckbox_${i}">${name}</label>                              
  </div>`;
}

/**
 * Generates HTML für displaying avatars of selected contacts.
 *
 * @param {number} selectedIndex - index of the selected contacts
 * @param {*} contact - Selected contact object.
 * @param {*} firstname - First name of the contact.
 * @param {*} surname - Surname of the contact.
 * @returns {string} - HTML content for displaying acatars of selected contacts.
 */
function generateAvatarAddTask(selectedIndex, contact, firstname, surname) {
  return /*html*/ `
      <div>
          <div class="circleAvatar" id="circle-${selectedIndex}" style="background-color: ${colors[selectedIndex]}">
              <p class="nameIdList" id="name-id">${firstname}${surname}</p>
          </div>
      </div>
  `;
}

let selectedPriority = null;

/**
 * Clears the active class from priority elements that do not have the priorityActive class.
 */
function clearPrioActiveClass() {
  const priorityElements = document.querySelectorAll(".priority");
  priorityElements.forEach((priority) => {
    if (!priority.classList.contains("priorityActive")) {
      priority.classList.remove("active");
    }
  });
}

/**
 * Changes the colors and style of the selected priority element.
 *
 * @param {string} divID - ID of the selectd priority element
 * @returns divID - the id of the selected priority urgent, medium or low
 */
function changeColour(divID) {
  const selected = document.getElementById(divID);
  if (selected === selectedPriority) return;
  resetPreviousPriority(selected);
  activateSelectedPriority(selected);
  updatePriorityElements(divID);
}

/**
 * Resets the color and active class of the previous selected priority element.
 *
 * @param {HTMLElement} selected - The currently selected priority element.
 */
function resetPreviousPriority(selected) {
  if (selectedPriority) {
    selectedPriority.classList.remove("active");
    selectedPriority.style.color = "";
  }
}

/**
 * Activates the selected priority by adding the 'active' class and changing the text color to white.
 *
 * @param {HTMLElement} selected - The currently selected priority element.
 */
function activateSelectedPriority(selected) {
  selected.classList.add("active");
  selected.style.color = "white";
  selectedPriority = selected;
}

/**
 * Updates the styles of priority elements based on the selected priority.
 *
 * @param {divID} divID - The ID of the selected priority element.
 */
function updatePriorityElements(divID) {
  const priorities = ["priorityUrgent", "priorityMedium", "priorityLow"];
  for (const priorityID of priorities) {
    const priorityElement = document.getElementById(priorityID);
    if (priorityElement && priorityElement !== selectedPriority) {
      resetPriorityStyles(priorityElement);
    }
  }
  toggleSelectedPriorityStyles(divID);
}

/**
 * Resets the colors and styles of a priority element.
 *
 * @param {HTMLElement} priorityElement
 */
function resetPriorityStyles(priorityElement) {
  priorityElement.classList.remove(`${priorityElement.id}-active`);
  const imgPaths = document.querySelectorAll(`.img-${priorityElement.id}`);
  imgPaths.forEach((path) => {
    path.classList.remove("imgPrio-active");
  });
  const textElement = priorityElement.querySelector(`.text${priorityElement.id.slice(8)}`);
  if (textElement) {
    textElement.style.color = "";
  }
}

/**
 * Toggles the active class ans changes the text color of the selected priority element.
 *
 * @param {string} divID - The ID of the selected priority element.
 */
function toggleSelectedPriorityStyles(divID) {
  const selected = document.getElementById(divID);
  selected.classList.toggle(`${divID}-active`);
  const selectedImgPaths = document.querySelectorAll(`.img-${divID}`);
  selectedImgPaths.forEach((path) => {
    path.classList.toggle("imgPrio-active");
  });
  const selectedTextElement = selected.querySelector(`.text${divID.slice(8)}`);
  if (selectedTextElement) {
    const isCurrentlyActive = selected.classList.contains(`${divID}-active`);
    const previousActivePriority = document.querySelector(`.${selectedPriority.id}-active`);
    if (previousActivePriority && previousActivePriority !== selected) {
      const previousTextElement = previousActivePriority.querySelector(`.text${previousActivePriority.id.slice(8)}`);
      if (previousTextElement) {
        previousTextElement.style.color = "";
      }
    }
    selectedTextElement.style.color = isCurrentlyActive ? "white" : "";
  }
}

/**
 * Resets the text color of priority elements to their default state.
 */
function resetPriorityTextColors() {
  const urgent = document.getElementById("priorityUrgent");
  const medium = document.getElementById("priorityMedium");
  const low = document.getElementById("priorityLow");
  resetTextColor(urgent);
  resetTextColor(medium);
  resetTextColor(low);
}

/**
 * Resets the text color of an specific priority element.
 *
 * @param {HTMLElement} prio
 */
function resetTextColor(prio) {
  if (prio) {
    let textElement = prio.querySelector(`.text${prio.id.slice(8)}`);
    if (textElement) {
      textElement.style.color = "";
    }
  }
}

/**
 * Removes the active class from a specific priority element.
 *
 * @param {string} divID - ID of the pritórity element to remove the active class.
 */
function removePrioActiveClass(divID) {
  const prio = document.getElementById(divID);
  if (prio) {
    prio.classList.remove(`${divID}-active`);
  }
}

/**
 * clears the selectet task category ans updates the inpt field and the display.
 */
function clearTaskCategory() {
  document.getElementById("categorySelect").textContent = "Select a task category";
}

/**
 * Handles the selection of a task category and updates the display accordingly.
 *
 * @param {HTMLElement} clickedElement - the clicked element representing the selected task category.
 */
function selectCategory(clickedElement) {
  let selectText = clickedElement.querySelector("p").getAttribute("value");
  let taskCategory = document.getElementById("taskCategory");
  let categoryFrame74 = document.getElementById("categoryFrame_74");
  categoryFrame74.style.border = "";
  if (selectText !== "Select a task category") {
    category = [];
    category.unshift(selectText);
    category.push(categorySelect);
    save();
    taskCategory.querySelector("p").textContent = selectText;
  }
}

/**
 * Toggles the visibility of the task catefory dropdown list.
 *
 * @param {Event} event - the event triggered by user's interaction.
 */
function hide(event) {
  if (event.target.id !== "inputSubtasks") {
    let list = document.getElementById("list");
    let arrow = document.getElementById("arrow");
    let arrow_drop_downHover = document.getElementById("arrow_drop_downHover");
    list.classList.toggle("hide");
    arrow.classList.toggle("rotate");
    arrow_drop_downHover.classList.toggle("rotate");
  }
}

/**
 * Add a suntask to the list of subtasks, pdates the display and hides vesctor and check icons.
 *
 * @returns {void} - returns no results.
 */
function addSubtasks() {
  const subtaskInput = document.getElementById("inputSubtasks").value;
  if (!subtaskInput) {
    return;
  } else {
    document.getElementById("inputSubtasks").value = "";
    subtasks.unshift(subtaskInput);
    updateSubtasksDisplay();
    hideVectorAndImgCheck();
  }
}
