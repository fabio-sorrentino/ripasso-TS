import type { Atleta, Filtro } from "./types";
import { carica, salva } from "./storage";

// Lo stato vive SOLO in questo file.
// Dagli altri file si modifica esclusivamente con le funzioni esportate.
let atleti: Atleta[] = carica();
let filtroCorrente: Filtro = "tutti";

export function aggiungiAtleta(nome: string, disciplina: string, foto: string): void {
  atleti.push({id:Date.now(), nome,disciplina,foto, inSquadra:false});
  salva(atleti);
  
  // TODO: crea un nuovo Atleta (id univoco, inSquadra: false),
  // aggiungilo all'array e salva.
}

export function eliminaAtleta(id: number): void {
atleti=atleti.filter((a)=>a.id!==id);
salva(atleti);

  // TODO: rimuovi l'atleta con quell'id e salva.
}

export function impostaInSquadra(id: number, inSquadra: boolean): void {
const atleta = atleti.find((a)=> a.id === id);
if(!atleta) return;
atleta.inSquadra = inSquadra;
salva(atleti);

  // TODO: trova l'atleta, aggiorna inSquadra e salva.
}

export function impostaFiltro(filtro: Filtro): void {

  filtroCorrente=filtro;
  // TODO: aggiorna filtroCorrente.
}

export function getAtletiVisibili(): Atleta[] {
return atleti.filter((a)=>{
  if(filtroCorrente==="inSquadra") return !a.inSquadra;
   if(filtroCorrente==="riserve") return !a.inSquadra;
})

  // TODO: restituisci solo gli atleti che rispettano filtroCorrente.
  return [];
}
