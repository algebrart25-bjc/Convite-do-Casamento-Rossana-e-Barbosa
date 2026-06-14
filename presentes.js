// === Configuração Supabase ===
const SUPABASE_URL = "https://ropmzddzsvyygxbujngn.supabase.co";
const SUPABASE_KEY = "sb_publishable_0DIWDpYl_RwdlU68S-V_Og_a3mqTsCx";
const sbClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Intervalo de actualização automática (em milissegundos)
const REFRESH_INTERVAL = 5000; // 5 segundos
let refreshTimer = null;

const giftImageOverrides = {};

const giftCategories = [
  {
    title: "Utensílios de Cozinha",
    items: [
      { id: "Jogo de pratos", name: "Jogo de pratos", alt: "Conjunto de pratos de mesa", img: "https://res.cloudinary.com/dybll7vsv/image/upload/61kL5b7BjxL._AC_UF894_1000_QL80__n8mkh8" },
      { id: "Copos de sumo", name: "Copos de sumo", alt: "Copos de vidro para sumo", img: "https://res.cloudinary.com/dybll7vsv/image/upload/7171mEtMn-L._AC_UF894_1000_QL80__czvfcn" },
      { id: "Copos de vinho", name: "Copos de vinho", alt: "Copos de vinho", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528042/Copo_plastico_conjunto_com_logo_Tritan3_x7qro8.jpg" },
      { id: "Copos de champanhe", name: "Copos de champanhe", alt: "Taças de champanhe", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779527427/pacote-de-champanhe-com-copos-moet-chandon-brut-tampa-impressa_3_ztwvtw.jpg" },
      { id: "Talheres", name: "Talheres", alt: "Conjunto de talheres", img: "https://res.cloudinary.com/dybll7vsv/image/upload/WhatsApp_Image_2026-05-23_at_10.52.20_c95pjq" },
      { id: "Jogo de facas", name: "Jogo de facas", alt: "Conjunto de facas de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528149/23498032PDM001G_c5nxs6.jpg" },
      { id: "Chaleira elétrica", name: "Chaleira elétrica", alt: "Chaleira elétrica", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528205/chaleira-eletrica-select-inox-cafe-ou-chimarrao-af-18s-ambiente_lukzt2.jpg" },
      { id: "Panelas grandes", name: "Panelas grandes", alt: "Panelas de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528269/1-nm2ev3sd1g_xyrhgj.png" },
      { id: "Liquidificador", name: "Liquidificador", alt: "Liquidificador de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779528358/Blender_EBL1500_FrontView_Electrolux_1000x1000-1000x1000.raw_cffacq.jpg" },
      { id: "Frigideira", name: "Frigideira", alt: "Frigideira antiaderente", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530491/br-11134207-7r98o-m8f3azhasbn52f_xovyzt.jpg" },
      { id: "Conchas", name: "Conchas", alt: "Conjunto de conchas e utensílios de cozinha", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530573/D_Q_NP_645218-MLA99463582216_112025-O_nsogog.webp" },
      { id: "Pirex de assados", name: "Pirex de assados", alt: "Assadeira de vidro", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530622/5079086_00000_01_xquj52.jpg" },
      { id: "Air fryer", name: "Air fryer", alt: "Fritadeira elétrica sem óleo", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530705/262104_nfneca.png" },
      { id: "Torradeira", name: "Torradeira", alt: "Torradeira elétrica", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530746/7d8776358e091be3f7e98c804cf2f005669a43e3_lld3za.jpg" },
      { id: "Espremedor de frutas", name: "Espremedor de frutas", alt: "Espremedor de citrinos", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530945/1446_espremedor-de-frutas-mondial-cozinha-e-10-eletrico-inox-250w_m1_637387199500032283_kv8ctf.webp" },
      { id: "Tábua de cortes", name: "Tábua de cortes", alt: "Tábua de corte de madeira", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779531072/003357-Tabua-Corte-Bamboo-50xmx30cm-1_dxoudd.jpg" },
      { id: "Potes de armazenamento", name: "Potes de armazenamento", alt: "Potes para armazenamento de alimentos", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779531174/Caixa-de-pl-stico-Caixa-Armazenamento-Recipiente-De-Armazenamento-De-Alimentos-Claros-Com-Tampa-Cozinha-E_jpg_bfukjh.jpg" },
      { id: "Formas de bolo", name: "Formas de bolo", alt: "Formas de forno e bolo", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779531249/Conjunto-De-Assadeiras-Formas-Para-Bolo-Em-Aluminio-4-Pecas_esqblh.jpg" },
      { id: "Grelha de assados", name: "Grelha de assados", alt: "Grelha para assados", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779532270/167111-800-auto_yvwvcm.jpg" },
       { id: "Tostadeira", name: "Tostadeira", alt: "Tostadeira elétrica", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779530789/tostadeira-eletrica-fatias-triangulares_combqj.jpg" }
    ]
  },
  {
    title: "Móveis e Organização",
    items: [
      { id: "Coluna JBL", name: "Coluna JBL", alt: "Coluna JBL", img: "https://res.cloudinary.com/dybll7vsv/image/upload/715CeFp-7NL._AC_UF1000_1000_QL80__unqcqw" },
      { id: "Cadeiras", name: "Cadeiras", alt: "Cadeiras", img: "https://res.cloudinary.com/dybll7vsv/image/upload/cadeira-dobravel-rustica-castanho-de-madeira-com-estofado-branco-magazine-decor-2_gfgusu" },
      { id: "Mesa dobrável", name: "Mesa dobrável", alt: "Mesa dobrável", img: "https://res.cloudinary.com/dybll7vsv/image/upload/mesadobravelportatilviramaleta180mcampingpraia_102067092_ysq7vr" },
      { id: "Armário de louça", name: "Armário de louça", alt: "Armário para louça", img: "https://res.cloudinary.com/dybll7vsv/image/upload/images_ivi0er" },
      { id: "Estantes organizadoras", name: "Estantes organizadoras", alt: "Estantes organizadoras", img: "https://res.cloudinary.com/dybll7vsv/image/upload/1-e50bc0c094c65714e517573598151427-1024-1024_ftmnwd" }
    ]
  },
  {
    title: "Materiais de construção",
    items: [
      { id: "Ferro", name: "Ferro", alt: "Vergas de ferro", img: "https://res.cloudinary.com/dybll7vsv/image/upload/8-12-11-mp4_eytmvu" },
      { id: "Cimento", name: "Cimento", alt: "Sacos de cimento", img: "https://res.cloudinary.com/dybll7vsv/image/upload/depositphotos_158559396-stock-photo-cement-bags-stack-paper-sacks_kegcu9" },
      { id: "Tinta", name: "Tinta", alt: "Tinta em balde", img: "https://res.cloudinary.com/dybll7vsv/image/upload/adi_C3_A7_C3_A3o-de-pigmento-preto-tinta-parede-branca-para-mistura-no-balde-utilizando-um-misturador-el_C3_A9trico-at_C3_A9-obter-uma-cor-220504894_infb4w" },
      { id: "Blocos", name: "Blocos", alt: "Blocos de construção", img: "https://res.cloudinary.com/dybll7vsv/image/upload/qual-o-melhor-tipo-de-revestimento-para-blocos-de-concreto_jqcr9e" }
    ]
  },
  {
    title: "Têxteis e Decoração",
    items: [
      { id: "Toalhas de banho", name: "Toalhas de banho", alt: "Toalhas de banho dobradas", img: "https://res.cloudinary.com/dybll7vsv/image/upload/347538-4_iogrqp" },
      { id: "Toalhas de mesa", name: "Toalhas de mesa", alt: "Toalha de mesa", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779537806/Toalha-de-Mesa-Quadrada-Avulsa-Jacquard-Medalhao-1-40m-x-1-40m-para-04-Lugares-Decoracao-Cozinha-Moderna-Luxo_91d16c76-bb3e-4d28-bd35-bcee6d9b24a1_jdjhww.webp" },
      { id: "Edredon", name: "Edredon", alt: "Edredon de cama", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779537851/edredones_800x450_jj1cgn.jpg" },
      { id: "Cortinas", name: "Cortinas", alt: "Cortina para janela", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779537887/CortinadELENZOnaturaldelino_8_xvvtx6.jpg" },
      { id: "Quadros de decoração", name: "Quadros de decoração", alt: "Quadros decorativos", img: "https://res.cloudinary.com/dybll7vsv/image/upload/quadros-decorativos-boho-abstrato-flores-neutro-quadros-fsa-26c264108e288c4afd17425996484694-1024-1024_ah6buk" },
      { id: "Vasos de decoração", name: "Vasos de decoração", alt: "Vaso decorativo", img: "https://res.cloudinary.com/dybll7vsv/image/upload/71YNXJef81L._AC_UF894_1000_QL80__gouu9t" },
      { id: "Tapetes", name: "Tapetes", alt: "Tapete decorativo", img: "https://res.cloudinary.com/dybll7vsv/image/upload/PE984277_gfj9ks" },
      { id: "Espelho", name: "Espelho", alt: "Espelho de parede", img: "https://res.cloudinary.com/dybll7vsv/image/upload/espelhos-espelho-moldura-lisa-170x70--p-1656018423120_b7bqtp" },
      { id: "Almofadas", name: "Almofadas", alt: "Almofadas decorativas", img: "https://res.cloudinary.com/dybll7vsv/image/upload/391e2ccd-55e0-4891-9ecd-e3b8879a2d14_hhytv7" }
    ]
  },
  {
    title: "Material de Jardinagem",
    items: [
      { id: "Tesoura de Pouda", name: "Tesoura de Pouda", alt: "Tesoura de poda", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779539435/78331125PDM001G_hahhad.jpg" },
      { id: "Cortador de relva", name: "Cortador de relva", alt: "Cortador de relva", img: "https://res.cloudinary.com/dybll7vsv/image/upload/ks-bst-40v_01_emhziy" },
      { id: "Escadote", name: "Escadote", alt: "Escadote", img: "https://res.cloudinary.com/dybll7vsv/image/upload/v1779541027/escadote-aluminio-2x6-degraus-max-300mts_jshvwe.jpg" },
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
    const { data, error } = await sbClient.from('reservas').select('presente_id');
    if (error) throw error;
    
    // Converte array de presentes para um mapa de items reservados
    const newState = {};
    if (data) {
      data.forEach(row => {
        newState[row.presente_id] = true;
      });
    }
    state = newState;
  } catch (e) {
    console.error("Erro ao carregar estado do Supabase", e);
  }

  renderGifts();
}

function startAutoRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(async () => {
    await loadState();
  }, REFRESH_INTERVAL);
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
      <p id="gift-confirmation-kicker" style="margin: 0 0 0.35rem; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: #8c6a4f;">Confirmar acção</p>
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
    try {
      const { error } = await sbClient.from('reservas').insert([{ presente_id: id }]);
      
      if (error) {
        // Se houver erro de chave única (ex: 23505 no Postgres), alguém já reservou
        if (error.code === '23505' || error.message.includes('unique')) {
          alert("Lamentamos, mas este presente acabou de ser reservado por outra pessoa!");
        } else {
          throw error;
        }
      } else {
        // Reserva feita com sucesso
        state[id] = true;
      }
    } catch (e) {
      console.error("Erro ao guardar reserva", e);
      alert("Houve um erro ao tentar reservar o presente. Verifique a sua ligação.");
    } finally {
      renderGifts();
    }
  }

  closeConfirmationModal();
}

function reserveGift(id) {
  openConfirmationModal("reserve", id);
}

function renderGifts() {
  const container = document.getElementById("gifts-container");
  if (!container) return;

  container.innerHTML = "";

  let totalItemsAvailable = 0;

  giftCategories.forEach((category) => {
    if (category.items.length === 0) return; 

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
      totalItemsAvailable++;
      const isReserved = state[item.id] === true;
      const card = document.createElement("article");
      card.className = "gift-card";
      if (isReserved) {
        card.classList.add("is-reserved");
      }

      card.innerHTML = `
        <div class="gift-image">
          <img src="${getGiftImage(item)}" alt="${item.alt || item.name}" loading="lazy" ${isReserved ? 'style="opacity: 0.6; filter: grayscale(80%);"' : ''} />
        </div>
        <div class="gift-content">
          <h4>${item.name}</h4>
          <button
            type="button"
            class="${isReserved ? 'secondary-link' : 'primary-link btn-offer'}"
            data-id="${item.id}"
            ${isReserved ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}
          >
            ${isReserved ? 'Reservado' : 'Reservar'}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    catSection.appendChild(grid);
    container.appendChild(catSection);
  });

  if (totalItemsAvailable === 0) {
    container.innerHTML = "<p style='text-align: center; color: var(--foreground-muted);'>De momento não há presentes disponíveis para reserva. Agradecemos o seu gesto!</p>";
  }

  document.querySelectorAll(".btn-offer").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.getAttribute("data-id");
      reserveGift(id);
    });
  });
}

async function initApp() {
  if (!window.supabase) {
    console.error("Supabase JS client não foi carregado a tempo.");
    // Tenta renderizar os presentes mesmo sem base de dados
    renderGifts();
    return;
  }
  
  try {
    await loadState();
    startAutoRefresh();
  } catch (e) {
    console.error("Erro na inicialização:", e);
    // Se falhar a inicialização, ao menos mostra a lista
    renderGifts();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
