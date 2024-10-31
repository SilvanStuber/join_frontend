/**
 * @returns {string} - Returns the HTML Code for Help Content
 *
 * */
function generateHelpContent() {
  return /*html*/ `
        <div id="conten">
            <div class="close-arrow-container">
              <img onclick="closelegalHelpPrivacyContent()" class="arrow-back" src="./assets/img/arrow-left-line.svg" alt="arrowback" />
            </div>
            <div class="content-container">
              <h1 class="headline-legal-help-privacy">Help</h1>
              <span class="text"
                >Welcome to the help page for <span class="blue-words">Join</span>, your guide to using our kanban project management tool. Here, we'll provide an overview of what
                <span class="blue-words">Join</span> is, how it can benefit you, and how to use it.</span
              >
              <h2 class="second-headline-legal-help-privacy">What is Join?</h2>
              <span class="text">
                <span class="blue-words">Join</span> is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the
                Developer Akademie.
              </span>
              <span class="text">
                Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow).
                <span class="blue-words">Join</span> leverages the principles of kanban to help users manage their tasks and projects in an intuitive, visual interface.
              </span>
              <span class="text">
                It is important to note that <span class="blue-words">Join</span> is designed as an educational exercise and is not intended for extensive business usage. While we strive to ensure the
                best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, or other aspects of quality regarding <span class="blue-words">Join</span>.
              </span>
              <h2 class="second-headline-legal-help-privacy">How to use it</h2>
              <div class="listing-container">
                <span class="text"> Here is a step-by-step guide on how to use <span class="blue-words">Join</span>: </span>
                <div class="use-listing-container">
                  <span class="point-listing-container">1.</span>
                  <div class="text-listing-container">
                    <h3>Exploring the Board</h3>
                    <span
                      >When you log in to <span class="blue-words">Join</span>, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress",
                      “Await feedback” and "Done".</span
                    >
                  </div>
                </div>
              </div>
              <div class="listing-container">
                <div class="use-listing-container">
                  <span class="point-listing-container">2.</span>
                  <div class="text-listing-container">
                    <h3>Creating Contacts</h3>
                    <span>
                      In <span class="blue-words">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required
                      information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.
                    </span>
                  </div>
                </div>
              </div>
              <div class="listing-container">
                <div class="use-listing-container">
                  <span class="point-listing-container">3.</span>
                  <div class="text-listing-container">
                    <h3>Adding Cards</h3>
                    <span>
                      Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the
                      task details in the card, like task name, description, due date, assignees, etc.
                    </span>
                  </div>
                </div>
              </div>
              <div class="listing-container">
                <div class="use-listing-container">
                  <span class="point-listing-container">4.</span>
                  <div class="text-listing-container">
                    <h3>Moving Cards</h3>
                    <span> As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another. </span>
                  </div>
                </div>
              </div>
              <div class="listing-container">
                <div class="use-listing-container">
                  <span class="point-listing-container">5.</span>
                  <div class="text-listing-container">
                    <h3>Deleting Cards</h3>
                    <span>
                      <span class="text">
                        Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting
                        cards, as this action is irreversible.
                      </span>
                      <span class="text">
                        Remember that using <span class="blue-words">Join</span> effectively requires consistent updates from you and your team to ensure the board reflects the current state of your
                        project.
                      </span>
                      <span class="text"> Have more questions about <span class="blue-words">Join</span>? Feel free to contact us at [Your Contact Email]. We're here to help you! </span>
                    </span>
                  </div>
                </div>
              </div>
              <h2 class="second-headline-legal-help-privacy">Enjoy using Join!</h2>
            </div>
          </div>
    `;
}
