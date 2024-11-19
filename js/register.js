let userRegisterData = {
  username: "",
  email: "",
  password: "",
  repeated_password: "",
};
let userLoginData = {
  email: "",
  password: "",
};
let guestLoginData = {
  email: "guest@guest.com",
  password: "PasswordGuest1!",
};
let rememberMeIsSet;
let emailRememberMe = [];
let passwordRememberMe = [];
let userName = [];
let initials = [];
let userData = {
  token: "",
  id: "",
  username: "",
  email: "",
};
let userEditRegisterData = {
  username: "",
  email: "",
  password: "",
  repeated_password: "",
};

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
async function login() {
  loggedIn = false;
  saveStatusOfLogin();
  userLoginData.email = document.getElementById("emailInput").value;
  userLoginData.password = document.getElementById("passwordInput").value;
  responseDataLogin = await loginUserOnTheServer(userLoginData);
  if (responseDataLogin.email) {
    localStorage.setItem("userData", JSON.stringify(responseDataLogin));
    let name = responseDataLogin.username;
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
async function guestLogin() {
  loggedIn = false;
  saveStatusOfLogin();
  responseDataLogin = await loginUserOnTheServer(guestLoginData);
  if (responseDataLogin.email) {
    localStorage.setItem("userData", JSON.stringify(responseDataLogin));
    let name = responseDataLogin.username.replace(/_/g, " ");
    setInitialsOfTheUser(name);
    window.location.href = "./summary.html";
  }
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
 * Registration and saving of user data
 *
 * @param {string} name - Name from the input field
 * @param {string} email - E-mail from the input field
 * @param {string} password - Password from the input field
 *
 * */
async function register() {
  signUpButton.disabled = true;
  userRegisterData.username = nameInput.value.replace(/ /g, "_");
  userRegisterData.email = emailInput.value;
  userRegisterData.password = passwordInput.value;
  userRegisterData.repeated_password = confirmPasswordInput.value;
  userData.token = await saveNewUserOnTheServer(userRegisterData);
  await saveContactsToServer((firstContactData = { name: userRegisterData.username, email: userRegisterData.email, phone: "Add the telephone number" }));
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
 * Load e-mail and password in local storage.
 *
 *  @param {Array} emailRememberMe - Saved e-mail
 *  @param {Array} passwordRememberMe - Saved password
 * */
function loadUserLoginData() {
  let userDataAtText = localStorage.getItem("userData");
  if (userDataAtText) {
    userData = JSON.parse(userDataAtText);
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

/**
 * Saves new profile data by collecting input values and sending them to the server.
 * Updates the global `userData` and re-renders the profile content.
 *
 * @returns {Promise<void>}
 */
async function saveNewProfilData() {
  userEditRegisterData.username = document.getElementById("nameInput").value.replace(/ /g, "_");
  userEditRegisterData.email = document.getElementById("emailInput").value;
  userEditRegisterData.password = document.getElementById("passwordInput").value;
  userEditRegisterData.repeated_password = document.getElementById("confirmPasswordInput").value;
  userEditRegisterData = await saveEditUserOnTheServer(userEditRegisterData, userData.id);
  userData.username = userEditRegisterData.username.replace(/_/g, " ");
  userData.email = userEditRegisterData.email;
  setInitialsOfTheUser(userData.username);
  setInitialsInTheHeader();
  renderProfilContent();
}
