const add = document.getElementById('addBtn')
const todoDiv = document.querySelector("#list");

//ADD
//listen for click for add button
//store user input in variable todoString
//call clickAdd and pass  todoString
add.addEventListener('click', function(){
    let todoString = document.getElementById('todoText').value;   
    clickAdd(todoString)
})

let deleteButton = `<button>delete</button>`;
let editButton = `<button>edit</button>`;

//pass todoString as parameter
//make a post request using route & object
//server responds,  response.data is the new task (object)
//create a new div tag
//inside div tag, put delete button, edit button, span tag with new task 
//append that new div tag inside parent div
function clickAdd(todoString){
    axios.post('/api/todos', {"todo": todoString})
        .then(function (response) { 
            let divTag = document.createElement("div"); 
            divTag.setAttribute("id", response.data.id);
            divTag.innerHTML = `${deleteButton} ${editButton} <span class="task">${response.data.todo}</span>`;        
            todoDiv.appendChild(divTag);   

    })
} 

//DELETE
//listen for click
//event.target is the button clicked
//if it's a dlete button, call getTaskList
let targetedDiv;
todoDiv.onclick = function(event){
    console.log('event', event)
    console.log('event.target', event.target)
    let target = event.target;
    targetedDiv = target.parentNode
    if (target.innerHTML === 'delete') {
        console.log('will delete', targetedDiv)
        let targetTaskID = targetedDiv.getAttribute("id")
        clickDelete(targetTaskID)  
        //getTaskListAndId()
        //return targetedDiv
    }
;
}

//pass id
//make delete request 
function clickDelete(targetTaskID){
    console.log('targetedTaskID', targetTaskID)
     axios.delete(`/api/todos/${targetTaskID}`)    
        .then(function (response) {      
            console.log(response.data);
            todoDiv.removeChild(targetedDiv)

    })
} 


//make request to get entire list
//gets array of objects
//call getID
// function getTaskListAndId() {
//     axios.get('/api/todos')
//         .then(function (response) { 
//         console.log('response.data of GET', response.data);
//         let targetedTask = targetedDiv.lastChild.innerHTML
//         response.data.forEach(function(el){
//             if(el.todo === targetedTask){
//                 let targetedTaskID = el.id
//                 clickDelete(targetedTaskID)   
//                 // return targetedTaskID
//             } 
//          })   
//        // return(response.data);
//     })


        
        // .then(getID)
// }

//loop through todoList, find the id of the task you want to delete
//call clickDelete
// function getID(result){   
//     let targetedTask = targetedDiv.lastChild.innerHTML
//     result.forEach(function(el){
//         if(el.todo === targetedTask){
//             let targetedTaskID = el.id
//             clickDelete(targetedTaskID)   
//             // return targetedTaskID
//         }         
//     })    
// }






// axios.get('/api/todos')
//     .then(function (response){
//      
//     })


// function clickComplete(){
//     axios.get('/api/todos/:id')
//         .then(function (response) {              
//         })
// } 

// function clickEdit(){
//     axios.get('/api/todos/:id')
//         .then(function (response) {                
//         })
// } 


