let now = new Date() ;
let date =(now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear();
let tasks = [
    {
        title:"task 1",
        date:date,
        isDone:false
    },
    {
        title:"task 2",
        date:date,
        isDone:false
    },
    {
        title:"task 3",
        date:date,
        isDone:false
    },
    {
        title:"task 4",
        date:date,
        isDone:false
    }
];

function updateStorage(){
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks",tasksString);
};
function getTasks(){
    let storedTasks = localStorage.getItem("tasks");
    if(storedTasks){
        tasks = JSON.parse(storedTasks);
    } else {
        updateStorage(); 
    }
}
getTasks();
function loop(){
    document.getElementById("tasks").innerHTML = "";
    let index = 0 ;
    for (task of tasks){
        let content = `
                <div class="task ${task.isDone?"done":""} ">
                    <div class="text " dir="rtl">
                        <p class="taskName">${task.title}</p>
                        <p class="Date" >${task.date}</p>
                    </div>
                    <div class="btns">
                        <button style="padding:8px;" onclick="updateTask(${index})" class="UpdateBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        </button>
                        ${task.isDone?`
                        <button style="padding:8px;" onclick="toggleTask(${index})" class="noFinish">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                        </button>
                            `:`
                        <button style="padding:8px;" onclick="toggleTask(${index})" class="FinishBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                        </button>
                            `}
                        <button style="padding:8px;" onclick="delTask(${index})" class="DeleteBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                        </button>
                    </div>
                </div>
`;
    document.getElementById("tasks").innerHTML += content ;
    index++;
};
};
loop()
document.getElementById("addBtn").addEventListener("click",()=>{
    let input =window.prompt("Enter a New Task :");
    let taskObj = {
        title:input,
        date:date,
        isDone:false
    };
    tasks.push(taskObj);
    updateStorage();
    loop();
});
function delTask(index){
    
    let del = confirm("you need to delete this task ?");
    if (del == true){
        tasks.splice(index,1);
    }
    else{
        console.log("NOT DELETED");
    };
    updateStorage();
    loop();
};
function updateTask(index){
    let task = tasks[index];
    let update = prompt('Enter Update :',task.title);
    task.title = update;
    updateStorage();
    loop();
};
function toggleTask(index){
    let task = tasks[index];
    task.isDone = !task.isDone;
    updateStorage();
    loop();
};
