const BUCKET_ID = 'B9fFv55rTTUKFDGYZN9k4a';
const API_URL = `https://kvdb.io/${BUCKET_ID}/reservas`;

/*
  As imagens atuais vêm do LoremFlickr com palavras-chave por produto.
  Quando quiser trocar por fotos exatas dos itens, preencha o mapa abaixo
  com links manuais, por exemplo de lojas, catálogos ou imagens suas.
*/
// Example:
// const giftImageOverrides = {
//   c1: "https://example.com/your-image.jpg",
// };
const giftImageOverrides = {};

const giftCategories = [
  {
    title: "Utensílios de Cozinha",
    items: [
      { id: "c1", name: "Jogo de pratos", alt: "Conjunto de pratos de mesa", img: "https://loremflickr.com/400/300/stacked,white,plates?lock=101" },
      { id: "c2", name: "Copos de sumo", alt: "Copos de vidro para sumo", img: "https://loremflickr.com/400/300/clear,juice,glasses?lock=102" },
      { id: "c3", name: "Copos de vinho", alt: "Copos de vinho", img: "https://loremflickr.com/400/300/wine,stemware,glass?lock=103" },
      { id: "c4", name: "Copos de champanhe", alt: "Taças de champanhe", img: "https://loremflickr.com/400/300/champagne,flutes,glass?lock=104" },
      { id: "c5", name: "Talheres", alt: "Conjunto de talheres", img: "https://loremflickr.com/400/300/silverware,fork,knife,spoon?lock=105" },
      { id: "c6", name: "Jogo de facas", alt: "Conjunto de facas de cozinha", img: "https://loremflickr.com/400/300/knife,block,kitchen?lock=106" },
      { id: "c7", name: "Chaleira elétrica", alt: "Chaleira elétrica", img: "https://loremflickr.com/400/300/electric,kettle,appliance?lock=107" },
      { id: "c8", name: "Panelas grandes", alt: "Panelas de cozinha", img: "https://loremflickr.com/400/300/cookware,pots,set?lock=108" },
      { id: "c9", name: "Liquidificador", alt: "Liquidificador de cozinha", img: "https://loremflickr.com/400/300/countertop,blender,kitchen?lock=109" },
      { id: "c10", name: "Frigideira", alt: "Frigideira antiaderente", img: "https://loremflickr.com/400/300/frying,pan,nonstick?lock=110" },
      { id: "c11", name: "Conchas", alt: "Conjunto de conchas e utensílios de cozinha", img: "https://loremflickr.com/400/300/kitchen,utensils,ladle?lock=111" },
      { id: "c12", name: "Pirex de assados", alt: "Assadeira de vidro", img: "https://loremflickr.com/400/300/glass,baking,dish?lock=112" },
      { id: "c13", name: "Air fryer", alt: "Fritadeira elétrica sem óleo", img: "https://loremflickr.com/400/300/air,fryer,appliance?lock=113" },
      { id: "c14", name: "Torradeira", alt: "Torradeira elétrica", img: "https://loremflickr.com/400/300/toaster,appliance,kitchen?lock=114" },
      { id: "c15", name: "Espremedor de frutas", alt: "Espremedor de citrinos", img: "https://loremflickr.com/400/300/citrus,juicer,appliance?lock=115" },
      { id: "c16", name: "Tábua de cortes", alt: "Tábua de corte de madeira", img: "https://loremflickr.com/400/300/wooden,cutting,board?lock=116" },
      { id: "c17", name: "Potes de armazenamento", alt: "Potes para armazenamento de alimentos", img: "https://loremflickr.com/400/300/food,storage,containers?lock=117" },
      { id: "c18", name: "Formas de bolo", alt: "Formas de forno e bolo", img: "https://loremflickr.com/400/300/baking,pans,metal?lock=118" },
      { id: "c19", name: "Grelha de assados", alt: "Grelha para assados", img: "https://loremflickr.com/400/300/roasting,rack,oven?lock=119" }
    ]
  },
  {
    title: "Móveis e Organização",
    items: [
      { id: "m1", name: "Cadeira dobrável", alt: "Cadeira dobrável", img: "https://loremflickr.com/400/300/folding,chair,foldable?lock=201" },
      { id: "m2", name: "Mesa dobrável", alt: "Mesa dobrável", img: "https://loremflickr.com/400/300/folding,table,foldable?lock=202" },
      { id: "m3", name: "Armário de louça", alt: "Armário para louça", img: "https://loremflickr.com/400/300/china,cabinet,kitchen?lock=203" },
      { id: "m4", name: "Estantes organizadoras", alt: "Estantes organizadoras", img: "https://loremflickr.com/400/300/storage,shelves,organizer?lock=204" }
    ]
  },
  {
    title: "Materiais de construção",
    items: [
      { id: "b1", name: "Ferro", alt: "Vergas de ferro", img: "https://loremflickr.com/400/300/steel,rebar,construction?lock=301" },
      { id: "b2", name: "Cimento", alt: "Sacos de cimento", img: "https://loremflickr.com/400/300/cement,bags,construction?lock=302" },
      { id: "b3", name: "Tinta", alt: "Tinta em balde", img: "https://loremflickr.com/400/300/paint,bucket,house?lock=303" },
      { id: "b4", name: "Blocos", alt: "Blocos de construção", img: "https://loremflickr.com/400/300/concrete,blocks,construction?lock=304" }
    ]
  },
  {
    title: "Têxteis e Decoração",
    items: [
      { id: "t1", name: "Toalhas de banho", alt: "Toalhas de banho dobradas", img: "https://loremflickr.com/400/300/bath,towels,folded?lock=401" },
      { id: "t2", name: "Toalhas de mesa", alt: "Toalha de mesa", img: "https://loremflickr.com/400/300/tablecloth,dining,table?lock=402" },
      { id: "t3", name: "Edredon", alt: "Edredon de cama", img: "https://loremflickr.com/400/300/comforter,bed,quilt?lock=403" },
      { id: "t4", name: "Cortinas", alt: "Cortina para janela", img: "https://loremflickr.com/400/300/window,curtain,drapes?lock=404" },
      { id: "t5", name: "Quadros de decoração", alt: "Quadros decorativos", img: "https://loremflickr.com/400/300/wall,frames,art?lock=405" },
      { id: "t6", name: "Vasos de decoração", alt: "Vaso decorativo", img: "https://loremflickr.com/400/300/ceramic,vase,decor?lock=406" },
      { id: "t7", name: "Tapetes", alt: "Tapete decorativo", img: "https://loremflickr.com/400/300/area,rug,carpet?lock=407" },
      { id: "t8", name: "Espelho", alt: "Espelho de parede", img: "https://loremflickr.com/400/300/wall,mirror,home?lock=408" },
      { id: "t9", name: "Almofadas", alt: "Almofadas decorativas", img: "https://loremflickr.com/400/300/decorative,pillows,cushions?lock=409" }
    ]
  }
];

let state = {};
let pendingReservation = null;

function getGiftImage(item) {
  return giftImageOverrides[item.id] || item.img;
}

function findGiftById(id) {
  for (const category of giftCategories) {
    const item = category.items.find((gift) => gift.id === id);
    if (item) return item;
  }
  return null;
}

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

async function saveState() {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  });
}

function ensureConfirmationModal() {
  let modal = document.getElementById("gift-confirmation-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "gift-confirmation-modal";
  modal.style.cssText = [
    "position: fixed",
    "inset: 0",
    "display: none",
    "align-items: center",
    "justify-content: center",
    "padding: 1rem",
    "background: rgba(34, 22, 15, 0.55)",
    "z-index: 9999"
  ].join(";");

  modal.innerHTML = `
    <div style="width: min(100%, 360px); background: #fffdf9; border: 1px solid rgba(83, 61, 46, 0.14); border-radius: 16px; box-shadow: 0 24px 60px rgba(34, 22, 15, 0.24); padding: 1.1rem 1rem 1rem; font-family: Manrope, sans-serif;">
      <p id="gift-confirmation-kicker" style="margin: 0 0 0.35rem; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: #8c6a4f;">Confirmar ação</p>
      <h3 id="gift-confirmation-title" style="margin: 0; font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; line-height: 1; color: #33261d;">Título</h3>
      <p id="gift-confirmation-message" style="margin: 0.8rem 0 1.2rem; color: rgba(51, 38, 29, 0.72); line-height: 1.55;">Mensagem</p>
      <div style="display: flex; gap: 0.6rem; justify-content: flex-end;">
        <button id="gift-confirmation-cancel" type="button" style="border: 1px solid rgba(83, 61, 46, 0.14); background: transparent; color: #33261d; border-radius: 10px; padding: 0.72rem 0.95rem; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.72rem;">Cancelar</button>
        <button id="gift-confirmation-accept" type="button" style="border: 1px solid #5d3f2a; background: #5d3f2a; color: #fffdf9; border-radius: 10px; padding: 0.72rem 0.95rem; cursor: pointer; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.72rem;">Confirmar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeConfirmationModal();
    }
  });

  document.getElementById("gift-confirmation-cancel").addEventListener("click", closeConfirmationModal);
  document.getElementById("gift-confirmation-accept").addEventListener("click", confirmPendingReservation);

  return modal;
}

function openConfirmationModal(type, id) {
  const gift = findGiftById(id);
  pendingReservation = { type, id };

  const modal = ensureConfirmationModal();
  const title = document.getElementById("gift-confirmation-title");
  const message = document.getElementById("gift-confirmation-message");
  const accept = document.getElementById("gift-confirmation-accept");

  if (type === "reserve") {
    title.textContent = "Oferecer presente";
    message.textContent = `Quer oferecer "${gift?.name || "este presente"}"? Se confirmar, o item ficará reservado para si.`;
    accept.textContent = "Oferecer";
  } else {
    title.textContent = "Desfazer reserva";
    message.textContent = `Quer desfazer a reserva de "${gift?.name || "este presente"}"? Se confirmar, o item volta a ficar disponível.`;
    accept.textContent = "Desfazer";
  }

  modal.style.display = "flex";
}

function closeConfirmationModal() {
  const modal = document.getElementById("gift-confirmation-modal");
  if (modal) {
    modal.style.display = "none";
  }
  pendingReservation = null;
}

async function confirmPendingReservation() {
  if (!pendingReservation) return;

  const { type, id } = pendingReservation;

  if (type === "reserve") {
    state[id] = true;
    renderGifts();

    try {
      await saveState();
    } catch (e) {
      console.error("Erro ao guardar reserva", e);
      alert("Houve um erro ao tentar reservar o presente. Verifique a sua ligação.");
      state[id] = false;
      renderGifts();
    }
  }

  if (type === "unreserve") {
    state[id] = false;
    renderGifts();

    try {
      await saveState();
    } catch (e) {
      console.error("Erro ao remover reserva", e);
      alert("Houve um erro ao tentar desfazer a reserva. Verifique a sua ligação.");
      state[id] = true;
      renderGifts();
    }
  }

  closeConfirmationModal();
}

function reserveGift(id) {
  openConfirmationModal("reserve", id);
}

function unreserveGift(id) {
  openConfirmationModal("unreserve", id);
}

function renderGifts() {
  const container = document.getElementById("gifts-container");
  if (!container) return;

  container.innerHTML = "";

  giftCategories.forEach((category) => {
    const catSection = document.createElement("div");
    catSection.className = "gift-category-section";
    catSection.style.marginBottom = "4rem";

    const catTitle = document.createElement("h3");
    catTitle.innerText = category.title;
    catTitle.className = "gift-category-title";
    catSection.appendChild(catTitle);

    const grid = document.createElement("div");
    grid.className = "gifts-grid";

    category.items.forEach((item) => {
      const isReserved = state[item.id] === true;

      const card = document.createElement("article");
      card.className = "gift-card";
      if (isReserved) {
        card.classList.add("is-reserved");
      }

      card.innerHTML = `
        <div class="gift-image">
          <img src="${getGiftImage(item)}" alt="${item.alt || item.name}" loading="lazy" />
        </div>
        <div class="gift-content">
          <h4>${item.name}</h4>
          <button
            type="button"
            class="${isReserved ? "secondary-link btn-unreserve" : "primary-link btn-offer"}"
            data-id="${item.id}"
          >
            ${isReserved ? "Desfazer" : "Oferecer"}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    catSection.appendChild(grid);
    container.appendChild(catSection);
  });

  document.querySelectorAll(".btn-offer").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      reserveGift(id);
    });
  });

  document.querySelectorAll(".btn-unreserve").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      unreserveGift(id);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadState);
