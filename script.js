const $ = document;

const addBox = $.querySelector(".add-box"),
  popupBox = $.querySelector(".popup-box"),
  popupTitle = $.querySelector("header p"),
  popupClose = $.querySelector("header i"),
  inputElem = $.querySelector("input"),
  textareaElem = $.querySelector("textarea"),
  buttonElem = $.querySelector("button");

let isUpdate = false


let notes = [];

addBox.addEventListener('click', ()=>{
    
    if (isUpdate) {
        
        popupTitle.innerHTML = "Update Main Note" 
        buttonElem.innerHTML = "Update Note"
        isUpdate = true //todo: update
    } else {
        popupTitle.innerHTML = "Add a New Note" 
        buttonElem.innerHTML = "Add Note"
        isUpdate = false // todo : update
    }

    inputElem.focus()


    popupBox.classList.add('show')
})

buttonElem.addEventListener('click', ()=>{
    console.log('add note')
})

function generateNotes(){

}

function getLocalStorageNotes () {
    let localStorageNotes = localStorage.getItem("notes")

    if (localStorageNotes) {

        notes = JSON.parse(localStorageNotes)
        
    } else {
        notes = []
    }

   return notes
} 

window.addEventListener('load', ()=>{
    let notes = getLocalStorageNotes()

    generateNotes(notes)
})

// const months = ["January", "February", "March", "April", "May", "June", "July",
//     "August", "September", "October", "November", "December"];
