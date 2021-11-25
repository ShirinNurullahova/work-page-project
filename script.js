const editImg = document.getElementById("edit-img");
const addWorkModal = document.getElementById("add-work-box");
const addWorkCancel = document.getElementById("add-work-cancel");
const addWorkSubmit = document.getElementById("add-work-submit");
const form = document.getElementById("add-modal");

const loginModal = document.getElementById("login-modal");
const loginModalImg = document.getElementById("loginModalImg");
const loginModalCancel = document.getElementById("login-modal-close");

const taskInfo = document.getElementById("task-info");
const taskInfoDesc = document.getElementById("task-info-desc");
const plusImg = document.getElementById("plus-img");
const boxContainer = document.getElementById("box-container");

if (localStorage.getItem("New_Div")) {
  for (let task of JSON.parse(localStorage.getItem("New_Div"))) {
    let newBlock1 = document.createElement("div");

    newBlock1.classList.add("task");

    newBlock1.innerHTML = `
  <div class="task-info">
  <p>Jobs to be done</p>
  <img src="./assets/iconmonstr-plus-2.svg" class="plus-img" id="plus-img" onClick="drop(this)" >
  </div>
  <div class="task-description" id="descriptionTask">
  <p> task: ${task.taskName}</p>
  <p> Description: ${task.taskDescription}</p>
  <p> Name: ${task.name}</p>
  <p>Deadline: ${task.deadline}</p>
  <div style="display:flex  ; width: 100% ; justify-content: space-between" >
       ${task.percent}
     <div >
        <button id="confirm-button" onClick="resolved(this)">Confirm</button>
     </div>
  </div>
  </div>
  `;
    boxContainer.appendChild(newBlock1);
  }
}

editImg.addEventListener("click", (e) => {
  e.preventDefault();
  addWorkModal.style.display = "block";

  let output = document.querySelector("span");
  let today = new Date();

  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = today.getDate();
  let current_date = `${date}/${month}/${year}`;
  output.innerHTML = current_date;

  const dead = document.getElementsByClassName("dead");

  const timingF = document.getElementById("timing-f");
  var countDownDate = 0;
  var distance = 0;
  var x;
  dead[0].addEventListener("focusout", (event) => {
    let compareDate = document.getElementById("compare-date");

    if (month > event.target.value.split("-")[1]) {
      compareDate.style.opacity = "1";
    }
    if (year < event.target.value.split("-")[2]) {
      compareDate.style.opacity = "0";
    } else {
      compareDate.style.opacity = "0";
    }
    countDownDate = new Date(dead[0].value).getTime();
    var now = new Date().getTime();
    if (x) {
      console.log(x);
      if (countDownDate - now <= 0) {
        clearInterval(x);
        x = 0;
        timingF.innerHTML = "EXPIRED";
      }
    } else {
      console.log("will declare interval ");
      if (countDownDate - now <= 0) {
        return 0;
      }
      x = setInterval(function () {
        var now = new Date().getTime();
        distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));

        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timing-f").innerHTML =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        console.log(
          days + "d " + hours + "h " + minutes + "m " + seconds + "s "
        );
      }, 1000);
    }
  });

  form.reset();
});

addWorkCancel.addEventListener("click", (e) => {
  addWorkModal.style.display = "none";
});

loginModalImg.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.style.display = "block";
});
loginModalCancel.addEventListener("click", (e) => {
  loginModal.style.display = "none";
});

const taskHeadings = document.querySelectorAll("#plus-img");

taskHeadings.forEach((image) => {
  image.addEventListener("click", (event) => {
    console.log(event.target.classList[1]);
    // event.target.classList.toggle("rotate-img");
    const taskdesc = event.target.parentNode.nextElementSibling;
    if (image.classList.contains("rotate-img")) {
      // taskdesc.style.opacity = "1";
      // taskdesc.style.height = "auto";
    } else {
      // taskdesc.style.opacity = "0";
      taskdesc.style.height = "0";
    }
  });
});

const submitBtn = document.getElementById("add-work-submit");
const main = document.getElementById("job-main");
const DivContainer = document.getElementById("div-container");

submitBtn.addEventListener("click", AddNew);
let arrOfLocal = [];

function AddNew() {
  const newDiv = document.createElement("div");
  main.appendChild(newDiv);

  const newArr = {
    taskName: document.getElementById("task-name").value,
    taskDescription: document.getElementById("description").value,
    name: document.getElementById("name").value,
    deadline: document.getElementById("deadline").value,
    percent: `<div  class="progress">
             <div class ="progress-done" style="width:${
               document.getElementById("percent").value
             }%">${document.getElementById("percent").value}%
             </div>

    </div>`,
  };
  // arrBoxContainer.push(boxContainer);
  // console.log(arrBoxContainer);
  if (newArr.name === "") {
    newDiv.innerHTML = `
    <div id="div-container">
      <p>${newArr.taskName}</p>
      <p>${newArr.taskDescription}</p>
    </div>
   `;
  } else {
    let newBlock = document.createElement("div");
    newBlock.classList.add("task");

    newBlock.innerHTML = `
    <div class="task-info">
    <p>Jobs to be done</p>
    <img src="./assets/iconmonstr-plus-2.svg" class="plus-img" id="plus-img" onClick="drop(this)" >
    </div>
    <div class="task-description" id="descriptionTask">
    <p> task: ${newArr.taskName}</p>
    <p> Description: ${newArr.taskDescription}</p>
    <p> Name: ${newArr.name}</p>
    <p>Deadline: ${newArr.deadline}</p>
    <div style="display:flex  ; width: 100% ; justify-content: space-between" >
         ${newArr.percent}
       <div >
          <button id="confirm-button" onClick="resolved(this)">Confirm</button>
       </div>
    </div>
    </div>
    `;
    boxContainer.appendChild(newBlock);
  }
  arrOfLocal = JSON.parse(localStorage.getItem("New_Div")) || [];
  arrOfLocal.push(newArr);

  localStorage.setItem("New_Div", JSON.stringify(arrOfLocal));

  addWorkModal.style.display = "none";
}

function drop(clickedElement) {
  clickedElement.classList.toggle("rotate-img");
  clickedElement.parentNode.nextElementSibling.classList.toggle("active");

  const taskdesc = clickedElement.parentNode.nextElementSibling;
  // const confirmBtn = taskdesc.children[4].children[3].children[0];
  // console.log(taskdesc);
  if (clickedElement.classList.contains("rotate-img")) {
    taskdesc.style.display = "block";
  } else {
    // taskdesc.style.display = "none";
  }
}

const rightAside = document.getElementById("right-aside");

if (localStorage.getItem("New_Div_Right")) {
  for (let task1 of JSON.parse(localStorage.getItem("New_Div_Right"))) {
    let newBlock2 = document.createElement("div");

    newBlock2.classList.add("right-aside");

    newBlock2.innerHTML = `
    <div>
    <h1>Edilmish ishler</h1>
    <p>${task1.taskName}</p>
    <p>${task1.taskDescription}</p>
    <p>${task1.name}</p>
    <p>${task1.deadline}</p>
    </div>
  `;

    rightAside.appendChild(newBlock2);
  }
}

function resolved(event) {
  let arrOfLocal1 = [];

  const newRightDiv = document.createElement("div");
  rightAside.appendChild(newRightDiv);
  const newAside = {
    taskName: event.parentNode.parentNode.parentNode.children[0].textContent,
    taskDescription:
      event.parentNode.parentNode.parentNode.children[1].textContent,
    name: event.parentNode.parentNode.parentNode.children[2].textContent,
    deadline: event.parentNode.parentNode.parentNode.children[3].textContent,
  };

  if (
    (newAside.taskName !== "",
    newAside.taskDescription !== "",
    newAside.deadline !== "",
    newAside.name !== "")
  ) {
    newRightDiv.innerHTML = `
      <div>
      <h1>Edilmish ishler</h1>
      <p>${newAside.taskName}</p>
      <p>${newAside.taskDescription}</p>
      <p>${newAside.name}</p>
      <p>${newAside.deadline}</p>
      </div>
   `;
    event.parentNode.parentNode.parentNode.parentNode.remove();
  }

  arrOfLocal1 = JSON.parse(localStorage.getItem("New_Div_Right")) || [];
  arrOfLocal1.push(newAside);
  localStorage.setItem("New_Div_Right", JSON.stringify(arrOfLocal1));
  // const Task = document.getElementsByClassName("task");
  localStorage.setItem("New_Div", JSON.stringify(arrOfLocal));

  if (
    event.parentNode.parentNode.parentNode.children[0].textContent ===
    arrOfLocal.taskName
  ) {
    const newList = arrOfLocal.filter(
      (element) =>
        element.taskName !==
        event.parentNode.parentNode.parentNode.children[0].textContent
    );
    arrOfLocal = newList;
  }
}
function toggles(event) {
  event.classList.toggle("rotate-img");
  event.parentNode.nextElementSibling.classList.toggle("active");
}
