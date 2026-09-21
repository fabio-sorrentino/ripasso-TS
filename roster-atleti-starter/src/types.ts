export interface Atleta {
  id: number;
  nome: string;
  disciplina: string;
  foto: string; // URL dell'immagine
  inSquadra: boolean;
}

export type Filtro = "tutti" | "inSquadra" | "riserve";
