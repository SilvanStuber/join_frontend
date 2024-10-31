let contacts = [
  ["Marcel Bauer", "bauer@gmail.com", "00418625946382"],
  ["Anton Mayer", "antom@gmail.com", "00411111111111"],
  ["Anja Schulz", "schulz@hotmail.com", "00412222222222"],
  ["Benedikt Ziegler", "benedikt@gmail.com", "00493333333333"],
  ["David Eisenberg", "davidberg@gmail.com", "00491283297489"],
  ["Eva Fischer", "eva@gmail.com", "00492825594867"],
  ["Emmanuel Mauer", "emmanuelma@gmail.com", "00495890487384"],
  ["Tatjana Wolf", "wolf@gmail.com", "00497362836981"],
];

const colors = ["#9227FE", "#3BDBC7", "#FD81FF", "#FFBB2A", "#6E52FF", "#169857", "#6B5E5F", "#FF7915", "#9227FE", "#3BDBC7", "#FD81FF", "#FFBB2A", "#6E52FF", "#169857", "#6B5E5F", "#FF7915"];
let selectedContactIndex = null;

/**
 * Initializes the contacts module.
 */
async function contactsInit() {
  await includeHTML();
  load();
  loadUserData();
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
    return a[0].localeCompare(b[0]);
  });
  showContacts();
}

/**
 * Gets an item from the contacts storage.
 * @param {string} key - The key to retrieve from the storage.
 * @returns {void} A promise that resolves with the value associated with the given key.
 * @throws {string} Throws an error if the data with the specified key is not found.
 */
async function setItemContacts(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

async function getItemContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

/**
 * Loads contacts data from the server and updates the local 'contacts' array.
 * @throws {string} Throws an error if loading contacts data fails.
 * @returns {void} A promise that resolves when the data is loaded and processed.
 */
async function loadContactsFromServer() {
  try {
    contacts = JSON.parse(await getItemContacts("contacts"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Saves a new contact to the server by updating the 'contacts' array and storing it.
 * @param {any} newContact - The new contact to be added to the 'contacts' array.
 * @returns {void} A promise that resolves when the data is saved.
 */
async function saveContactsToServer(newContact) {
  contacts.push(newContact);
  await setItemContacts("contacts", JSON.stringify(contacts));
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
    let name = contacts[i][0];
    let firstname = name[0].toUpperCase();
    let names = name.split(" ");
    let surname = names[1].toUpperCase().charAt(0);
    if (firstname !== currentLetter) {
      contactsdiv.innerHTML += `<div class="group-header">${firstname}</div><hr>`;
      currentLetter = firstname;
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
function selectContact(i, firstname, surname, event) {
  document.getElementById("editContact").classList.add("d-none");
  document.getElementById("editContactBackground").classList.add("d-none");
  resetSelectedContact();
  document.getElementById(`contact-info-${i}`).style = "background-color: #293647; color: white";
  selectedContactIndex = i;
  showCard(i, firstname, surname);
  document.getElementById("contact-details").classList.remove("hide-mobile-397px");
  document.getElementById("contact-list").classList.add("hide-mobile-397px");
  document.getElementById("button-add-contact-mobile").style = "display: none";
  document.getElementById("button-edit-contact-mobile").style = "display: block";
  fillOnclickDiv(i);
}

/**
 * Fills the onclickDiv with content for the selected contact.
 * @param {number} i - The index of the selected contact in the 'contacts' array.
 * @returns {void} This function does not return any value.
 */
function fillOnclickDiv(i) {
  document.getElementById("onclickDiv").innerHTML = `
    <img class="image-edit-contact-mobile" src="./assets/img/more_vert.png" onclick="openMiniPopup(${i})">`;
}

/**
 * Displays contact information in the UI, updating the name, email, phone, and associated styles.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @param {string} firstname - The first name of the contact.
 * @param {string} surname - The surname of the contact.
 * @returns {void} This function does not return any value.
 */
function displayContactInfo(i, firstname, surname) {
  let name = (document.getElementById("nameCard").innerHTML = `${contacts[i][0]}`);
  let email = (document.getElementById("emailCard").innerHTML = `<div class="head-info"> Email </div><div class="main-info-mail">${contacts[i][1]}</div>`);
  let phone = (document.getElementById("phoneCard").innerHTML = `<div class="head-info"> Phone </div><div class="main-info"> ${contacts[i][2]}</div>`);
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
function updateContactView(i) {
  document.getElementById("addContact").classList.add("d-none");
  document.getElementById("addContactBackground").classList.add("d-none");
  document.getElementById("contactCard").classList.remove("d-none");
  document.getElementById("contactCard").classList.add("slide-left");
  document.getElementById("buttonsCard").innerHTML = generateButtonHTML(i);
}

/**
 * Shows the contact card by displaying contact information and updating the view.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @param {string} firstname - The first name of the contact.
 * @param {string} surname - The surname of the contact.
 * @returns {void} This function does not return any value.
 */
function showCard(i, firstname, surname) {
  displayContactInfo(i, firstname, surname);
  updateContactView(i);
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
    let newContact = [userName, userEmail, userPhone];
    await saveContactsToServer(newContact);
    sortContacts();
    renderContacts();
    closeAddContact();
    clearInputFields();
    let newIndex = contacts.findIndex((contact) => contact === newContact);
    selectContact(newIndex, userName[0].toUpperCase(), userName.split(" ")[1].toUpperCase().charAt(0));
    showSuccessMessageBasedOnScreen();
  }
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
    return a[0].localeCompare(b[0]);
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
function editContact(i) {
  document.getElementById("contactCard").classList.add("d-none");
  document.getElementById("editContact").classList.remove("d-none");
  document.getElementById("editContactBackground").classList.remove("d-none");
  document.getElementById("editContact").classList.add("slide-left");
  document.getElementById("formDiv").innerHTML = generateFormDivHTML(i);
  document.getElementById("userNameEdit").value = `${contacts[i][0]}`;
  document.getElementById("userEmailEdit").value = `${contacts[i][1]}`;
  document.getElementById("userPhoneEdit").value = `${contacts[i][2]}`;
}
