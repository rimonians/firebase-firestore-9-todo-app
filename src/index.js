// Import from internal module
import { createTodo, getTodos, updateTodo, deleteTodo } from "./firebase";

// Select element
const todoInput = document.querySelector(".todoInput");
const todoCreateBtn = document.querySelector(".todoCreate");
const todoList = document.querySelector(".todo-list");
const todoTemplate = document.querySelector(".todo-template");

// Create todo
todoCreateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    todo: todoInput.value,
    status: "uncomplete",
  };
  if (data.todo !== "") {
    createTodo(data, () => {
      todoInput.value = "";
      alert("Todo successfully created");
    });
  } else {
    alert("Todo can't be empty");
  }
});

// Get all todos
getTodos((todos) => {
  todoList.innerHTML = "";
  if (todos.length === 0) {
    todoList.innerHTML = `<h3>No todo founded</h3>`;
    return;
  }
  todos.forEach((todo) => {
    const temp = todoTemplate.content.cloneNode(true);
    const todoText = temp.querySelector(".todo h3");
    const updateBtn = temp.querySelector(".update");
    const deleteBtn = temp.querySelector(".delete");
    todoText.classList.add(
      todo.status === "complete" ? "complete" : "uncomplete"
    );
    todoText.textContent = todo.todo;
    updateBtn.textContent =
      todo.status === "complete" ? "Complete" : "Uncomplete";
    updateBtn.value = todo.id;
    deleteBtn.value = todo.id;
    todoList.appendChild(temp);
  });
});

// Update or delete todo
todoList.addEventListener("click", (e) => {
  const target = e.target;

  if (target.className === "update") {
    const id = target.value;
    const status =
      target.textContent === "Uncomplete" ? "complete" : "uncomplete";
    updateTodo(id, status, () => {
      alert("Todo successfully updated");
    });
    return;
  }

  if (target.className === "delete") {
    const id = target.value;
    if (window.confirm("Are you surely want to delete this todo?")) {
      deleteTodo(id, () => {
        alert("Todo successfully deleted");
      });
    }
    return;
  }
});
