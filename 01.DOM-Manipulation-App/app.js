window.addEventListener("load", solve);

function solve() {
    let roomSizeInput = document.getElementById("room-size");
    let timeSlotInput = document.getElementById("time-slot");
    let fullNameInput = document.getElementById("full-name");
    let emailInput = document.getElementById("email");
    let phoneInput = document.getElementById("phone-number");

    let roomSize = document.getElementById("preview-room-size");
    let timeSlot = document.getElementById("preview-time-slot");
    let fullName = document.getElementById("preview-full-name");
    let email = document.getElementById("preview-email");
    let phone = document.getElementById("preview-phone-number");
    
    let hiddenBlockForConfirming = document.getElementById("preview");

    let bookRoomButton = document.getElementById("book-btn");
    bookRoomButton.addEventListener("click", fillInput );
  


  function fillInput(){

    if (roomSizeInput.value === "" ||  timeSlotInput.value === ""||fullNameInput.value === "" || emailInput.value === ""|| phoneInput.value === "")
      {return; }

    hiddenBlockForConfirming.style.display = "block";
    bookRoomButton.disabled = true;

    roomSize.textContent = roomSizeInput.value;
    timeSlot.textContent = timeSlotInput.value;
    fullName.textContent = fullNameInput.value;
    email.textContent = emailInput.value;
    phone.textContent = phoneInput.value;

    roomSizeInput.value = "";
    timeSlotInput.value = "";
    fullNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
} 
let editButton = document.getElementById("edit-btn");
editButton.addEventListener("click", editOn);

function editOn(){

  roomSizeInput.value = roomSize.textContent;
  timeSlotInput.value =timeSlot.textContent;
  fullNameInput.value  = fullName.textContent;
  emailInput.value = email.textContent;
  phoneInput.value = phone.textContent;

  bookRoomButton.disabled = false;
  hiddenBlockForConfirming.style.display = "none";

}

let confirmButton = document.getElementById("confirm-btn");
let hiddenFieldTwo = document.getElementById("confirmation");
confirmButton.addEventListener("click", confirmOn);

function confirmOn(){

 

  
  hiddenBlockForConfirming.style.display = "none";
  hiddenFieldTwo.style.display= "block";

  }

  let   newOrder = document.getElementById("back-btn");
newOrder.addEventListener("click", backOn);

function backOn(){
  hiddenFieldTwo.style.display= "none";
  bookRoomButton.disabled = false;
}


}