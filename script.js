class TodoList {
  constructor() {
    this.myList = [];
  }

  addTodo(text) {
    if (!text || typeof text !== "string" || text.length < 2)
      throw new Error("Task must be at least two characters");
    const newTodo = new Todo(text);
    this.myList.push(newTodo);
    addInput.value = "";
    useEffect();
    return newTodo;
  }

  findTodo(id) {
    if (!id || typeof id !== "number") throw new Error("Must enter valid ID");
    for (let todo of this.myList) {
      if (todo.id === id) return todo;
    }
    throw new Error("ID wasn't found");
  }

  removeTodo(id) {
    if (!id || typeof id !== "number") throw new Error("Must enter valid ID");
    this.myList.splice(this.myList.indexOf(this.findTodo(id)), 1);
  }

  editTodo(id, text) {
    if (!id || typeof id !== "number" || !text)
      throw new Error("Must enter valid ID");
    if (typeof text !== "string" || text.length < 2)
      throw new Error("Task must be at least two characters");
    this.findTodo(id).text = text;
  }

  changeDone(id, isDone = null) {
    if (typeof isDone !== "boolean") {
      return (this.findTodo(id)._isDone = !this.findTodo(id)._isDone);
    }
    return (this.findTodo(id)._isDone = isDone);
  }
}

class Todo {
  constructor(text) {
    this.id = this.getNewId();
    this.text = text;
    this._isDone = false;
    this.createdAt = new Date().toLocaleString();
  }

  getNewId() {
    return Number(
      String(
        Math.floor(
          new Date().getTime() * Math.random() * new Date().getMilliseconds()
        )
      ).slice(0, 6)
    );
  }
}

const useEffect = () => {
  todoListDiv.innerHTML = "";
  ofirList.myList.forEach((item) => {
    const eachTodoDiv = document.createElement("div");
    eachTodoDiv.setAttribute("data-todo-id", item.id);
    eachTodoDiv.innerHTML += `<h3 style="display: inline">${item.text}</h3>`;
    eachTodoDiv.appendChild(btnGroup);
    eachTodoDiv.innerHTML += `<hr/>`;
    todoListDiv.appendChild(eachTodoDiv);
  });
};

const allDiv = document.getElementById("allDiv");
const addNewDiv = document.getElementById("addNewDiv");
const todoListDiv = document.getElementById("todoListDiv");

const addTitle = document.createElement("h1");
const addInput = document.createElement("input");
const addBtn = document.createElement("button");
const btnGroup = document.createElement("div");
const editBtn = document.createElement("button");
const doneBtn = document.createElement("button");

addTitle.innerText = "Add New Todo:";
addInput.placeholder = "Enter new Todo";
addBtn.textContent = "Add";
editBtn.textContent = "✏️";
doneBtn.textContent = "✅";

addBtn.addEventListener("click", () => ofirList.addTodo(addInput.value));
editBtn.addEventListener("click", function (e) {
  const editId = Number(e.target.closest("div[data-todo-id]").dataset.editId);
  console.log(editId);
});
doneBtn.addEventListener("click", function () {
  console.log("test2");
});

allDiv.classList.add(
  "justify-content-center",
  "align-items-center",
  "m-auto",
  "text-center"
);
todoListDiv.style.width = "30rem";
todoListDiv.classList.add(
  "bg-secondary",
  "text-left",
  "m-auto",
  "position-relative",
  "rounded"
);
todoListDiv.innerHTML = "<hr/>";
addBtn.classList.add("btn", "btn-primary", "border-0", "m-1");
btnGroup.classList.add("d-inline-flex", "position-absolute", "end-0");
editBtn.classList.add("btn");
doneBtn.classList.add("btn");

addNewDiv.appendChild(addTitle);
addNewDiv.appendChild(addInput);
addNewDiv.appendChild(addBtn);
btnGroup.appendChild(editBtn);
btnGroup.appendChild(doneBtn);

const ofirList = new TodoList();
ofirList.addTodo("abcd");
ofirList.addTodo("def");
ofirList.addTodo("one two three");
ofirList.addTodo("five six seven eight");

ofirList.removeTodo(ofirList.myList[1].id);
ofirList.editTodo(ofirList.myList[0].id, "nice");
ofirList.changeDone(ofirList.myList[0].id, true);
ofirList.changeDone(ofirList.myList[1].id);
ofirList.changeDone(ofirList.myList[2].id, false);
ofirList.changeDone(ofirList.myList[0].id);

useEffect();
