let tasks = [];
let taskStatus = [];
let contacts = [];

/**
 * Loads contacts data from the server and updates the local 'contacts' array.
 * @throws {string} Throws an error if loading contacts data fails.
 * @returns {void} A promise that resolves when the data is loaded and processed.
 */
async function load() {
  const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    await pushTasksDataToArray(response);
  } else {
    console.error("Error loading contacts:", response.statusText);
  }
}

/**
 * Push Data to Array
 */
async function pushTasksDataToArray(response) {
  tasks = [];
  const data = await response.json();
  data.forEach((task) => {
    tasks.push({
      id: task.pk,
      title: task.title,
      description: task.description,
      dueDate: task.due_date,
      assigned: task.assigned,
      priorityID: task.priority_content,
      subtasks: task.sub_tasks,
      taskStatus: task.task_status,
      category: task.category,
    });
  });
}

/**
 * Sends a new task to the backend API.
 */
async function postTaskToBackend(newTask) {
  const subTaskData = await pushSubTaskToArray(newTask);
  const taskData = await generateDataToBackendTasks(newTask, subTaskData);
  await fetch("http://127.0.0.1:8000/api/tasks/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
}

/**
 * Updates a task on the server.
 */
async function updateTaskOnServer(editedTask, idTask) {
  await fetch(`http://127.0.0.1:8000/api/tasks/${idTask}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedTask),
  });
}

/**
 * Push Subtask to backend.
 */
function pushSubTaskToArray(newTask) {
  let returnData = [];
  if (newTask.subtasks.length === 0) {
    return;
  } else {
    newTask.subtasks.forEach((subTask) => {
      let data = {
        description: subTask,
        completed: false,
      };
      returnData.push(data);
    });
  }
  return returnData;
}

/**
 * Generates task data to be sent to the backend.
 */
async function generateDataToBackendTasks(newTask, subTaskData) {
  return {
    title: newTask.title,
    task_status: newTask.taskStatus,
    description: newTask.description,
    assigned: assigned,
    due_date: newTask.dueDate,
    priority_content: newTask.priorityID,
    sub_tasks: subTaskData,
    category: newTask.category,
  };
}

/**
 * Deletes a task based on the event triggered by the user.
 */
async function deleteTask(id) {
  await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  updateHtml();
  closeCard();
}

/**
 * Loads contacts data from the server and updates the local 'contacts' array.
 * @throws {string} Throws an error if loading contacts data fails.
 * @returns {void} A promise that resolves when the data is loaded and processed.
 */
async function loadContactsFromServer() {
  const response = await fetch("http://127.0.0.1:8000/api/user_contacts/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    await pushContactDataToArray(response);
  } else {
    console.error("Error loading contacts:", response.statusText);
  }
}

/**
 * Push Data to Array
 */
async function pushContactDataToArray(response) {
  contacts = [];
  const data = await response.json();
  data.forEach((contact) => {
    contacts.push({
      id: contact.pk,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  });
}

/**
 * Saves a new contact to the server by updating the 'contacts' array and storing it.
 * @param {any} newContact - The new contact to be added to the 'contacts' array.
 * @returns {void} A promise that resolves when the data is saved.
 */
async function saveContactsToServer(newContact) {
  contacts.push(newContact);
  try {
    const response = await fetch("http://127.0.0.1:8000/api/user_contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
    if (response.ok) {
      const data = await response.json();
      const pk = data.pk;
      return pk;
    } else {
      console.error("Fehler beim Speichern des Kontakts:", response.statusText);
    }
  } catch (error) {
    console.error("Netzwerkfehler:", error);
  }
}

/**
 * Deletes a contact from the server by contact ID.
 *
 * @param {number|string} contactId - The ID of the contact to delete.
 * @returns {Promise<void>} A promise that resolves when the contact is deleted.
 */
async function deleteContactFromServer(contactId) {
  await fetch(`http://127.0.0.1:8000/api/user_contacts/${contactId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * Updates a contact on the server.
 * @async
 * @function updateContactOnServer
 * @param {Array} editedContact - Array containing updated contact details [name, email, phone].
 * @param {number|string} idContacts - ID of the contact to update.
 * @returns {Promise<void>} Resolves when the contact is updated on the server.
 */
async function updateContactOnServer(editedContact, idContacts) {
  let updatedContact = {
    name: editedContact[0],
    email: editedContact[1],
    phone: editedContact[2],
  };
  await fetch(`http://127.0.0.1:8000/api/user_contacts/${idContacts}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedContact),
  });
}
