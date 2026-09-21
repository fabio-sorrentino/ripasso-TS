import type { Atleta } from "./types";
import { eliminaAtleta, getAtletiVisibili, impostaInSquadra } from "./state";

const container = document.querySelector<HTMLDivElement>("#atleti-list")!;

function creaCard(atleta: Atleta): HTMLElement {
  // TODO: crea un <div class="card"> che contiene:
  //   - <img> con src = atleta.foto e alt = atleta.nome
  //   - <h3> con il nome
  //   - <p> con la disciplina
  //   - una checkbox "In squadra" (al change -> impostaInSquadra + renderAtleti)
  //   - un pulsante "Elimina" (al click -> eliminaAtleta + renderAtleti)
  // Se l'atleta e' in squadra, aggiungi la classe "in-squadra" alla card.
  const card = document.createElement("div");
  card.className = "card";
  const img = document.createElement("img");
  card.className = "img-atleta";
  img.src = atleta.foto;
  img.alt = atleta.nome;

  const h3 = document.createElement("h3");
  h3.textContent = atleta.nome;

  const disciplina = document.createElement("p");
  disciplina.textContent = atleta.disciplina;

  const inSquadra = document.createElement("input");
  inSquadra.type = 'checkbox';
  inSquadra.checked = atleta.inSquadra;
  inSquadra.addEventListener(
    'change', () => {
      impostaInSquadra(atleta.id, inSquadra.checked);
      renderAtleti();
    })
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Elimina";
    deleteBtn.addEventListener("click", () => {
      eliminaAtleta(atleta.id);
      renderAtleti();
    })

    card.append(img,h3,disciplina,inSquadra,deleteBtn);

    return card;
  }

  export function renderAtleti(): void {

    container.innerHTML="";
    for(const atleta of getAtletiVisibili()){
      container.appendChild(creaCard(atleta));
    }
    // TODO: svuota il container e aggiungi una card per ogni atleta visibile.
  }
