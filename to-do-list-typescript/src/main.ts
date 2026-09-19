import './style.css'
import type { Todo } from "./todo";

type Filtro = "tutte" | "attive" | "completate";

// --- Persistenza ---
function salvaTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function caricaTodos(): Todo[] {
  const dati = localStorage.getItem("todos");
  if (dati === null) return [];
  return JSON.parse(dati) as Todo[];
}

// --- Stato ---
let todos: Todo[] = caricaTodos();
let prossimoId = todos.length > 0
  ? Math.max(...todos.map((t) => Number(t.id))) + 1
  : 1;
let filtroCorrente: Filtro = "tutte";

// --- Elementi DOM ---
const input = document.querySelector("#todo-input") as HTMLInputElement;
const button = document.querySelector("#add-btn") as HTMLButtonElement;
const list = document.querySelector("#todo-list") as HTMLUListElement;
const filterAllBtn = document.querySelector("#filter-all") as HTMLButtonElement;
const filterActiveBtn = document.querySelector("#filter-active") as HTMLButtonElement;
const filterCompletedBtn = document.querySelector("#filter-completed") as HTMLButtonElement;

// --- Logica ---
function getTodoFiltrati(): Todo[] {
  if (filtroCorrente === "attive") return todos.filter((t) => !t.completata);
  if (filtroCorrente === "completate") return todos.filter((t) => t.completata);
  return todos;
}

function eliminaTodo(id: string) {
  todos = todos.filter((todo) => todo.id !== id);
  salvaTodos();
  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";

  for (const todo of getTodoFiltrati()) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completata;
    checkbox.addEventListener("change", () => {
      todo.completata = checkbox.checked;
      salvaTodos();
      renderTodos();
    });

    const testoSpan = document.createElement("span");
    testoSpan.textContent = todo.testo;
    if (todo.completata) {
      testoSpan.style.textDecoration = "line-through";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Elimina";
    deleteBtn.addEventListener("click", () => eliminaTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(testoSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }
}

// --- Eventi ---
button.addEventListener("click", () => {
  const testo = input.value;
  if (testo === "") return;

  const nuovoTodo: Todo = {
    id: (prossimoId++).toString(),
    testo: testo,
    completata: false,
  };

  todos.push(nuovoTodo);
  salvaTodos();
  renderTodos();
  input.value = "";
});

filterAllBtn.addEventListener("click", () => {
  filtroCorrente = "tutte";
  renderTodos();
});
filterActiveBtn.addEventListener("click", () => {
  filtroCorrente = "attive";
  renderTodos();
});
filterCompletedBtn.addEventListener("click", () => {
  filtroCorrente = "completate";
  renderTodos();
});

// --- Avvio ---
renderTodos();










// import heroImg from './assets/hero.png'
// import typescriptLogo from './assets/typescript.svg'
// import viteLogo from './assets/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
// <section id="center">
//   <div class="hero">
//     <img src="${heroImg}" class="base" width="170" height="179">
//     <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
//     <img src="${viteLogo}" class="vite" alt="Vite logo" />
//   </div>
//   <div>
//     <h1>Get started</h1>
//     <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
//   </div>
//   <button id="counter" type="button" class="counter"></button>
// </section>

// <div class="ticks"></div>

// <section id="next-steps">
//   <div id="docs">
//     <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
//     <h2>Documentation</h2>
//     <p>Your questions, answered</p>
//     <ul>
//       <li>
//         <a href="https://vite.dev/" target="_blank">
//           <img class="logo" src="${viteLogo}" alt="" />
//           Explore Vite
//         </a>
//       </li>
//       <li>
//         <a href="https://www.typescriptlang.org" target="_blank">
//           <img class="button-icon" src="${typescriptLogo}" alt="">
//           Learn more
//         </a>
//       </li>
//     </ul>
//   </div>
//   <div id="social">
//     <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
//     <h2>Connect with us</h2>
//     <p>Join the Vite community</p>
//     <ul>
//       <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
//       <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
//       <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
//       <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
//     </ul>
//   </div>
// </section>

// <div class="ticks"></div>
// <section id="spacer"></section>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
