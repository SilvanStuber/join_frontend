let users = [];
let rememberMeIsSet;
let emailRememberMe = [];
let passwordRememberMe = [];
let userName = [];
let initials = [];
const STORAGE_TOKEN = "X7DBXKDEU8ISCZXV2D2NCZOTW84Y090L3DMCTF7N";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * *
 * Validation of the login data and corresponding forwarding to Summary. If login data and user data do not match, this is displayed to the user.
 *
 * @param {string} email - E-mail from the input field
 * @param {string} password - Password from the input field
 * @param {string} user - Registered users who have been downloaded from the server
 * @param {boolean} loggedIn -
 * `true` User is logged in,
 * `false` User is not logged in.
 *
 */
function login() {
  loggedIn = false;
  saveStatusOfLogin();
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
  let user = users.find((u) => u.email == email && u.password == password);
  if (user) {
    let name = user["name"];
    setInitialsOfTheUser(name);
    window.location.href = "./summary.html";
    rememberMe();
  } else {
    document.getElementById("inputFieldPassword").style = `border: 1px solid rgb(255,128,143) !important;`;
    document.getElementById("textThePasswordNotMatchLogin").innerHTML = `Ups! your password doesn't match`;
  }
}

/**
 * Here the user is forwarded as a guest and no validation is necessary
 *
 * @param {string} name - Username Guest
 * @param {boolean} loggedIn -
 * `true` User is logged in,
 * `false` User is not logged in.
 *
 */
function guestLogin() {
  loggedIn = false;
  saveStatusOfLogin();
  let name = "Guest";
  setInitialsOfTheUser(name);
  window.location.href = "./summary.html";
}

/**
 * Generates the initials of the user
 *
 * @param {string} userName - User name
 * @param {string} initials - Initials
 * @param {string} splitNames - First and last name split
 * @param {string} name - Username Guest
 */
function setInitialsOfTheUser(name) {
  userName = [];
  initials = [];
  userName = name;
  splitNames = name.split(" ");
  if (!splitNames[1]) {
    initials = userName[0].charAt(0).toUpperCase();
  } else {
    initials = splitNames[0].charAt(0).toUpperCase() + splitNames[1].charAt(0).toUpperCase();
  }
  saveUserData();
}

/**
 * Validation of whether login data is saved or not.
 *
 *  @param {boolean} rememberMeIsSet -
 * `true` Save user data ,
 * `false` Do not save user data .
 *
 * */
function setRememberMe() {
  if (!rememberMeIsSet) {
    rememberMeIsSet = true;
  } else {
    rememberMeIsSet = false;
  }
}

/**
 * If the user wants to save the data, it is saved here in an array and then in the local storage..
 *
 *  @param {string} email - E-mail from the input field
 *  @param {string} password - Password from the input field
 *  @param {boolean} rememberMeIsSet -
 * `true` Save user data ,
 * `false` Do not save user data .
 *  @param {Array} emailRememberMe - Saved e-mail
 *  @param {Array} passwordRememberMe - Saved password
 * */
function rememberMe() {
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
  emailRememberMe = [];
  passwordRememberMe = [];
  if (rememberMeIsSet) {
    emailRememberMe.push(email);
    passwordRememberMe.push(password);
  }
  saveUserLoginData();
}

/**
 * Saving the data on the server
 *
 * @param {string} key - the key to the request
 * @param {string} value - the value of the request
 * @param {string} res - Feedback from the server
 * */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

/**
 * Download data from the server
 *
 * @param {string} key - the key to the request
 * @param {string} res - Feedback from the server
 *
 * */
async function getItem(key) {
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
 * load the user data and report an error if it is not found on the remote storage
 *
 * @param {string} key - the key to the request
 * @param {string} res - Feedback from the server
 *
 * */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Registration and saving of user data
 *
 * @param {string} name - Name from the input field
 * @param {string} email - E-mail from the input field
 * @param {string} password - Password from the input field
 *
 * */
async function register() {
  signUpButton.disabled = true;
  users.push({
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  });
  await setItem("users", JSON.stringify(users));
  resetForm();
  renderRegisteSuccessfully();
}

/**
 * Render pop up that registration was successful
 *
 * */
function renderRegisteSuccessfully() {
  document.getElementById("registerSuccessfullyContent").innerHTML = generateRegisteSuccessfully();
  renderLogInContent();
  setTimeout(resetRegisteSuccessfully, 2000);
}

/**
 * Empty pop up registration successful
 *
 * */
function resetRegisteSuccessfully() {
  document.getElementById("registerSuccessfullyContent").innerHTML = "";
}

/**
 * Reset all input fields and activate the registration button
 *
 *
 * */
function resetForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  confirmPasswordInput.value = "";
  signUpButton.disabled = false;
}

/**
 *  Saves e-mail and password in local storage.
 *
 *  @param {Array} emailRememberMe - Saved e-mail
 *  @param {Array} passwordRememberMe - Saved password
 * */
function saveUserLoginData() {
  let emailRememberMeAtText = JSON.stringify(emailRememberMe);
  let passwordRememberMeAtText = JSON.stringify(passwordRememberMe);
  localStorage.setItem("email", emailRememberMeAtText);
  localStorage.setItem("password", passwordRememberMeAtText);
}

/**
 * Load e-mail and password in local storage.
 *
 *  @param {Array} emailRememberMe - Saved e-mail
 *  @param {Array} passwordRememberMe - Saved password
 * */
function loadUserLoginData() {
  let emailRememberMeAtText = localStorage.getItem("email");
  let passwordRememberMeAtText = localStorage.getItem("password");
  if (emailRememberMeAtText && passwordRememberMeAtText) {
    emailRememberMe = JSON.parse(emailRememberMeAtText);
    passwordRememberMe = JSON.parse(passwordRememberMeAtText);
  }
}

/**
 *  Saves e-mail and password in local storage.
 *
 *  @param {Array} userName - User name
 *  @param {Array} initials - initials
 * */
function saveUserData() {
  let userNameAtText = JSON.stringify(userName);
  let initialsAtText = JSON.stringify(initials);
  localStorage.setItem("userName", userNameAtText);
  localStorage.setItem("initials", initialsAtText);
}

/**
 *  Load e-mail and password in local storage.
 *
 *  @param {Array} userName - User name
 *  @param {Array} initials - initials
 * */
function loadUserData() {
  let userNameAtText = localStorage.getItem("userName");
  let initialsAtText = localStorage.getItem("initials");
  if (userNameAtText && initialsAtText) {
    userName = JSON.parse(userNameAtText);
    initials = JSON.parse(initialsAtText);
  }
}

/**
 * @returns {string} - Returns the HTML Code for Registration Successfully
 *
 * */
function generateRegisteSuccessfully() {
  return /*html*/ `
      <div class="container-register-successfully">
        <p class="msg-register-successfully">You Signed Up successfully</p>
      </div>
  `;
}
