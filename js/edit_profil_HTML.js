/**
 * @returns {string} - Returns the HTML Code for Profil Content
 *
 * */
function generateProfilContent() {
  return /*html*/ `
      <div id="conten">
            <div class="close-arrow-container">
              <img onclick="closelegalHelpPrivacyContent()" class="arrow-back" src="./assets/img/arrow-left-line.svg" alt="arrowback" />
            </div>
            <div class="content-container">
            <div class="content-container-profil">
              <h1 class="headline-edit-profil">Profil</h1>
              <div class="user-data-content-container">
              <h2 class="user-data-content-headline">User name</h2>
              <p class="user-data-content-description">${userData.username}</p>
              <h2 class="user-data-content-headline">E-Mail</h2>
              <p class="user-data-content-description">${userData.email}</p>
              <h2 class="user-data-content-headline">Password</h2>
              <p class="user-data-content-description">************************</p>
              </div>
              <div>
              </div>
          </div>
          <div class="edit-profil-button-container">
          <div onclick="renderProfilEditContent()" class="edit-profil" onmouseover="changeEditImage(true)" onmouseout="changeEditImage(false)" style="display: flex; align-items: center; gap: 4px; cursor:pointer;">
                      <img id="edit-task-image" class="imgEdit_task" src="./assets/img/edit_task.png" alt="">
                      <p id="signUpButton" class="edit-profil-title">Edit</p>
                    </div>
              </div>
              </div>
      `;
}

/**
 * @returns {string} - Returns the HTML Code for Profil Content
 *
 * */
function generateProfilEditContent() {
  return /*html*/ `
        <div id="conten">
        <form onsubmit="register(); return false">
              <div class="close-arrow-container">
                <img onclick="renderProfilContent()" class="arrow-back" src="./assets/img/arrow-left-line.svg" alt="arrowback" />
              </div>
              <div class="content-container">
              <div class="content-container-profil">
                <h1 class="headline-edit-profil">Profil</h1>
                <div class="user-data-content-container">
                <h2 class="user-data-content-headline">User name</h2>
                <div class="input-field-container-profil">
                    <input placeholder="Name" type="text" id="nameInput" name="name" required class="input-field-profile" required />
                    <img src="./assets/img/person_add_contact.png" alt="mail" />
                </div>
                <h2 class="user-data-content-headline">E-Mail</h2>
                <div class="input-field-container-profil">
                    <input placeholder="Email" type="email" id="emailInput" name="email" required class="input-field-profile" required />
                    <img src="./assets/img/mail_add_contact.png" alt="mail" />
                </div> 
                <h2 class="user-data-content-headline">Password</h2>
                <div class="input-field-container-profil">
                    <input oninput="passwordInputVisible(), validatePassword();" class="input-field-profile" placeholder="Password" type="password" id="passwordInput" name="password" required />
                    <img onclick="passwordVisible()" id="passwordImg" src="./assets/img/lock.svg" alt="lock" />
                </div>
                <h2 class="user-data-content-headline">Confirm Password</h2>
                <div id="inputFieldConfirmPassword" class="input-field-container-profil">
                    <input oninput="confirmPasswordInputVisible(), validatePassword();" class="input-field-profile" placeholder="Confirm Password" type="password" id="confirmPasswordInput" name="confirmpassword" required />
                    <img onclick="confirmPasswordVisible()" id="confirmPasswordImg" src="./assets/img/lock.svg" alt="lock" />
                    </div>
                </div>
                <p class="profil-password-does-not-match" id="textThePasswordNotMatchSignUp"></p>
                </div>
        </form>
        <div>    
            </div>
            <div class="edit-profil-button-edit-container">
            <div class="save-button">
                    <p class="leads-to-profil" id="leadsToBoard">
                        <div class="save-button-profil" onclick="saveNewProfilData()">
                            <div id="signUpButton" class="text_create-profil ">Ok <img src="./assets/img/check.png" alt=""></div>            
                        </div>
</p>
                </div>
            </div>
        </div>
        `;
}
