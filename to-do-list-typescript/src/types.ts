export interface Todo {
  id: number;
  testo: string;
  completata: boolean;
}

export type Filtro = "tutte" | "attive" | "completate";
