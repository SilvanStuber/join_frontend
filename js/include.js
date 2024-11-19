/**
 * Asynchronously fetches and embeds HTML content into elements with the "w3-include-html" attribute.
 * This function queries all elements with the "w3-include-html" attribute. For each element, it performs
 * an HTTP request to the specified file URL (defined in the attribute's value). If the request is successful,
 * the content of the file is embedded as the inner HTML of the element. If the request fails, it sets the element's
 * inner HTML to "Page not found".
 *
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Render Privacy Policy Content
 *
 */
function renderPrivacyPolicyContent() {
  document.getElementById("contentJoin").innerHTML = generatePrivacyPolicyContent();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryPrivacyPolicy").classList.add("sidebarCategoryLinkActive");
  document.getElementById("sidebarTextPrivacyPolicy").classList.remove("dataProtectionTextColor");
}

/**
 * Render Legal Notice Content
 *
 */
function renderLegalNoticeContent() {
  document.getElementById("contentJoin").innerHTML = generateLegalNoticeContent();
  removeStyleSidebar();
  addTextColor();
  document.getElementById("sidebarCategoryLegalNotice").classList.add("sidebarCategoryLinkActive");
  document.getElementById("sidebarTextLegalNotice").classList.remove("dataProtectionTextColor");
}

/**
 * Render Profil Content
 *
 */
function renderProfilContent() {
  document.getElementById("contentJoin").innerHTML = generateProfilContent();
  document.getElementById("sidebarTextLegalNotice").classList.remove("dataProtectionTextColor");
}

/**
 * Render Profil Content
 *
 */
function renderProfilEditContent() {
  document.getElementById("contentJoin").innerHTML = generateProfilEditContent();
  document.getElementById("sidebarTextLegalNotice").classList.remove("dataProtectionTextColor");
  document.getElementById("nameInput").value = userData.username;
  document.getElementById("emailInput").value = userData.email;
}

/**
 * Remove Style from the sidebar
 *
 */
function removeStyleSidebar() {
  document.getElementById("sidebarCategorySummary").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryAddTask").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryBorard").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryContacts").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryPrivacyPolicy").classList.remove("sidebarCategoryLinkActive");
  document.getElementById("sidebarCategoryLegalNotice").classList.remove("sidebarCategoryLinkActive");
}

/**
 * Change text color from Tex tPrivacy Policy and Text Legal Notice
 *
 */
function addTextColor() {
  document.getElementById("sidebarTextPrivacyPolicy").classList.add("dataProtectionTextColor");
  document.getElementById("sidebarTextLegalNotice").classList.add("dataProtectionTextColor");
}
