/**
 *  Opens or closes the submenu depending on whether the menu is open or not.
 *
 *  @param {boolean} submenuIsOpen-
 * `true` Submenu Is Open,
 * `false` Submenu is closed.
 *
 *
 * */
function showSubmenu() {
  if (!submenuIsOpen) {
    document.getElementById("submenu").style = "display: block";
    document.getElementById("submenu").classList.add("show-submenu");
    submenuIsOpen = true;
  } else {
    closeSubmenu();
  }
}

/**
 *  Closes the submenu.
 *
 *  @param {boolean} submenuIsOpen-
 * `true` Submenu Is Open,
 * `false` Submenu is closed.
 *
 *
 * */
function closeSubmenu() {
  if (submenuIsOpen === true) {
    document.getElementById("submenu").classList.remove("show-submenu");
    document.getElementById("submenu").style = "display: none";
    submenuIsOpen = false;
  }
}

/**
 * Renders initials of user in the header
 *
 *  @param {string} initials - initials of user
 *
 *
 * */
function setInitialsInTheHeader() {
  loadUserData();
  document.getElementById("initialsUserHeader").innerHTML = initials;
}

/**
 * Renders Help Content
 *
 * */
function loadHelp() {
  document.getElementById("contentJoin").innerHTML = generateHelpContent();
  document.getElementById("helpIcon").classList.add("d-none");
}
