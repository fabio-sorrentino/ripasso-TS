import type { Atleta } from "./types";
const CHIAVE = "atleti"
// TODO: scegli una chiave per il localStorage (es. "atleti")

export function salva(atleti: Atleta[]): void {
  localStorage.setItem(CHIAVE, JSON.stringify(atleti));
  // TODO: salva l'array in localStorage (ricorda JSON.stringify)
}


export function carica(): Atleta[] {
  const salvati = localStorage.getItem(CHIAVE);
  return salvati ? (JSON.parse(salvati)as Atleta[]):[];
  // TODO: leggi da localStorage e restituisci l'array.
  // Se non c'e' nulla di salvato, restituisci un array vuoto.
  return [];
}
