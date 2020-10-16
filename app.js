//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deletecheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event){
    //pevent form submission automatically 
    event.preventDefault();
    // creating todoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //create List
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add todo to localstorage
    saveLocalTodos(todoInput.value);

 //check button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class = "fas fa-check"></i>'
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

//check trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//Append todoList
todoList.appendChild(todoDiv);
//clear todoInput
todoInput.value = "";

};

function deletecheck(e){
   const item = e.target;
   //delete Todo
   if(item.classList[0] === "trash-btn"){
       const todo = item.parentElement;
       //Animation
       todo.classList.add("fall");
       removeLocalTodos(todo);
       todo.addEventListener('transitionend', function(){
           todo.remove();
       })
       
   };

   //checking Todo
   if(item.classList[0] === "complete-btn"){
       const todo = item.parentElement;
       todo.classList.toggle('completed');
   }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"; 
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //check for available todo in here...
    let todos = "";
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(){
    console.log("hellos");
     //check for available todo in here...
     let todos = "";
     if(localStorage.getItem("todos") === null){
         todos = [];
     } else{
         todos = JSON.parse(localStorage.getItem("todos"));
     }


     todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //create List
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add todo to localstorage

 //check button
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class = "fas fa-check"></i>'
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);

//check trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);

//Append todoList
todoList.appendChild(todoDiv);
     })
}

function removeLocalTodos(todo){
    //check for available todo in here...
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}