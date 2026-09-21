import './style.css'
import type { Filtro } from "./types";
import { aggiungiTodo, impostaFiltro } from "./state";
import { renderTodos } from "./render";

const input = document.querySelector<HTMLInputElement>("#todo-input")!;
const addBtn = document.querySelector<HTMLButtonElement>("#add-btn")!;

function aggiungi() {
  const testo = input.value.trim();
  if (testo === "") return;

  aggiungiTodo(testo);
  input.value = "";
  renderTodos();
}

function collegaFiltro(selettore: string, filtro: Filtro) {
  document.querySelector(selettore)!.addEventListener("click", () => {
    impostaFiltro(filtro);
    renderTodos();
  });
}

addBtn.addEventListener("click", aggiungi);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") aggiungi();
});

collegaFiltro("#filter-all", "tutte");
collegaFiltro("#filter-active", "attive");
collegaFiltro("#filter-done", "completate");

renderTodos();
