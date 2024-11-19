const colors = ["#9227FE", "#3BDBC7", "#FD81FF", "#FFBB2A", "#6E52FF", "#169857", "#6B5E5F", "#FF7915", "#9227FE", "#3BDBC7", "#FD81FF", "#FFBB2A", "#6E52FF", "#169857", "#6B5E5F", "#FF7915"];
let selectedContactIndex = null;
let idContactFromBackend = null;

/**
 * Initializes the contacts module.
 */
async function contactsInit() {
  await loadUserLoginData();
  await includeHTML();
  setInitialsInTheHeader();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryContacts").classList.add("sidebarCategoryLinkActive");
  renderContacts();
}

/**
 * Sets an item in the contacts storage.
 * @param {string} key - The key to set in the storage.
 * @param {any} value - The value to set for the given key.
 * @returns {void} A promise that resolves with the result of the storage operation.
 */
async function renderContacts() {
  await loadContactsFromServer();
  contacts.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  showContacts();
}

/**
 * Generates a random index based on the length of the 'colors' array.
 * @returns {number} A random index within the bounds of the 'colors' array.
 */
function getRandomIndex() {
  let randomIndex = Math.floor(Math.random() * colors.length);
  newColors = colors;
  return randomIndex;
}

/**
 * Displays the contacts in the UI, grouped by the first letter of each contact's name.
 * @returns {void} This function does not return any value.
 */
function showContacts() {
  let contactsdiv = document.getElementById("contacts");
  contactsdiv.innerHTML = "";
  let currentLetter = "";
  for (let i = 0; i < contacts.length; i++) {
    let surname = "";
    let name = contacts[i].name;
    let firstname = name[0].toUpperCase();
    let names = name.split(" ");
    if (names[1]) {
      surname = names[1].toUpperCase().charAt(0);
    }
    contactsdiv.innerHTML += displayContacts(contacts[i], i, firstname, surname);
  }
}

/**
 * Resets the styling for the previously selected contact and sets the selectedContactIndex to null.
 * @returns {void} This function does not return any value.
 */
function resetSelectedContact() {
  if (selectedContactIndex !== null) {
    document.getElementById(`contact-info-${selectedContactIndex}`).style = "";
    selectedContactIndex = null;
  }
}

/**
 * Selects a contact, updates the UI, and shows the contact details.
 * @param {number} i - The index of the selected contact in the 'contacts' array.
 * @param {string} firstname - The first name of the selected contact.
 * @param {string} surname - The surname of the selected contact.
 * @param {Event} event - The event object representing the user interaction.
 * @returns {void} This function does not return any value.
 */
function selectContact(idContact, index, firstname, surname, event) {
  document.getElementById("editContact").classList.add("d-none");
  document.getElementById("editContactBackground").classList.add("d-none");
  resetSelectedContact();
  document.getElementById(`contact-info-${index}`).style = "background-color: #293647; color: white";
  selectedContactIndex = index;
  showCard(index, firstname, surname, idContact);
  document.getElementById("contact-details").classList.remove("hide-mobile-397px");
  document.getElementById("contact-list").classList.add("hide-mobile-397px");
  document.getElementById("button-add-contact-mobile").style = "display: none";
  document.getElementById("button-edit-contact-mobile").style = "display: block";
  fillOnclickDiv(index, idContact);
}

/**
 * Fills the onclickDiv with content for the selected contact.
 * @param {number} i - The index of the selected contact in the 'contacts' array.
 * @returns {void} This function does not return any value.
 */
function fillOnclickDiv(i, idContact) {
  document.getElementById("onclickDiv").innerHTML = `
    <img class="image-edit-contact-mobile" src="./assets/img/more_vert.png" onclick="openMiniPopup(${i}, ${idContact})">`;
}

/**
 * Displays contact information in the UI, updating the name, email, phone, and associated styles.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @param {string} firstname - The first name of the contact.
 * @param {string} surname - The surname of the contact.
 * @returns {void} This function does not return any value.
 */
function displayContactInfo(i, firstname, surname) {
  let name = (document.getElementById("nameCard").innerHTML = `${contacts[i].name}`);
  let email = (document.getElementById("emailCard").innerHTML = `<div class="head-info"> Email </div><div class="main-info-mail">${contacts[i].email}</div>`);
  let phone = (document.getElementById("phoneCard").innerHTML = `<div class="head-info"> Phone </div><div class="main-info"> ${contacts[i].phone}</div>`);
  let circle = document.getElementById("circleCard");
  circle.innerHTML = `<p class="nameId">${firstname}${surname}</p>`;
  circle.style = `background-color: ${colors[i]};`;
  let editCircle = document.getElementById("editCircle");
  editCircle.innerHTML = `<p class="nameIdEdit">${firstname}${surname}</p>`;
  editCircle.style = `background-color: ${colors[i]};`;
  document.getElementById("textCard").classList.remove("d-none");
  document.getElementById("circleCard").classList.remove("d-none");
}

/**
 * Updates the contact view, showing the contact card and associated buttons.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @returns {void} This function does not return any value.
 */
function updateContactView(i, idContact) {
  document.getElementById("addContact").classList.add("d-none");
  document.getElementById("addContactBackground").classList.add("d-none");
  document.getElementById("contactCard").classList.remove("d-none");
  document.getElementById("contactCard").classList.add("slide-left");
  document.getElementById("buttonsCard").innerHTML = generateButtonHTML(i, idContact);
}

/**
 * Shows the contact card by displaying contact information and updating the view.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @param {string} firstname - The first name of the contact.
 * @param {string} surname - The surname of the contact.
 * @returns {void} This function does not return any value.
 */
function showCard(i, firstname, surname, idContact) {
  displayContactInfo(i, firstname, surname);
  updateContactView(i, idContact);
}

function hoverEdit(element, isHover) {
  const logoMini = element.querySelector(".logo-mini");
  const logoMiniHover = element.querySelector(".logo-mini-hover");
  if (isHover) {
    logoMini.style.display = "none";
    logoMiniHover.style.display = "inline";
  } else {
    logoMini.style.display = "inline";
    logoMiniHover.style.display = "none";
  }
}

/**
 * Handles hovering over the cancel button, showing the appropriate cancel image.
 * @param {HTMLElement} element - The HTML element representing the cancel button.
 * @param {boolean} isHover - Indicates whether the mouse is hovering over the element.
 * @returns {void} This function does not return any value.
 */
function hoverCancel(element, isHover) {
  const cancelImgBlack = element.querySelector(".cancel-img-black");
  const cancelImgBlue = element.querySelector(".cancel-img-blue");
  if (isHover) {
    cancelImgBlack.style.display = "none";
    cancelImgBlue.style.display = "inline";
  } else {
    cancelImgBlack.style.display = "inline";
    cancelImgBlue.style.display = "none";
  }
}

/**
 * Handles hover events on an element by toggling the visibility of logo elements.
 * @param {HTMLElement} element - The HTML element on which the hover event is triggered.
 * @param {boolean} isHover - Indicates whether the mouse is hovering over the element.
 * @returns {void} This function does not return any value.
 */
function handleHover(element, isHover) {
  const logoMini = element.querySelector(".custom-logo-mini");
  const logoMiniHover = element.querySelector(".custom-logo-mini-hover");
  if (isHover) {
    logoMini.classList.add("custom-hidden-logo");
    logoMiniHover.classList.remove("custom-hidden-logo");
  } else {
    logoMini.classList.remove("custom-hidden-logo");
    logoMiniHover.classList.add("custom-hidden-logo");
  }
}

/**
 * Creates a new contact based on user input, saves it to the server, and updates the UI.
 * @param {Event} event - The event object representing the form submission.
 * @returns {void} A promise that resolves when the contact creation and UI update are complete.
 */
async function createContact(event) {
  event.preventDefault();
  let userName = document.getElementById("1").value;
  let userEmail = document.getElementById("2").value;
  let userPhone = document.getElementById("3").value;
  if (!validateInput(userName, userEmail, userPhone)) {
    return;
  } else {
    let newContact = { name: userName, email: userEmail, phone: userPhone };
    idContactFromBackend = await saveContactsToServer(newContact);
    sortContacts();
    renderContacts();
    closeAddContact();
    clearInputFields();
    selectContactRender(newContact, userName);
  }
}

/**
 * Renders the selected contact after a slight delay, updating UI and showing success messages.
 *
 * @param {Object} newContact - The new contact object to be rendered.
 * @param {string} newContact.name - The name of the contact.
 * @param {string} userName - The full name of the user in the format "FirstName LastName".
 */
function selectContactRender(newContact, userName) {
  setTimeout(() => {
    let newIndex = contacts.findIndex((contact) => contact.name === newContact.name);
    selectContact(idContactFromBackend, newIndex, userName[0].toUpperCase(), userName.split(" ")[1].toUpperCase().charAt(0));
    showSuccessMessageBasedOnScreen();
  }, 100);
}

/**
 * Validates the input user name based on a name pattern.
 * @param {string} userName - The user name to be validated.
 * @returns {boolean} Returns true if the user name is valid, false otherwise.
 */
function validateInput(userName) {
  let namePattern = /^[A-Za-z]+\s[A-Za-z]+$/;
  if (!namePattern.test(userName)) {
    document.getElementById("textNameInput-contacts").innerHTML = "Please enter a valid name (first name and last name).";
    return false;
  }
  return true;
}

/**
 * Sorts the 'contacts' array based on the first names of the contacts.
 * @returns {void} This function does not return any value.
 */
function sortContacts() {
  contacts.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

/**
 * Clears input fields in the contact creation form.
 * @returns {void} This function does not return any value.
 */
function clearInputFields() {
  document.getElementById("1").value = "";
  document.getElementById("2").value = "";
  document.getElementById("3").value = "";
}

function isResponsiveMode() {
  return window.innerWidth < 850;
}

/**
 * Checks whether the current window width indicates responsive mode (width less than 850 pixels).
 * @returns {boolean} Returns true if the window width is less than 850 pixels, false otherwise.
 */
function showSuccessMessageBasedOnScreen() {
  if (isResponsiveMode()) {
    showSuccessMessageResponsive();
  } else {
    showSuccessMessage();
  }
}

/**
 * Displays a success message for a specified duration.
 * @returns {void} This function does not return any value.
 */
function showSuccessMessage() {
  let successDiv = document.getElementById("success");
  successDiv.classList.add("show");
  setTimeout(() => {
    hideSuccessMessage();
  }, 3000);
}

/**
 * Hides the success message.
 * @returns {void} This function does not return any value.
 */
function hideSuccessMessage() {
  let successDiv = document.getElementById("success");
  successDiv.classList.remove("show");
}

/**
 * Displays a responsive success message with animation.
 * @returns {void} This function does not return any value.
 */
function showSuccessMessageResponsive() {
  const successMessage = document.getElementById("success-2");
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.classList.add("slide-top");
  }, 0);
  setTimeout(() => {
    successMessage.classList.remove("slide-top");
    successMessage.style.display = "none";
  }, 1500);
}

/**
 * Prepares the UI to add a new contact by showing the contact form and hiding the contact card.
 * @returns {void} This function does not return any value.
 */
function addNewContact() {
  document.getElementById("textNameInput-contacts").innerHTML = "";
  document.getElementById("contactCard").classList.add("d-none");
  document.getElementById("addContact").classList.remove("d-none");
  document.getElementById("addContactBackground").classList.remove("d-none");
  document.getElementById("addContact").classList.add("slide-left");
  resetSelectedContact();
}

/**
 * Prepares the UI to edit a contact by showing the edit contact form and hiding the contact card.
 * @param {number} i - The index of the contact to be edited in the 'contacts' array.
 * @returns {void} This function does not return any value.
 */
function editContact(i, idContact) {
  document.getElementById("contactCard").classList.add("d-none");
  document.getElementById("editContact").classList.remove("d-none");
  document.getElementById("editContactBackground").classList.remove("d-none");
  document.getElementById("editContact").classList.add("slide-left");
  document.getElementById("formDiv").innerHTML = generateFormDivHTML(i, idContact);
  document.getElementById("userNameEdit").value = `${contacts[i].name}`;
  document.getElementById("userEmailEdit").value = `${contacts[i].email}`;
  document.getElementById("userPhoneEdit").value = `${contacts[i].phone}`;
}
