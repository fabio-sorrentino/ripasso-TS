import './style.css'

interface Todo {
  id: number;
  attività: string;
  completata: boolean;
}

type Filtro = "Tutte" | "DaFare" | "Completate";

let todos: Todo[] = [];

let filtroCorrente: Filtro = "Tutte";

const input = document.querySelector<HTMLInputElement>("#todo-input")!;
const addBtn = document.querySelector<HTMLButtonElement>("#add-btn")!;
const list = document.querySelector<HTMLUListElement>("#todo-list")!;

addBtn.addEventListener("click", () => {
  const attività = input.value.trim();
  if (attività === "") return;

  const nuova: Todo = {
    id: Date.now(),
    attività,
    completata: false,
  };

  todos.push(nuova);
  input.value = "";
  salva();
  renderTodos();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});

//funzione che renderizza la lista di cose da fare ogni volta che aggiungo, modifico e cancello 

function renderTodos() {
  list.innerHTML = "";

  const daMostrare = todos.filter((t) => {
    if (filtroCorrente === "DaFare") return !t.completata;
    if (filtroCorrente === "Completate") return t.completata;
    return true;
  });

  for (const todo of daMostrare) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completata;
    checkbox.addEventListener("change", () => {
      todo.completata = checkbox.checked;
      salva();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.attività;
    if (todo.completata) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Elimina";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      salva();
      renderTodos();
    });

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
  }
}


document.querySelector("#filter-all")!.addEventListener("click", () => {
  filtroCorrente = "Tutte";
  renderTodos();
});

document.querySelector("#filter-active")!.addEventListener("click", () => {
  filtroCorrente = "DaFare";
  renderTodos();
});

document.querySelector("#filter-done")!.addEventListener("click", () => {
  filtroCorrente = "Completate";
  renderTodos();
});


function salva() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function carica() {
  const salvati = localStorage.getItem("todos");
  if (salvati) {
    todos = JSON.parse(salvati) as Todo[];
  }
}

carica();
renderTodos();