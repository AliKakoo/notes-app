const $ = document;

const addBox = $.querySelector(".add-box"),
  popupBox = $.querySelector(".popup-box"),
  popupTitle = $.querySelector("header p"),
  popupClose = $.querySelector("header i"),
  inputElem = $.querySelector("input"),
  textareaElem = $.querySelector("textarea"),
  buttonElem = $.querySelector("button"),
  wrapperElem = $.querySelector(".wrapper");

let isUpdate = false;
let updateID = null

let notes = [];

addBox.addEventListener("click", showModal);

function showModal  (noteTitle, noteDesc)  {
  if (isUpdate) {
    popupTitle.innerHTML = "Update Main Note";
    buttonElem.innerHTML = "Update Note";
    inputElem.value = noteTitle;
    textareaElem.value = noteDesc;
  } else {
    popupTitle.innerHTML = "Add a New Note";
    buttonElem.innerHTML = "Add Note";
    
  }

  inputElem.focus();

  popupBox.classList.add("show");
};

buttonElem.addEventListener("click", () => {

  if (isUpdate) {

    let allNotes = getLocalStorageNotes();

    allNotes.some((note , index) => {
      if (index === updateID) {
        note.title = inputElem.value;
        note.description = textareaElem.value;

      }
    })

    setNotesInLocalStorage(allNotes);
    generateNotes(allNotes)
    closeModal()
    clearInputs()

    isUpdate =false
    
  } else {
    
    let newNote = {
      title: inputElem.value,
      description: textareaElem.value,
      date: getNowDate(),
    };
    
    notes.push(newNote);
    setNotesInLocalStorage(notes);
    closeModal();
    generateNotes(notes);
    clearInputs();
  }



});

// Date

function getNowDate() {
  let now = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let toDay = now.getDay();
  let nowMonth = now.getMonth();
  let year = now.getFullYear();
  let dayOfMonth = now.getDate();

  return `${months[nowMonth]} ${dayOfMonth} , ${year} (${days[toDay]})`;
}

function clearInputs() {
  inputElem.value = "";
  textareaElem.value = "";
}

function generateNotes(notes) {
  $.querySelectorAll(".note").forEach((note) => {
    note.remove();
  });

  notes.forEach((note, index) => {
    wrapperElem.insertAdjacentHTML(
      "beforeend",
      `
            <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span>${note.description}</span>
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h" onclick="showSetting(this)"></i>
            <ul class="menu">
              <li onclick="editNote(${index},'${note.title}','${note.description}')">
                <i class="uil uil-pen"></i>Edit
              </li>
              <li onclick="removeNote(${index})">
                <i class="uil uil-trash"></i>Delete
              </li>
            </ul>
          </div>
        </div>
      </li> `
    );
  });
}

function removeNote(noteIndex) {
  let deleted = confirm("Are You Sure To Delete That?😢");

  if (deleted) {
    let newNotes = getLocalStorageNotes();

    newNotes.splice(noteIndex, 1);

    setNotesInLocalStorage(newNotes);

    generateNotes(newNotes);
  }
}



function editNote(noteID, noteTitle, noteDesc) {

  isUpdate = true;
 showModal( noteTitle, noteDesc);

 updateID = noteID

}



function showSetting(element) {
  element.parentElement.classList.add("show");
}

function getLocalStorageNotes() {
  let localStorageNotes = localStorage.getItem("notes");

  if (localStorageNotes) {
    notes = JSON.parse(localStorageNotes);
  } else {
    notes = [];
  }

  return notes;
}

function setNotesInLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function closeModal() {
  popupBox.classList.remove("show");
}

popupClose.addEventListener("click", closeModal);

window.addEventListener("load", () => {
  let notes = getLocalStorageNotes();

  generateNotes(notes);
});

window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
