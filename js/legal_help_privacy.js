/**
 *Executed when the Help Content is loaded by onload
 *
 */
async function legalHelpPrivacyinit() {
  await includeHTML();
  loadUserData();
  setInitialsInTheHeader();
}

/**
 *  Includes content from Help, depending on whether the user is logged in or not.

 *
 *  @param {boolean} legalInformationLogin -
 * `true` User is not logged in and is on the log in page,
 * `false` User is logged in and is not on the log in page.
 * 
 * *  @param {boolean} legalInformationSignup -
 * `true` User is not logged in and is on the sign up page,
 * `false` User is logged in and is not on the sign up page.
 *
 * */
function closelegalHelpPrivacyContent() {
  if (legalInformationLogin === true || legalInformationSignup === true) {
    closelegalInformationLoginPage();
  } else {
    window.location.href = "./summary.html";
    document.getElementById("helpIcon").classList.remove("d-none");
  }
}

/**
 *  Includes content from Privacy Policy and Legal Notice, depending on whether the user is logged in or not.

 *
 *  @param {boolean} legalInformationLogin -
 * `true` User is not logged in and is on the log in page,
 * `false` User is logged in and is not on the log in page.
 * 
 * *  @param {boolean} legalInformationSignup -
 * `true` User is not logged in and is on the sign up page,
 * `false` User is logged in and is not on the sign up page.
 *
 * */
function closelegalInformationLoginPage() {
  if (legalInformationLogin === true) {
    renderLogInContent();
    legalInformationLogin = false;
  } else {
    renderSignUpContent();
    legalInformationSignup = false;
  }
  document.getElementById("signUpButtonHeadline").classList.remove("d-none");
  document.getElementById("loginpageDataProtectionContainer").classList.remove("d-none");
  document.getElementById("animationJoinLogoContainer").classList.remove("d-none");
  document.getElementById("joinLogoContainer").classList.remove("d-none");
}
