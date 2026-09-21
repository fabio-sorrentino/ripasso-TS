import type { Todo } from "./types";

const CHIAVE = "todos";

export function salva(todos: Todo[]): void {
  localStorage.setItem(CHIAVE, JSON.stringify(todos));
}

export function carica(): Todo[] {
  const salvati = localStorage.getItem(CHIAVE);
  return salvati ? (JSON.parse(salvati) as Todo[]) : [];
}
