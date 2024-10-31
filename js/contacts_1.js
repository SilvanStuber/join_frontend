/**
 * Render Contacts Page
 *
 */
function render_contactsHtml() {
  window.location.href = "./contacts.html";
}

/**
 * Deletes a contact, updates the 'contacts' array, and renders the updated contacts.
 * @param {Event} event - The event object representing the user action.
 * @param {number} i - The index of the contact to be deleted in the 'contacts' array.
 * @returns {void} A promise that resolves when the contact deletion and UI update are complete.
 */
async function deleteContact(event, i) {
  contacts.splice(i, 1);
  await setItemContacts("contacts", JSON.stringify(contacts));
  renderContacts();
  document.getElementById("contactCard").classList.add("d-none");
  selectedContactIndex = null;
  document.getElementById("editContact").classList.add("d-none");
  document.getElementById("editContactBackground").classList.add("d-none");
  event.preventDefault();
}

/**
 * Saves the edited contact, updates UI elements, and triggers rendering of updated contacts.
 * @param {Event} event - The event object representing the form submission.
 * @param {number} i - The index of the contact to be edited in the 'contacts' array.
 * @returns {void} A promise that resolves when the contact is saved and UI is updated.
 */
async function saveContact(event, i) {
  let newName = document.getElementById("userNameEdit").value;
  let editedContact = [document.getElementById("userNameEdit").value, document.getElementById("userEmailEdit").value, document.getElementById("userPhoneEdit").value];
  contacts.splice(i, 1);
  let name = newName;
  let firstname = name[0].toUpperCase();
  let names = newName.split(" ");
  let surname = names[1].toUpperCase().charAt(0);
  let circle = document.getElementById("circleCard");
  circle.innerHTML = `<p class="nameId">${firstname}${surname}</p>`;
  let editCircle = document.getElementById("editCircle");
  editCircle.innerHTML = `<p class="nameIdEdit">${firstname}${surname}</p>`;
  event.preventDefault();
  await saveContactsToServer(editedContact);
  await renderContacts();
  let index = validateValueOfContacts(newName);
  closeEditContact();
  selectContact(index, firstname, surname, event);
}

/**
 * Validates the value of a contact in the 'contacts' array based on the name.
 * @param {string} newName - The new name of the contact to be validated.
 * @returns {number} The index of the validated contact in the 'contacts' array.
 */
function validateValueOfContacts(newName) {
  for (let i = 0; i < contacts.length; i++) {
    let nameContacts = contacts[i][0];
    if (nameContacts === newName) {
      return i;
    }
  }
}

/**
 * Closes the edit contact form and displays the contact card.
 * @returns {void} This function does not return any value.
 */
function closeEditContact() {
  document.getElementById("editContact").classList.add("d-none");
  document.getElementById("contactCard").classList.remove("d-none");
  document.getElementById("editContactBackground").classList.add("d-none");
}

/**
 * Closes the add contact form and displays the contact card.
 * @returns {void} This function does not return any value.
 */
function closeAddContact() {
  document.getElementById("addContact").classList.add("d-none");
  document.getElementById("contactCard").classList.remove("d-none");
  document.getElementById("addContactBackground").classList.add("d-none");
}

/**
 * Opens a mini-popup displaying additional options for a contact.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @returns {void} This function does not return any value.
 */
function openMiniPopup(i) {
  document.getElementById("mini-popup").style = "display: block";
  document.getElementById("mini-popup-display").innerHTML = generateMiniPopUpHTML(i);
}

/**
 * Generates HTML for displaying a contact in the contacts list.
 * @param {Array} contact - The contact information array.
 * @param {number} index - The index of the contact in the 'contacts' array.
 * @param {string} firstname - The first name of the contact.
 * @param {string} surname - The surname of the contact.
 * @returns {string} The HTML markup for displaying the contact.
 */
function displayContacts(contact, index, firstname, surname) {
  return /*html*/ `      
            <div class="contact-info" id="contact-info-${index}" onclick="selectContact(${index},'${firstname}','${surname}')">
              <div class="contact-info-left">
                  <div class="circle" id="circle-${index}" style="background-color: ${colors[index]}">
                      <p class="nameIdList" id="name-id">${firstname}${surname}</p>
                  </div>
              </div>
              <div class="contact-info-right">
                  <div class="contact-info-name" id="contact-info-name-${index}">
                      ${contact[0]}
                  </div>
                  <div class="contact-info-mail" id="contact-info-mail-${index}">
                      ${contact[1]}
                  </div>
              </div>
            </div>`;
}

/**
 * Generates HTML markup for buttons (Edit and Delete) associated with a contact.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @returns {string} The HTML markup for the buttons.
 */
function generateButtonHTML(i) {
  return /*html*/ `
      <div class="editCard" id="editCard" onclick="editContact(${i})"
          onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
          <img class="logo-mini" src="./assets/img/edit_contacts.png">
          <img class="logo-mini-hover" src="./assets/img/edit2.png">
          <span class="textEdit">Edit</span>
      </div>
      <div class="deleteCard" id="deleteCard" onclick="deleteContact(event, ${i})"
          onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
          <img class="logo-mini" src="./assets/img/delete_contacts.png">
          <img class="logo-mini-hover" src="./assets/img/delete.png">
          <span class="textEdit">Delete</span>
      </div>`;
}

/**
 * Generates HTML markup for the edit contact form based on the contact index.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @returns {string} The HTML markup for the edit contact form.
 */
function generateFormDivHTML(i) {
  return /*html*/ `<form id="editContactForm" name="myFormEdit" onsubmit="saveContact(event, ${i})">
      <div class="close-img-div"><img class="close-img" src="./assets/img/cancel.png" onclick="closeEditContact()"></div>
      <div class="input" id="editInput">
          <div class="inputFieldName">
              <input class="inputField" type="text" id="userNameEdit" required> 
              <img class="logo-edit-input" src="./assets/img/person_add_contact.png">
          </div>
          <div class="inputFieldName">
              <input class="inputField" type="email" id="userEmailEdit" required> 
              <img class="logo-edit-input" src="./assets/img/mail_add_contact.png">
          </div>
          <div class="inputFieldName">
              <input class="inputField" type="number" id="userPhoneEdit" required> 
              <img class="logo-edit-input" src="./assets/img/call_add_contact.png">
          </div>
          <div class="editButtons">
              <button class="deleteButton" onclick="deleteContact(event, ${i})">Delete</button>
              <button class="saveButton" onsubmit="saveContact(event, ${i})">
                  <div class="save-button-div">
                  <div class="save-text">Save</div>
                  <div><img class="save-check-img" src="./assets/img/check.png"></div>
              </button>
          </div>
      </div>
      </form>
      `;
}

/**
 * Generates HTML markup for mini-popup buttons (Edit and Delete) associated with a contact.
 * @param {number} i - The index of the contact in the 'contacts' array.
 * @returns {string} The HTML markup for the mini-popup buttons.
 */
function generateMiniPopUpHTML(i) {
  return /*html*/ ` 
        <div class="editCard-mini" id="editCard-mini" onclick="editContact(${i})"
            onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
            <img class="logo-mini logo-mini-2" src="./assets/img/edit_contacts.png">
            <img class="logo-mini-hover logo-mini-hover-2" src="./assets/img/edit2.png">
            <span class="textEdit textEdit-2">Edit</span>
        </div>
        <div class="deleteCard-mini" id="deleteCard-mini" onclick="deleteContact(event, ${i})"
            onmouseover="hoverEdit(this, true)" onmouseout="hoverEdit(this, false)">
            <img class="logo-mini" src="./assets/img/delete_contacts.png">
            <img class="logo-mini-hover logo-mini-hover-2" src="./assets/img/delete.png">
            <span class="textEdit textEdit-2">Delete</span>
        </div>`;
}
