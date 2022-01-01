let InputValue = document.querySelector(".input-task"), //text
  AddButton = document.querySelector(".plus-icon"), //add-task-btn
  EditButton = document.querySelectorAll(".edit-button"), //save-todo-btn
  DeleteButton = document.querySelectorAll(".task-content .taskBox .delete-button"),
  DivContainerTasks = document.querySelector(".task-content"); //listBox
  DateDiv = document.querySelector(".date"),
  errorMessage = document.querySelector(".empty-input-error"),
  EditButton = document.querySelector(".save-todo-btn"),
  savedIndexHidden = document.getElementById("saveIndex"), //input hidden
  searchBox = document.getElementById("searchBox");

//show date
function GetDate() {
  let date = new Date();
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let days = weekday[date.getDay()];
  let months = month[date.getMonth()];
  let dateNumber = date.getDate();
  console.log(dateNumber);
  return `${days}, ${dateNumber} ${months}`;
}
DateDiv.innerHTML = GetDate();

//click add button function
AddButton.addEventListener("click", function () {
  checkInputTask();
});
let todoListArray = [];
function checkInputTask() {
  if (InputValue.value == "") {
    errorMessage.innerHTML = "Ooops! please enter tasks";
    InputValue.onfocus = function(){
        errorMessage.innerHTML = "";
    }
  } else {

    let m = {
      taskName: InputValue.value,
    };
    todoListArray.push(m);
    InputValue.value = "";
    localStorage.setItem("todo", JSON.stringify(todoListArray));
    showTasks();
    if (localStorage.getItem("todo") == null) {
      todoListArray = [];
    } else {
      todoListArray = JSON.parse(localStorage.getItem("todo"));
    }
  }
}

//function to show all element in page
function showTasks() {
  if (localStorage.getItem("todo") == null) {
    todoListArray = [];
  } else {
    todoListArray = JSON.parse(localStorage.getItem("todo"));
  }

  Testing();
  let SearchInput = searchBox.value;
  let showTasksHtml = todoListArray.map(function (element, index) {
      if (todoListArray[index].taskName.toUpperCase().includes(SearchInput.toUpperCase())) {
        return `   
    <span class="taskBox">
    <input class="input-checked" id="first" type="checkbox"> 
    <label for="first" id="listValue">${element.taskName}</label> 
    <span><i class="far fa-trash-alt delete-button" onclick="DeleteItem(${index})"></i></span>
    <span><i class="far fa-edit edit-button" onclick="EditItem(${index})"></i></span>  
    </span>     
    `;
      }
    })
    .join("");

  DivContainerTasks.innerHTML = showTasksHtml;
}
showTasks();

//Filter  Function
function Testing() {
  searchBox.addEventListener("keyup", function () {
    showTasks();
  });
}

//delete function
function DeleteItem(index) {
  todoListArray.splice(index, 1);
  localStorage.setItem("todo", JSON.stringify(todoListArray));
  showTasks();
}

//Edit function
function EditItem(index) {
  savedIndexHidden.value = index; //يحط القيمة 0 او 1 او 2 في الانبت المخفي
  todoListArray = JSON.parse(localStorage.getItem("todo"));
  InputValue.value = todoListArray[index].taskName; //three  three[0]  اسم العنصر يحط القيمة في الانبت
  AddButton.style.display = "none";
  EditButton.style.display = "block";
}

EditButton.addEventListener("click", function () {
  todoListArray = JSON.parse(localStorage.getItem("todo"));
  let id = savedIndexHidden.value; // it will be index number 0 1 2
  todoListArray[id].taskName = InputValue.value;
  AddButton.style.display = "block";
  EditButton.style.display = "none";
  InputValue.value = "";
  localStorage.setItem("todo", JSON.stringify(todoListArray));
  showTasks();
});
