/**
 * @returns {string} - Returns the HTML Code for Add Edite Task Content
 *
 * */
function generateAddEditeTask(taskId) {
  return /*html*/ `  
     <div class = "BoardcontentTask">  
     <div class="closeLargeEditCardButton">
           <button onclick="closeCard()" class="close-button-edite"><img class="close-img" src="./assets/img/cancel.png"></button>
        </div>
            <div class="boardTaskContainer">
                <div class="task_succes d-none" id="task_succes">
                    <div class="task_succes_container">
                        <span  class="task_succes_message">Task added to board</span>
                        <img class="task_success_icon_board" src="./assets/img/Icons_board_white.png">
                    </div>
                </div>
                <div class ="inputLeft_addTaskBoard">
                    <div class="title_v1Edit">               
                        <div class="title">Title
                            <div class="frame203Board edittitle" onclick="required(this)">
                                <div class="title_frame14Board">
                                    <input  type="text"  class="text_enterTitle" placeholder="Enter a Title" id="editTitle" required oninput="handleInput(this)">
                                </div> 
                                <div class="titleFieldRequired" id="titleFieldRequired"></div> 
                            </div>                  
                        </div>                         
                    </div>
                    <div class="description_v1 wd100">
                        <div class="description">Description</div>             
                        <div class="frame207 wd100" onclick="required(this)">
                        <div class="frame17Borad titleEditCard">
                            <textarea  class="text_enterDescriptionPop" type="text"  id="editDescription" placeholder="Enter a Description" required oninput="handleInput(this)"></textarea>
                            <img class ="recursor" src="./assets/img/Recurso 1 1.png">
                        </div>                       
                        <div class="descriptionFieldRequired" id="descriptionFieldRequired"></div> 
                        </div>
                    </div>
                    <div class="asignedTo_v1 wd100">
                        <div class="asignedTo">Assigned to</div>                     
                        <div class="categoryFrame74Board categoryEditCard" id="assignedBoard" onclick="hideAssignedBoardEdit(event, ${taskId})">                    
                            <input class="searchContactsBoard" type="text" id="searchContactsBoard" placeholder="Select contacts to assign">
                            <div class ="imgArrows" id="imgArrows" onclick="hideAssignedBoardEdit(event, ${taskId})">
                                <img class="arrow_drop_down" src="./assets/img/arrow_drop_down.png"  id="arrowAssignedEdit" onclick="hideAssignedBoardEdit(event, ${taskId})" > 
                                <img class="arrow_drop_downHover" src="./assets/img/arrow_drop_down_hover.png"  id="arrow_drop_downHoverAssignedEdit" onclick="hideAssignedBoardEdit(event, ${taskId})">                            
                            
                            <div class="listBoard" class="hide">
                            <ul id="listContactEdit" class="hide underListContactBoard underListContactBoardEdit"> 
                                <li id ="contactListBoard" class="list-large-card-edit-board"></li>                       
                            </ul>
                            </div>
                        </div>  
                        </div>                                     
                        <div class="contactAvatarBoard" id="contactAvatarEditBoard">
                            <div class="contactAvatarEdit" id="editAssignedContacts"></div>
                        </div>
                    </div>
                </div>
                <div class="inputRight_addTask" id="dateAddTaskEdit">
                    <div class="dueDateBoard wd100">
                        <div class="text_DueDate">Due date</div>
                        <div class="frame211 wd100">                    
                                <div class="dueDate_frame14">
                                    <input class="inputDate"  type="date" name="date" max="2030-12-31" placeholder="dd/mm/yyyy" id="editDueDate" required oninput="handleInput(this)" >   
                                </div>
                                <div class="dueDateFieldRequired" id="dueDateFieldRequired"></div> 
                        </div>
                    </div>
                    <div class="frame28 wd100">
                        <div class="titlePrio">Priority</div>
                        <div class="boardpriority">
                            <div class="priorityUrgent"  onclick="changeColour('priorityUrgent')" id ="priorityUrgent">                    
                                <div class="textUrgent" id="textUrgent">Urgent</div>                       
                                <svg class="img-priorityUrgentSize" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">
                                    <g  clip-path="url(#clip0_114904_5525)">
                                        <path class="img-priorityUrgent" d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"/>
                                        <path class="img-priorityUrgent"  d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_114904_5525">
                                            <rect width="20" height="14.5098" transform="translate(0.748535 0.745117)"/>
                                        </clipPath>
                                    </defs>
                                </svg>                 
                            </div>
                            <div class="priorityMedium" id="priorityMedium" onclick="changeColour('priorityMedium')" >
                                <div class="textMedium">Medium</div>                        
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8">
                                    <g clip-path="url(#clip0_156_972)">
                                    <path class="img-priorityMedium"  d="M19.7596 7.91693H1.95136C1.66071 7.91693 1.38197 7.80063 1.17645 7.59362C0.970928 7.3866 0.855469 7.10584 0.855469 6.81308C0.855469 6.52032 0.970928 6.23955 1.17645 6.03254C1.38197 5.82553 1.66071 5.70923 1.95136 5.70923H19.7596C20.0502 5.70923 20.329 5.82553 20.5345 6.03254C20.74 6.23955 20.8555 6.52032 20.8555 6.81308C20.8555 7.10584 20.74 7.3866 20.5345 7.59362C20.329 7.80063 20.0502 7.91693 19.7596 7.91693Z" fill="#FFA800"/>
                                    <path class="img-priorityMedium"  d="M19.7596 2.67376H1.95136C1.66071 2.67376 1.38197 2.55746 1.17645 2.35045C0.970928 2.14344 0.855469 1.86267 0.855469 1.56991C0.855469 1.27715 0.970928 0.996386 1.17645 0.789374C1.38197 0.582363 1.66071 0.466064 1.95136 0.466064L19.7596 0.466064C20.0502 0.466064 20.329 0.582363 20.5345 0.789374C20.74 0.996386 20.8555 1.27715 20.8555 1.56991C20.8555 1.86267 20.74 2.14344 20.5345 2.35045C20.329 2.55746 20.0502 2.67376 19.7596 2.67376Z" fill="#FFA800"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_156_972">
                                    <rect width="20" height="7.45098" transform="translate(0.855469 0.466064)"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div class="priorityLow" id="priorityLow" onclick="changeColour('priorityLow')" >
                                <div class="textLow">Low</div>                        
                                <svg  xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">
                                    <path class="img-priorityLow" d="M10.8555 9.69779C10.6209 9.69819 10.3923 9.62335 10.2035 9.48427L1.30038 2.91453C1.18454 2.82898 1.0867 2.72146 1.01245 2.59812C0.938193 2.47478 0.888977 2.33803 0.867609 2.19569C0.824455 1.90821 0.897354 1.61537 1.07027 1.3816C1.24319 1.14782 1.50196 0.992265 1.78965 0.949143C2.07734 0.906021 2.3704 0.978866 2.60434 1.15165L10.8555 7.23414L19.1066 1.15165C19.2224 1.0661 19.354 1.00418 19.4938 0.969432C19.6336 0.934685 19.7788 0.927791 19.9213 0.949143C20.0637 0.970495 20.2006 1.01967 20.324 1.09388C20.4474 1.16808 20.555 1.26584 20.6407 1.3816C20.7263 1.49735 20.7883 1.62882 20.823 1.7685C20.8578 1.90818 20.8647 2.05334 20.8433 2.19569C20.822 2.33803 20.7727 2.47478 20.6985 2.59812C20.6242 2.72146 20.5264 2.82898 20.4106 2.91453L11.5075 9.48427C11.3186 9.62335 11.0901 9.69819 10.8555 9.69779Z" fill="#7AE229"/>
                                    <path class="img-priorityLow" d="M10.8555 15.4463C10.6209 15.4467 10.3923 15.3719 10.2035 15.2328L1.30038 8.66307C1.06644 8.49028 0.910763 8.2317 0.867609 7.94422C0.824455 7.65674 0.897354 7.3639 1.07027 7.13013C1.24319 6.89636 1.50196 6.7408 1.78965 6.69768C2.07734 6.65456 2.3704 6.7274 2.60434 6.90019L10.8555 12.9827L19.1066 6.90019C19.3405 6.7274 19.6336 6.65456 19.9213 6.69768C20.209 6.7408 20.4678 6.89636 20.6407 7.13013C20.8136 7.3639 20.8865 7.65674 20.8433 7.94422C20.8002 8.2317 20.6445 8.49028 20.4106 8.66307L11.5075 15.2328C11.3186 15.3719 11.0901 15.4467 10.8555 15.4463Z" fill="#7AE229"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="subtasksEdit">
                        <div class="textSubtasks">Subtasks</div>
                            <div class="subtasksFrame14Board" >
                            <input class="textAddSubtasks" type="text" name="subtasks" id="inputSubtasksEdit" placeholder="Add new subtask">
                                <div class="imgSubtasks" >
                                <div class="imgPlusContainer" id="imgPlusContainerEdit" onclick="addSubtasksEdit()">
                                <img class="imgPlusEdit" src="./assets/img/Subtasks.png" alt="" id="addSubtasksPlusEdit">
                                    </div>
                                </div>                        
                            </div>
                            <div class="allSubtasks" id ="editSubtasks"></div>
                            <div class="allSubtasks" id ="editSubtasksadd"></div>
                        </div>                    
                    </div>
                </div>

                <div class = "changeProgressEdit">
                        <p class = "titleSetTaskToEdit">Set Task to</p>
                        <div class = "changeProgressToEdit">
                        <button class="responsive-button-todo" id="responsiveButtonToDo" onclick="changeWorkPhase('todo', ${taskId})">To Do</button>
                        <button class ="responsive-button-in-progress" id="responsiveButtonInProgress" onclick="changeWorkPhase('inProgress', ${taskId})">In Progress</button>
                        <button class = "responsive-button-await-feedback" id="responsiveButtonAwaitFeedBack" onclick="changeWorkPhase('awaitFeedback', ${taskId})">Await FeedBack</button>
                        <button class = "responsive-button-done" id="responsiveButtonDone" onclick="changeWorkPhase('done', ${taskId})">Done</button>
                    </div>
                </div>
                
                <div class="saveContainer">    
                <div class="save-button">
                    <a class="leadsToBoard" href="#" id="leadsToBoard" onclick="saveEditTaskBoard(${taskId})">
                        <div class="primary">
                            <div class="textCreateTask">Ok <img src="./assets/img/check.png" alt=""></div>            
                        </div>
                    </a>
                </div>
            </div>
        </div>        
    </div>
    `;
}

/**
 * @returns {string} - Returns the HTML Code for Contacts Add Task Board Content
 *
 * */
function generateContactsAddTaskBoard(name, firstname, surname, i) {
  return /*html*/ `
    <div class="circleAvatarBoard" id="circle-${i}" style="background-color: ${colors[i]}">
      <p class="nameIdListBoard" id="name-id">${firstname}${surname}</p>
    </div>                
    <div class="custom-checkbox-board">            
      <input class="inputCheckBox" type="checkbox" id="myCheckbox_Edit${i}">                    
      <label class="nameContact ResVersion" for="myCheckbox_Edit${i}">${name}</label>                              
    </div>`;
}

/**
 * @returns {string} - Returns the HTML Code for Avatar Add Task Board Content
 *
 * */
function generateAvatarAddTaskBoard(selectedIndex, contact, firstname, surname) {
  return /*html*/ `
        <div>
            <div class="circleAvatarBoardChecked" id="circle-${selectedIndex}" style="background-color: ${colors[selectedIndex]}">
                <p class="nameIdListBoard" id="name-id">${firstname}${surname}</p>
            </div>
        </div>
    `;
}

/**
 * @returns {string} - Returns the HTML Code for Display Subtasks Content
 *
 * */
function generateDisplaySubtasksHTML(i, subtask) {
  return /*html*/ `
          <div class="subtaskItem" id="subsTaskEdit${i}">
            <span><li>${subtask}</li></span>
            <div class="subtaskButtons">
              <button id="editButton_${i}" onclick="editSub('${i}')"><img src="./assets/img/edit_task.png"></button>
              <button id="deleteButton_${i}" onclick="deleteSubs('${i}')"><img src="./assets/img/delete_contacts.png"></button>
            </div>
          </div>`;
}

/**
 * @returns {string} - Returns the HTML Code for Small Card Content
 *
 * */
function generateSmallCardHTML(task, className, clonedContentDiv, smallProgressDiv, i, taskID) {
  return /*html*/ `
      <div class="smallCard cardA" id="smallCardId-${taskID}" draggable="true" ondragstart="startDragged(${taskID})" onclick="openCard(${taskID}, ${i})"> 
        <div class="smallCardcategory"><p id="category" class="${className}">${task.category[0]}</p><img class="d-none" id="moveMobileVersion-${task.id}" src="./assets/img/punkte.png" alt=""></div>
        <div class="taskText">
          <div class="taskTitle">${task.title}</div>
          <div class="taskDescription">${task.description}</div>
        </div>
        ${smallProgressDiv}
        <div class="smallCardFooter">
          <div id="boardAssigend-${taskID}" class="boardAssigend"></div>
          <div class="smallPrio" >
            <img class="smallPrioImg" id="smallCardPrio${task.id}">
          </div>
        </div>  
      </div>
    `;
}

/**
 * @returns {string} - Returns the HTML Code for Large Card Content
 *
 * */
function generateLargeCardHTML(task, className, clonedContentDiv, subsHtml, taskId) {
  var dueDate = new Date(task.dueDate);
  var formattedDueDate = `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;
  return /*html*/ `
      <div class="desingLagrCard LargCardes" id="desingLagrCard">
        <div class="largeCardA" id="largeCardA">
          <div id="addTaskLargeCard" class="d-None"></div>
          <div class="largesCard" id="largesCard">
            <div class="largeCardInside">
              <div class="largCardHeader">
                <div class="lardCardCategory">
                  <p id="largeCategory" class="${className}">${task.category[0]}</p>
                </div>
                <div class="closeLargeCardButton">
                  <button onclick="closeCard()" class="close-button-edite"><img class="close-img" src="./assets/img/cancel.png"></button>
                </div>
              </div>
              <div class="largCardText">
                <div class="largCardTitle">
                  <h1 class="largTitle">${task.title}</h1>
                </div>
                <div class="largCardTextArea">
                  <p>${task.description}</p>
                </div>
              </div>
              <div class="largeTaskDetails">
                <div class="largTaskDueDat">
                  <div class="largDueDate"><span>Due Date:</span><span>${formattedDueDate}</span></div>
                </div>
                <div class="largPrioDetail">
                  <p class="boardText">Priority:</p>
                  <p id="textPrioLargeCard${task.id}" class="boardText">Priority:</p>
                  <img id="imgPrioLargeCard${task.id}" class="blackImport">
                </div>
                <div class="assigendLarge">
                  <p  class="boardText">Assigned To:</p>
                  <div  id="boardAssigendLargCard"></div>
                </div>
                <div class="subtasks wd100">
                  <p class="titleSubtasksBoard">Subtasks</p>
                  <p>${subsHtml}</p>
                </div>

                <div class = "changeProgress">
                        <p class = "titleSetTaskTo">Set Task to</p>
                        <div class = "changeProgressTo">
                        <button class="responsive-button-todo" id="responsiveButtonToDo" onclick="changeWorkPhase('todo', ${taskId})">To Do</button>
                        <button class ="responsive-button-in-progress" id="responsiveButtonInProgress" onclick="changeWorkPhase('inProgress', ${taskId})">In Progress</button>
                        <button class = "responsive-button-await-feedback" id="responsiveButtonAwaitFeedBack" onclick="changeWorkPhase('awaitFeedback', ${taskId})">Await FeedBack</button>
                        <button class = "responsive-button-done" id="responsiveButtonDone" onclick="changeWorkPhase('done', ${taskId})">Done</button>
                    </div>
                </div>                
                
                <div class="largCardFooter">
                  <div class="largCardButton">
                  <div class="delete_task" onmouseover="changeImage(true)" onmouseout="changeImage(false)" onclick="deleteTaskOnServer(${taskId})">
                    <img id="delete-task-image" class="delete-task-bt" src="./assets/img/delete_contacts.png">
                         <p class="delete-task-title" id="delete-task-title">Delete</p>
                    </div>
                    <img class="largCardButton_vector" src="./assets/img/vector.png" alt="">
                    <div class="edit_task" onmouseover="changeEditImage(true)" onmouseout="changeEditImage(false)" onclick="editLargCard(${task.id})" style="display: flex; align-items: center; gap: 4px; cursor:pointer;">
                      <img id="edit-task-image" class="imgEdit_task" src="./assets/img/edit_task.png" alt="">
                      <p class="edit-task-title">Edit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

/**
 * @returns {string} - Returns the HTML Code for Subtasks Content
 *
 * */
function generateSubtasksHTML(task, taskIndex) {
  return task.subtasks
    .map(
      (subtask, index) => `
        <div class="subtasksContents">
          <input 
            type="checkbox" 
            id="checkbox-${task.id}-${subtask.id}" 
            class="checkbox-input-${task.id}" 
            ${subtask.completed ? "checked" : ""} 
            onchange="updateProgress(${task.id}, ${taskIndex}, ${index})"
          >
          <label class="checkbox-label" for="checkbox-${task.id}-${subtask.id}">
            <span class="checkbox-custom">${subtask.description}</span>
          </label>
        </div>`
    )
    .join("");
}

/**
 * @returns {string} - Returns the HTML Code for Edite Contacts Content
 *
 * */
function generateEditContacts(assignedItem, color) {
  let name = assignedItem;
  let firstname = name[0].toUpperCase();
  let names = assignedItem.split(" ");
  let surname = names[1].toUpperCase().charAt(0);
  return /*html*/ `
      <div class="boardLargContactsAvatar">
        <div class="editVersionCircel" style="background-color: ${color}">
          <p class="nameIdList">${firstname}${surname}</p>
        </div>
        <p>${assignedItem}</p>
      </div>
    `;
}

/**
 * @returns {string} - Returns the HTML Code for Edite Subtask Content
 *
 * */
function generateInputEditSubtask(index) {
  return /*html*/ `
       <div class="subtaskItem subtaskItemBoard">
        <input class="inputSubtaskEdite" type="text" id="subtaskEdite${index}"; >
          <div class="iconsContainer"><img onclick="deleteSubTaskEdite(${index})" class="delete" src="./assets/img/delete_contacts.png">
            <img class="vector" src="./assets/img/vector.png"><img class="subtaskCheck" onclick="saveEditetSubTask(${index})"  src="./assets/img/done.png">
          </div>
       </div>`;
}

/**
 * @returns {string} - Returns the HTML Code for Circle Contacts Large Card Content
 *
 * */
function generatCircleContactsLargeCard(d, firstname, surname, assigendAvatar) {
  return /*html*/ `
      <div class="boardLargContactsAvatar">
         <div class="boardVersionCircel" id="circle-${d}" style="background-color: ${colors[d]}">
            <p class="nameIdList" id="name-id">${firstname}${surname}</p>
         </div>
         <p>${assigendAvatar}</p>
      </div>
`;
}

/**
 * @returns {string} - Returns the HTML Code for Contacts Smal Card Content
 *
 * */
function generateContactsSmalCard(a, firstname, surname) {
  return /*html*/ `
          <div class="">
              <div class="boardVersionCircel" id="circle-${a}" style="background-color: ${colors[a]}">
                  <p class="nameIdList" id="name-id">${firstname}${surname}</p>
              </div>
          </div>
       `;
}

/**
 * @returns {string} - Returns the HTML Code for Many Contacts Smal Card Content
 *
 * */
function generateManyContactsSmalCard(totalAssigned, maxContactsToShow) {
  return /*html*/ `
      <div class="">
          <div class="boardVersionCircel lastSmallCircel " style="background-color: #ccc;">
             <p class="nameIdList lastCircel" id="name-id">${totalAssigned - maxContactsToShow}+</p>
          </div>
       </div>
`;
}

/**
 * @returns {string} - Returns the HTML Code for Many Contacts Progress Bar Content
 *
 * */
function generateProgressBar(taskId, taskSubtasksLength) {
  return /*html*/ `
            <div class="progressContainer">
                <div class="progress">
                    <div class="progress-value" id="progress-${taskId}"></div>
                </div>
                <div class="smallProgress" id="smallProgress-${taskId}">0/${taskSubtasksLength}</div>
            </div>
        `;
}
