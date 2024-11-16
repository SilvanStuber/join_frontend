let title = [];
let description = [];
let assigned = [];
let selectedContacts = [];
let dueDate = [];
let prio = [];
let category = [];
let subtasks = [];
let subT = [];
let priorityContentArray = [];
let currentId = 5;
let selectedPriorityContent = "";
let preselectedCategory = "Medium";
let statusFromUser = "todo";

/**
 * Creates a task object with the provided inputs.
 *
 * @function
 * @param {string} assigned - An array of assigned users for the task.
 * @param {string} category - An array of task categories.
 * @param {string} description - The description of the task.
 * @param {string} dueDate - The due date for the task.
 * @param {number} id - The unique identifier for the task.
 * @param {string} priorityContent - The priority content for the task.
 * @param {string} priorityID - The priority ID for the task.
 * @param {string} subtasks - An array of subtasks associated with the task.
 * @param {string} taskStatus - The status of the task (e.g., "todo", "done").
 * @param {string} title - The title of the task.
 * @returns {Object} - The task object containing the provided details.
 */
function createTask(assigned, category, description, dueDate, id, priorityContent, priorityID, subtasks, taskStatus, title) {
  return { assigned, category, description, dueDate, id, priorityContent, priorityID, subtasks, taskStatus, title };
}

/**
 * Fnction to initialize the process of adding a task
 */
async function addTaskInit() {
  await loadUserLoginData();
  await loadContactsFromServer();
  await includeHTML();
  setInitialsInTheHeader();
  renderTask();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryAddTask").classList.add("sidebarCategoryLinkActive");
}

/**
 * Renders the task by unpdating the contacts list and applying stlyles
 */
function renderTask() {
  let contactsList = document.getElementById("contactList");
  contactsList.innerHTML = "";
  sortContacts();
  for (let i = 0; i < contacts.length; i++) {
    renderContactsAddTask(i, contactsList);
  }
  document.getElementById("searchContacts").addEventListener("keyup", handleContactSearch);
  changeColour(getCategoryPriorityColor(preselectedCategory), preselectedCategory);
}

/**
 * Renders a contact in the contacts list and sets up event listeners.
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} contactsList - The container element for the list of contacts.
 */
function renderContactsAddTask(i, contactsList) {
  let contact = contacts[i];
  let name = contact.name;
  let firstname = name.split(" ")[0][0].toUpperCase();
  let surname = name.split(" ")[1][0].toUpperCase();
  let contactElement = document.createElement("li");
  contactElement.classList.add("contactList");
  contactElement.innerHTML = generateContactsAddTask(name, firstname, surname, i);
  contactsList.appendChild(contactElement);
  const liElement = contactsList.getElementsByTagName("li")[i];
  const nameElement = contactsList.getElementsByTagName("label")[i];
  document.getElementById(`myCheckbox_${i}`).addEventListener("change", (event) => {
    validationContactsChecked(i, liElement, nameElement, event);
  });
}

/**
 * Validates and updates the styling of a contact based on checkbox state.
 *
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} liElement - The list item element representing the contact.
 * @param {HTMLElement} nameElement - The label element for the contact.
 * @param {Event} event - The change event triggered by the checkbox.
 */
function validationContactsChecked(i, liElement, nameElement, event) {
  if (event.target.checked) {
    contactChecked(i, liElement, nameElement);
  } else {
    contactNotChecked(i, liElement, nameElement);
  }
}

/**
 * Handles the action when a cntact is checked
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} liElement - The list item element representing the contact.
 * @param {HTMLElement} nameElement - The label element for the contact.
 */

function contactChecked(i, liElement, nameElement) {
  if (!selectedContacts.includes(i)) selectedContacts.push(i);
  displayAvatar(selectedContacts, contacts, colors);
  liElement.classList.add("contactListSelected");
  nameElement.classList.add("nameContactWhite");
  nameElement.style.backgroundImage = "url('')";
  clearInputAndDisplayContacts();
}

/**
 * Clears the input ans displays all contacts.
 */
function clearInputAndDisplayContacts() {
  let input = document.getElementById("searchContacts");
  input.value = "";
  setTimeout(displayAllContacts, 100);
}

/**
 * Displays all contacts setting their display style to an empty string
 */
function displayAllContacts() {
  let contacts = document.getElementsByClassName("contactList");
  for (let i = 0; i < contacts.length; i++) {
    contacts[i].style.display = "";
  }
}

/**
 * Handles the actions when a contact is not checked.
 *
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} liElement - The list item element representing the contact.
 * @param {HTMLElement} nameElement - The label element for the contact.
 */
function contactNotChecked(i, liElement, nameElement) {
  let index = selectedContacts.indexOf(i);
  if (index > -1) selectedContacts.splice(index, 1);
  liElement.classList.remove("contactListSelected");
  nameElement.classList.remove("nameContactWhite");
  nameElement.style.backgroundImage = "url('')";
}

/**
 * Handles the search functionality for contacts based on users input.
 */
function handleContactSearch() {
  let input = document.getElementById("searchContacts");
  let filter = input.value.toUpperCase();
  let contacts = document.getElementsByClassName("contactList");
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let nameElement = contact.getElementsByClassName("nameContact").name;
    let txtValue = nameElement.textContent || nameElement.innerText;
    contact.style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
  }
}

/**
 * Displays avatars for selected contacts in the contact avatar container.
 *
 * @param {number} selectedContacts - An array of indices representing selected contacts.
 * @param {string} contacts - An array of contact details.
 */
function displayAvatar(selectedContacts, contacts) {
  let contactAvatar = document.getElementById("contactAvatar");
  contactAvatar.innerHTML = "";
  for (let i = 0; i < selectedContacts.length; i++) {
    let selectedIndex = selectedContacts[i];
    let contact = contacts[selectedIndex];
    let name = contact.name;
    let firstname = name.split(" ")[0][0].toUpperCase();
    let surname = name.split(" ")[1][0].toUpperCase();
    let currentContactContent = generateAvatarAddTask(selectedIndex, contact, firstname, surname);
    contactAvatar.innerHTML += currentContactContent;
  }
}

/**
 * Clears the contact avatar container and resets selections.
 */
function clearContactAvatarAndSelections() {
  let contactAvatar = document.getElementById("contactAvatar");
  contactAvatar.innerHTML = "";
  const checkboxes = document.querySelectorAll(".inputCheckBox");
  const labels = document.querySelectorAll(".nameContact");
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = false;
    const liElement = checkbox.closest("li");
    if (liElement) {
      liElement.classList.remove("contactListSelected");
    }
    labels[index].classList.remove("nameContactWhite");
    labels[index].style.setProperty("background-image", "none");
  });
}

/**
 *
 * @param {string} statusFromUser - The status assigned.
 * @param {string} titleVale - Value of tag input.
 * @returns {string} title - title as string.
 * @param {string} dueDateValue - Value of tag date from user.
 * @returns {string} date - date as string.
 * @param {string} categoryValue - Category input from user.
 * @returns {string} category - category as string.
 */
function addTask(statusFromUser) {
  switchColorpriorityContent();
  const titleValue = getValueAndClearInput("title");
  const descriptionValue = getValueAndClearInput("description");
  const dueDateValue = getValueAndClearInput("dueDate");
  checkboxAddTask();
  const { priorityContent, selectedPriorityID } = getPriorityInfo();
  const categoryValue = getTaskCategoryValue();
  if (!checkRequiredFields(titleValue, dueDateValue, categoryValue)) {
    return;
  }
  priorityContentArray.unshift(priorityContent);
  currentId++;
  const newTask = createNewTask(titleValue, descriptionValue, dueDateValue, priorityContent, selectedPriorityID, statusFromUser);
  updateArrays(newTask);
  document.getElementById("categorySelect").textContent = "Select a task category";
  subtasks = [];
  saveRenderAndReset();
}

/**
 * Gets the value from the specified input field and clears the input.
 *
 * @function
 * @param {string} inputId - The ID of the input field.
 * @returns {string} - The value of the input field as string.
 */
function getValueAndClearInput(inputId) {
  const inputValue = document.getElementById(inputId).value;
  document.getElementById(inputId).value = "";
  return inputValue;
}

/**
 * Gets the indormation about the selected priority
 *
 * @returns {string} - Information about the selected priority.
 */

function getPriorityInfo() {
  const selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
  const priorityContent = selectedPriority ? selectedPriority.innerHTML : "";
  const selectedPriorityID = selectedPriority ? selectedPriority.id : "";
  return { priorityContent, selectedPriorityID };
}

/**
 * Gets the value of the task category.
 *
 * @returns {string} - The value of the task category.
 */
function getTaskCategoryValue() {
  const categoryElement = document.getElementById("taskCategory");
  return categoryElement ? categoryElement.textContent : "Select a task category";
}

/**
 * Creates a new task object with the provided values.
 *
 * @param {string} title - The title of the new task.
 * @param {string} description - The description of the new task.
 * @param {string} dueDate - The due date of the new task.
 * @param {string} priorityContent - The priority content of the new task.
 * @param {string} selectedPriorityID - The priority ID of the new task.
 * @param {string} statusFromUser - The status assigned to the new task.
 * @returns {object} - The newly created task object.
 */
function createNewTask(title, description, dueDate, priorityContent, selectedPriorityID, statusFromUser) {
  return {
    id: currentId,
    title,
    description,
    dueDate,
    assigned: assigned,
    priorityContent,
    priorityID: selectedPriorityID,
    subtasks: subtasks.slice(),
    taskStatus: statusFromUser,
    category: category,
  };
}

/**
 *
 * @param {object} newTask - the newly created task object
 */
function updateArrays(newTask) {
  subT.unshift(subtasks.slice());
  tasks.unshift(newTask);
  postTaskToBackend(newTask);
  statusFromUser = "todo";
}

/**
 * Saves date, render tasks, resets the element and clears category, selectes contacts and contact avatars
 */
function saveRenderAndReset() {
  renderTask();
  clearPrioActiveClass();
  removePrioActiveClass();
  taskSuccess();
  updateSubtasksDisplay();
  resetPriorityTextColors();
  category = [];
  selectedContacts = [];
  clearContactAvatarAndSelections();
}

/**
 * Switches the color of the priority content based on the selected priority.
 */
function switchColorpriorityContent() {
  let selectedPriority = document.querySelector(".priorityUrgent-active, .priorityMedium-active, .priorityLow-active");
  if (selectedPriority) {
    priorityID = selectedPriority.id;
    const textElement = {
      priorityUrgent: "textUrgent",
      priorityMedium: "textMedium",
      priorityLow: "textLow",
    }[priorityID];
    if (textElement) {
      document.getElementById(textElement).style.color = "black";
    }
  }
}

/**
 * Collects selected contacts from checkboxes and fills the assigned array.
 */
function checkboxAddTask() {
  let checkboxes = document.querySelectorAll(".inputCheckBox");
  assigned = [];
  checkboxes.forEach((checkbox, index) => {
    let label = document.querySelector(`.nameContact[for=myCheckbox_${index}]`);
    if (checkbox.checked && label) {
      assigned.push(label.textContent);
    }
  });
}

/**
 * Clears elements and resets values related to a task when fields are selected or filled
 */
function clearTask() {
  subtasks = [];
  selectedContacts = [];
  clearTaskValues();
  removeBorderColorAndHideIndicator("titleFieldRequired");
  removeBorderColorAndHideIndicator("dueDateFieldRequired");
  clearContactAvatarAndSelections();
  clearPrioActiveClass();
  removePrioActiveClass();
  clearTaskCategory();
  resetPriorityTextColors();
  hideAssigned();
  changeColour(getCategoryPriorityColor(preselectedCategory), preselectedCategory);
}

/**
 * Clears the values of elements related to a new task
 */
function clearTaskValues() {
  let categoryFrame74 = document.getElementById("categoryFrame_74");
  categoryFrame74.style.border = "";
  let allSubtasksDiv = document.getElementById("allSubtasks");
  allSubtasksDiv.innerHTML = "";
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("inputSubtasks").value = "";
  document.getElementById("taskCategory").value = "";
  document.getElementById("searchContacts").value = "";
}
