let input = document.getElementById('input'),
  addBtn = document.getElementById('add__btn'),
  listContainer = document.getElementById('list__container'),
  mark = document.getElementById('mark'),
  task__number = document.getElementById('task__number');


// store all user input data
let dataStore = [];

// ! get input value when click on + icon
let takeDataFromUser = () => {
  //input validation
  if(input.value === ""){
    return;
  }else{
    //push data into dataStore
    dataStore.push({
      'task': input.value,
    });
    // storing data into local storage
    localStorage.setItem('data', JSON.stringify(dataStore));
    // invoke createTask() to make task card
    createTask();
    //invoke taskCount() ot show total task
    taskCount();
  }
  // invoke resetInput()
  resetInput();  
}

//!reset input field method
let resetInput = () => {
  input.value = "";
}

// ! adding event listener to addBtn to initiate the take creation
addBtn.addEventListener('click', takeDataFromUser);
//handle enter keypress event
input.addEventListener('keypress', (event) => {
  if(event.code === "Enter" || event.code === "NumpadEnter"){
    takeDataFromUser();
  }
});

// ! createTask() method for creating task card
let createTask = () => {
  listContainer.innerHTML = "";
  dataStore.map((ele, index) => {
    listContainer.innerHTML += `
    <div class="list__card" id=${index}>
      <span>
        <i onClick="addMark(this)" id="mark" class="fa-regular fa-circle" ></i>
        <span id="task__details">${ele.task}</span>
      </span>
      <span>
        <i onClick="deleteTask(this)" class="fa-regular fa-circle-xmark" id="delete__btn"></i>
      </span>
    </div>`
  })
}

// ! deletTask() method for delete task
let deleteTask = (task) => {
  //removing task card form screen
  task.parentElement.parentElement.remove();
  //delete form dataStore
  dataStore.splice(task.parentElement.parentElement.id, 1);
  //set the updated data into local storage
  localStorage.setItem('data', JSON.stringify(dataStore));
  //invoke the createTask to update all task card id number
  createTask();
  //invoke taskCount() to show update task number
  taskCount();
}

// ! add mark when click on blank circle of task
let addMark = (task) => {
  task.style.backgroundColor= "green";
  task.style.borderRadius= "20px";
}

// ! show total task in list
let taskCount = () => {
  task__number.innerHTML = dataStore.length;
}


// invoke iife function to get all initial task
// when first time start your broser
(() => {
  dataStore = JSON.parse(localStorage.getItem('data'))|| [];
  createTask();
  taskCount();
})();


