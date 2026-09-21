import type { Todo } from "./types";
import { eliminaTodo, getTodosVisibili, impostaCompletata } from "./state";

const list = document.querySelector<HTMLUListElement>("#todo-list")!;

function creaElemento(todo: Todo): HTMLLIElement {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completata;
  checkbox.addEventListener("change", () => {
    impostaCompletata(todo.id, checkbox.checked);
    renderTodos();
  });

  const span = document.createElement("span");
  span.textContent = todo.testo;
  if (todo.completata) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Elimina";
  deleteBtn.addEventListener("click", () => {
    eliminaTodo(todo.id);
    renderTodos();
  });

  li.append(checkbox, span, deleteBtn);
  return li;
}

export function renderTodos(): void {
  list.innerHTML = "";
  for (const todo of getTodosVisibili()) {
    list.appendChild(creaElemento(todo));
  }
}
