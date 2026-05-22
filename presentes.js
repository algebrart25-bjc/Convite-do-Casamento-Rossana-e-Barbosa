const BUCKET_ID = 'B9fFv55rTTUKFDGYZN9k4a';
const API_URL = `https://kvdb.io/${BUCKET_ID}/reservas`;

const giftCategories = [
  {
    title: "Utensílios de Cozinha",
    items: [
      { id: "c1", name: "Jogo de pratos", img: "https://loremflickr.com/400/300/plates,kitchen" },
      { id: "c2", name: "Copos de sumo", img: "https://loremflickr.com/400/300/juice,glass" },
      { id: "c3", name: "Copos de vinho", img: "https://loremflickr.com/400/300/wineglass" },
      { id: "c4", name: "Copos de champanhe", img: "https://loremflickr.com/400/300/champagne,glass" },
      { id: "c5", name: "Talheres", img: "https://loremflickr.com/400/300/cutlery" },
      { id: "c6", name: "Jogo de facas", img: "https://loremflickr.com/400/300/knives,kitchen" },
      { id: "c7", name: "Chaleira elétrica", img: "https://loremflickr.com/400/300/kettle" },
      { id: "c8", name: "Panelas grandes", img: "https://loremflickr.com/400/300/pots,pans" },
      { id: "c9", name: "Liquidificador", img: "https://loremflickr.com/400/300/blender" },
      { id: "c10", name: "Frigideira", img: "https://loremflickr.com/400/300/frying,pan" },
      { id: "c11", name: "Conchas", img: "https://loremflickr.com/400/300/ladle,kitchen" },
      { id: "c12", name: "Pirex de assados", img: "https://loremflickr.com/400/300/baking,dish" },
      { id: "c13", name: "Air fryer", img: "https://loremflickr.com/400/300/airfryer" },
      { id: "c14", name: "Torradeira", img: "https://loremflickr.com/400/300/toaster" },
      { id: "c15", name: "Espremedor de frutas", img: "https://loremflickr.com/400/300/juicer" },
      { id: "c16", name: "Tábua de cortes", img: "https://loremflickr.com/400/300/cuttingboard" },
      { id: "c17", name: "Potes de armazenamento", img: "https://loremflickr.com/400/300/tupperware" },
      { id: "c18", name: "Formas de bolo", img: "https://loremflickr.com/400/300/cake,pan" },
      { id: "c19", name: "Grelha de assados", img: "https://loremflickr.com/400/300/grill" },
    ]
  },
  {
    title: "Móveis e Organização",
    items: [
      { id: "m1", name: "Cadeiras", img: "https://loremflickr.com/400/300/chairs" },
      { id: "m2", name: "Mesa dobrável ou de vidro", img: "https://loremflickr.com/400/300/folding,table" },
      { id: "m3", name: "Estante de louça", img: "https://loremflickr.com/400/300/dish,rack" },
      { id: "m4", name: "Estantes organizadoras", img: "https://loremflickr.com/400/300/shelves" }
    ]
  },
  {
    title: "Materiais de construção",
    items: [
      { id: "b1", name: "Ferro", img: "https://loremflickr.com/400/300/steel,rebar" },
      { id: "b2", name: "Cimento", img: "https://loremflickr.com/400/300/cement,bags" },
      { id: "b3", name: "Tinta", img: "https://loremflickr.com/400/300/paint,bucket" },
      { id: "b4", name: "Blocos", img: "https://loremflickr.com/400/300/concrete,blocks" }
    ]
  },
  {
    title: "Têxteis e Decoração",
    items: [
      { id: "t1", name: "Toalhas de banho", img: "https://loremflickr.com/400/300/bath,towels" },
      { id: "t2", name: "Toalhas de mesa", img: "https://loremflickr.com/400/300/tablecloth" },
      { id: "t3", name: "Edredon", img: "https://loremflickr.com/400/300/duvet" },
      { id: "t4", name: "Cortinas", img: "https://loremflickr.com/400/300/curtains" },
      { id: "t5", name: "Quadros de decoração", img: "https://loremflickr.com/400/300/wall,art" },
      { id: "t6", name: "Vasos de decoração", img: "https://loremflickr.com/400/300/decorative,vase" },
      { id: "t7", name: "Tapetes", img: "https://loremflickr.com/400/300/rug" },
      { id: "t8", name: "Espelho", img: "https://loremflickr.com/400/300/mirror" },
      { id: "t9", name: "Almofadas", img: "https://loremflickr.com/400/300/pillows" }
    ]
  }
];

let state = {};

async function loadState() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      state = await response.json();
    }
  } catch (e) {
    console.error("Erro ao carregar estado", e);
  }
  renderGifts();
}

async function reserveGift(id) {
  state[id] = true;
  renderGifts(); // Update immediately optimistically

  try {
    await fetch(API_URL, {
      method: 'POST', // or PATCH or PUT depending on KVDB setup, typically POST updates/creates the key
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    });
  } catch (e) {
    console.error("Erro ao guardar reserva", e);
    alert("Houve um erro ao tentar reservar o presente. Verifique a sua ligação.");
    // Revert state if failed
    state[id] = false;
    renderGifts();
  }
}

function renderGifts() {
  const container = document.getElementById("gifts-container");
  if (!container) return;
  
  container.innerHTML = "";

  giftCategories.forEach(category => {
    // Create category section
    const catSection = document.createElement("div");
    catSection.className = "gift-category-section";
    catSection.style.marginBottom = "4rem";

    const catTitle = document.createElement("h3");
    catTitle.innerText = category.title;
    catTitle.className = "gift-category-title";
    catSection.appendChild(catTitle);

    const grid = document.createElement("div");
    grid.className = "gifts-grid";
    
    category.items.forEach(item => {
      const isReserved = state[item.id] === true;

      const card = document.createElement("article");
      card.className = "gift-card";
      if (isReserved) {
        card.classList.add("is-reserved");
      }

      card.innerHTML = `
        <div class="gift-image" style="background-image: url('${item.img}')"></div>
        <div class="gift-content">
          <h4>${item.name}</h4>
          <button class="${isReserved ? 'secondary-link disabled' : 'primary-link btn-offer'}" 
                  ${isReserved ? 'disabled' : ''} 
                  data-id="${item.id}">
            ${isReserved ? 'Já Reservado' : 'Oferecer'}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    catSection.appendChild(grid);
    container.appendChild(catSection);
  });

  // Attach event listeners
  document.querySelectorAll(".btn-offer").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      reserveGift(id);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadState);
