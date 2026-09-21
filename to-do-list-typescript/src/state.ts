import type { Filtro, Todo } from "./types";
import { carica, salva } from "./storage";

// Lo stato vive solo qui: dall'esterno si modifica tramite le funzioni esportate.
let todos: Todo[] = carica();
let filtroCorrente: Filtro = "tutte";

export function aggiungiTodo(testo: string): void {
  todos.push({ id: Date.now(), testo, completata: false });
  salva(todos);
}

export function eliminaTodo(id: number): void {
  todos = todos.filter((t) => t.id !== id);
  salva(todos);
}

export function impostaCompletata(id: number, completata: boolean): void {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completata = completata;
  salva(todos);
}

export function impostaFiltro(filtro: Filtro): void {
  filtroCorrente = filtro;
}

export function getTodosVisibili(): Todo[] {
  return todos.filter((t) => {
    if (filtroCorrente === "attive") return !t.completata;
    if (filtroCorrente === "completate") return t.completata;
    return true;
  });
}
