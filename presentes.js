const BUCKET_ID = 'B9fFv55rTTUKFDGYZN9k4a';
const API_URL = `https://kvdb.io/${BUCKET_ID}/reservas`;

// Intervalo de atualização automática (em milissegundos)
const REFRESH_INTERVAL = 5000; // 5 segundos

let refreshTimer = null;

const giftImageOverrides = {};

const giftCategories = [
  {
    title: "Utensílios de Cozinha",
    items: [
      { id: "c1", name: "Jogo de pratos", alt: "Conjunto de pratos de mesa", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/NjFrTDViN0JqeEwuX0FDX1VGODk0XzEwMDBfUUw4MF9fbjhta2g4/template_primary" },
      { id: "c2", name: "Copos de sumo", alt: "Copos de vidro para sumo", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/NzE3MW1FdE1uLUwuX0FDX1VGODk0XzEwMDBfUUw4MF9fY3p2ZmNu/template_primary" },
      { id: "c3", name: "Copos de vinho", alt: "Copos de vinho", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528042/Copo_plastico_conjunto_com_logo_Tritan3_x7qro8.jpg" },
      { id: "c4", name: "Copos de champanhe", alt: "Taças de champanhe", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779527427/pacote-de-champanhe-com-copos-moet-chandon-brut-tampa-impressa_3_ztwvtw.jpg" },
      { id: "c5", name: "Talheres", alt: "Conjunto de talheres", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/V2hhdHNBcHBfSW1hZ2VfMjAyNi0wNS0yM19hdF8xMC41Mi4yMF9jOTVwanE=/template_primary" },
      { id: "c6", name: "Jogo de facas", alt: "Conjunto de facas de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528149/23498032PDM001G_c5nxs6.jpg" },
      { id: "c7", name: "Chaleira elétrica", alt: "Chaleira elétrica", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528205/chaleira-eletrica-select-inox-cafe-ou-chimarrao-af-18s-ambiente_lukzt2.jpg" },
      { id: "c8", name: "Panelas grandes", alt: "Panelas de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528269/1-nm2ev3sd1g_xyrhgj.png" },
      { id: "c9", name: "Liquidificador", alt: "Liquidificador de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528358/Blender_EBL1500_FrontView_Electrolux_1000x1000-1000x1000.raw_cffacq.jpg" },
      { id: "c10", name: "Frigideira", alt: "Frigideira antiaderente", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530491/br-11134207-7r98o-m8f3azhasbn52f_xovyzt.jpg" },
      { id: "c11", name: "Conchas", alt: "Conjunto de conchas e utensílios de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530573/D_Q_NP_645218-MLA99463582216_112025-O_nsogog.webp" },
      { id: "c12", name: "Pirex de assados", alt: "Assadeira de vidro", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530622/5079086_00000_01_xquj52.jpg" },
      { id: "c13", name: "Air fryer", alt: "Fritadeira elétrica sem óleo", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530705/262104_nfneca.png" },
      { id: "c14", name: "Torradeira", alt: "Torradeira elétrica", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530746/7d8776358e091be3f7e98c804cf2f005669a43e3_lld3za.jpg" },
      { id: "c15", name: "Espremedor de frutas", alt: "Espremedor de citrinos", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530945/1446_espremedor-de-frutas-mondial-cozinha-e-10-eletrico-inox-250w_m1_637387199500032283_kv8ctf.webp" },
      { id: "c16", name: "Tábua de cortes", alt: "Tábua de corte de madeira", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779531072/003357-Tabua-Corte-Bamboo-50xmx30cm-1_dxoudd.jpg" },
      { id: "c17", name: "Potes de armazenamento", alt: "Potes para armazenamento de alimentos", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779531174/Caixa-de-pl-stico-Caixa-Armazenamento-Recipiente-De-Armazenamento-De-Alimentos-Claros-Com-Tampa-Cozinha-E_jpg_bfukjh.jpg" },
      { id: "c18", name: "Formas de bolo", alt: "Formas de forno e bolo", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779531249/Conjunto-De-Assadeiras-Formas-Para-Bolo-Em-Aluminio-4-Pecas_esqblh.jpg" },
      { id: "c19", name: "Grelha de assados", alt: "Grelha para assados", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779532270/167111-800-auto_yvwvcm.jpg" },
       { id: "c20", name: "Tostadeira", alt: "Tostadeira elétrica", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530789/tostadeira-eletrica-fatias-triangulares_combqj.jpg" }
    ]
  },
  {
    title: "Móveis e Organização",
    items: [
      { id: "m5", name: "Coluna JBL", alt: "Coluna JBL", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/NzE1Q2VGcC03TkwuX0FDX1VGMTAwMF8xMDAwX1FMODBfX3VucWNxdw==/template_primary" },
      { id: "m1", name: "Cadeiras", alt: "Cadeiras", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/Y2FkZWlyYS1kb2JyYXZlbC1ydXN0aWNhLWNhc3RhbmhvLWRlLW1hZGVpcmEtY29tLWVzdG9mYWRvLWJyYW5jby1tYWdhemluZS1kZWNvci0yX2dmZ3VzdQ==/template_primary" },
      { id: "m2", name: "Mesa dobrável", alt: "Mesa dobrável", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/bWVzYWRvYnJhdmVscG9ydGF0aWx2aXJhbWFsZXRhMTgwbWNhbXBpbmdwcmFpYV8xMDIwNjcwOTJfeXNxN3Zy/template_primary" },
      { id: "m3", name: "Armário de louça", alt: "Armário para louça", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/aW1hZ2VzX2l2aTBlcg==/template_primary" },
      { id: "m4", name: "Estantes organizadoras", alt: "Estantes organizadoras", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/MS1lNTBiYzBjMDk0YzY1NzE0ZTUxNzU3MzU5ODE1MTQyNy0xMDI0LTEwMjRfZnRtbndk/template_primary" }
    ]
  },
  {
    title: "Materiais de construção",
    items: [
      { id: "b1", name: "Ferro", alt: "Vergas de ferro", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/OC0xMi0xMS1tcDRfZXl0bXZ1/template_primary" },
      { id: "b2", name: "Cimento", alt: "Sacos de cimento", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/ZGVwb3NpdHBob3Rvc18xNTg1NTkzOTYtc3RvY2stcGhvdG8tY2VtZW50LWJhZ3Mtc3RhY2stcGFwZXItc2Fja3Nfa2VnY3U5/template_primary" },
      { id: "b3", name: "Tinta", alt: "Tinta em balde", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/YWRpX0MzX0E3X0MzX0Ezby1kZS1waWdtZW50by1wcmV0by10aW50YS1wYXJlZGUtYnJhbmNhLXBhcmEtbWlzdHVyYS1uby1iYWxkZS11dGlsaXphbmRvLXVtLW1pc3R1cmFkb3ItZWxfQzNfQTl0cmljby1hdF9DM19BOS1vYnRlci11bWEtY29yLTIyMDUwNDg5NF9pbmZiNHc=/template_primary" },
      { id: "b4", name: "Blocos", alt: "Blocos de construção", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/cXVhbC1vLW1lbGhvci10aXBvLWRlLXJldmVzdGltZW50by1wYXJhLWJsb2Nvcy1kZS1jb25jcmV0b19qcWNyOWU=/template_primary" }
    ]
  },
  {
    title: "Têxteis e Decoração",
    items: [
      { id: "t1", name: "Toalhas de banho", alt: "Toalhas de banho dobradas", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/MzQ3NTM4LTRfaW9ncnFw/template_primary" },
      { id: "t2", name: "Toalhas de mesa", alt: "Toalha de mesa", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779537806/Toalha-de-Mesa-Quadrada-Avulsa-Jacquard-Medalhao-1-40m-x-1-40m-para-04-Lugares-Decoracao-Cozinha-Moderna-Luxo_91d16c76-bb3e-4d28-bd35-bcee6d9b24a1_jdjhww.webp" },
      { id: "t3", name: "Edredon", alt: "Edredon de cama", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779537851/edredones_800x450_jj1cgn.jpg" },
      { id: "t4", name: "Cortinas", alt: "Cortina para janela", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779537887/CortinadELENZOnaturaldelino_8_xvvtx6.jpg" },
      { id: "t5", name: "Quadros de decoração", alt: "Quadros decorativos", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/cXVhZHJvcy1kZWNvcmF0aXZvcy1ib2hvLWFic3RyYXRvLWZsb3Jlcy1uZXV0cm8tcXVhZHJvcy1mc2EtMjZjMjY0MTA4ZTI4OGM0YWZkMTc0MjU5OTY0ODQ2OTQtMTAyNC0xMDI0X2FoNmJ1aw==/template_primary" },
      { id: "t6", name: "Vasos de decoração", alt: "Vaso decorativo", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/NzFZTlhKZWY4MUwuX0FDX1VGODk0XzEwMDBfUUw4MF9fZ291dTl0/template_primary" },
      { id: "t7", name: "Tapetes", alt: "Tapete decorativo", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/UEU5ODQyNzdfZ2ZqOWtz/template_primary" },
      { id: "t8", name: "Espelho", alt: "Espelho de parede", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/ZXNwZWxob3MtZXNwZWxoby1tb2xkdXJhLWxpc2EtMTcweDcwLS1wLTE2NTYwMTg0MjMxMjBfYjdicXRw/template_primary" },
      { id: "t9", name: "Almofadas", alt: "Almofadas decorativas", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/MzkxZTJjY2QtNTVlMC00ODkxLTllY2QtZTNiODg3OWEyZDE0X2hoeXR2Nw==/template_primary" }
    ]
  },
  {
    title: "Material de Jardinagem",
    items: [
      { id: "j1", name: "Tesoura de Pouda", alt: "Tesoura de poda", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779539435/78331125PDM001G_hahhad.jpg" },
      { id: "j2", name: "Cortador de relva", alt: "Cortador de relva", img: "https://res-console.cloudinary.com/dybll7vsv/thumbnails/transform/v1/image/upload/Y19maWxsLGhfMjAwLHdfMjAw/v1/a3MtYnN0LTQwdl8wMV9lbWh6aXk=/template_primary" },
      { id: "j3", name: "Escadote", alt: "Escadote", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779541027/escadote-aluminio-2x6-degraus-max-300mts_jshvwe.jpg" },
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
      const data = await response.json();
      // Mesclar com o estado atual para não perder reservas locais
      state = { ...state, ...data };
    }
  } catch (e) {
    console.error("Erro ao carregar estado", e);
  }
  renderGifts();
}

// Função para atualizar o estado periodicamente
function startAutoRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  
  refreshTimer = setInterval(async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const newState = await response.json();
        // Verificar se há mudanças no estado
        const hasChanges = JSON.stringify(newState) !== JSON.stringify(state);
        if (hasChanges) {
          state = newState;
          renderGifts();
          console.log("Estado atualizado automaticamente");
        }
      }
    } catch (e) {
      console.error("Erro ao atualizar estado automaticamente", e);
    }
  }, REFRESH_INTERVAL);
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
    title.textContent = "Reservar presente";
    message.textContent = `Quer reservar "${gift?.name || "este presente"}"? Se confirmar, o item ficará reservado para si.`;
    accept.textContent = "Reservar";
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
            ${isReserved ? "Desfazer" : "Reservar"}
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

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  startAutoRefresh();
});
