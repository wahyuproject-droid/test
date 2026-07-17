/*
  MIDNIGHT GAMES — KONFIGURASI LINK
  Ganti tiga link di bawah sebelum website dipublikasikan.
*/
const CONFIG = {
  inviteUrl: "https://discord.com/oauth2/authorize?client_id=1516435319359148192&permissions=8&integration_type=0&scope=bot+applications.commands",
  republicUrl: "https://discord.gg/republikmidnight",
  discordUrl: "https://discord.com/users/1126408813042466877",
  instagramUrl: "https://www.instagram.com/itzzz_w4hy?igsh=c2Jnb2RlemF5d3I3",
  popupDelay: 650,
};

const COMMANDS = [
  { command: "mgkim", category: "profile", description: "Buka Kartu Identitas Midnight dan ringkasan profil." },
  { command: "mgdaily", category: "economy", description: "Ambil hadiah ekonomi harian." },
  { command: "mgwork", category: "economy", description: "Bekerja untuk mendapatkan uang Midnight." },
  { command: "mggive @user jumlah", category: "economy", description: "Kirim uang kepada pemain lain." },
  { command: "mgwealth", category: "economy", description: "Lihat total kekayaan dan aset pemain." },
  { command: "mgleaderboard", category: "leaderboard", description: "Lihat peringkat server dan global." },
  { command: "mgslot jumlah", category: "single-player", description: "Main slot menggunakan jumlah taruhan pilihanmu." },
  { command: "mgcoin jumlah h/t", category: "single-player", description: "Main coin flip dengan pilihan head atau tail." },
  { command: "mgbesar jumlah", category: "single-player", description: "Tebak angka besar dengan taruhan." },
  { command: "mgkecil jumlah", category: "single-player", description: "Tebak angka kecil dengan taruhan." },
  { command: "mgmine", category: "mining", description: "Menambang ore dan material untuk koleksi." },
  { command: "mgsuit @user jumlah", category: "multiplayer", description: "Tantang pemain lain dalam suit battle." },
  { command: "mgkartu @user jumlah", category: "multiplayer", description: "Tantang pemain lain dalam card battle." },
  { command: "mgulartangga @user", category: "multiplayer", description: "Main ular tangga interaktif bersama teman." },
  { command: "mgfish", category: "fishing", description: "Memancing ikan menggunakan rod dan bait." },
  { command: "mghunt", category: "hunting", description: "Berburu animal dan mendapatkan loot." },
  { command: "mginv", category: "inventory", description: "Lihat seluruh item di inventory." },
  { command: "mgindex", category: "collection", description: "Buka index koleksi dan status OWNED." },
  { command: "mgshop", category: "economy", description: "Buka toko Midnight Games." },
  { command: "mgbuy item jumlah", category: "economy", description: "Beli item dari shop." },
  { command: "mgsell item jumlah", category: "inventory", description: "Jual item dengan konfirmasi aman." },
  { command: "mgusesilver", category: "gacha", description: "Gunakan Silver Key untuk gacha tahap pertama." },
  { command: "mguseroyal", category: "gacha", description: "Gunakan Royal Token untuk mengejar Void Ticket." },
  { command: "mgusevoid", category: "gacha", description: "Gunakan Void Ticket untuk rarity tertinggi." },
  { command: "mggacha", category: "gacha", description: "Buka pusat gacha Midnight Games." },
  { command: "mgtrade @user", category: "trade", description: "Mulai sesi trade dengan pemain lain." },
  { command: "mgtradeadd item jumlah", category: "trade", description: "Tambahkan item ke sesi trade aktif." },
  { command: "mgtrademoney jumlah", category: "trade", description: "Tambahkan uang ke sesi trade aktif." },
  { command: "mgtradeconfirm", category: "trade", description: "Konfirmasi penawaran dalam sesi trade." },
  { command: "mgtradecancel", category: "trade", description: "Batalkan sesi trade dengan aman." },
  { command: "mghelp", category: "help", description: "Lihat menu bantuan dan seluruh kategori command." },
  { command: "mgtutorial", category: "help", description: "Buka tutorial lengkap Midnight Games." },
  { command: "mgban @user", category: "moderation", description: "Blokir pengguna dari fitur bot sesuai izin staff." },
  { command: "mgunban @user", category: "moderation", description: "Buka blokir pengguna sesuai izin staff." },
];

const CATEGORY_LABELS = {
  profile: "PROFILE",
  economy: "ECONOMY",
  "single-player": "SINGLE PLAYER",
  multiplayer: "MULTIPLAYER",
  fishing: "FISHING",
  mining: "MINING",
  hunting: "HUNTING",
  gacha: "GACHA",
  inventory: "INVENTORY",
  collection: "COLLECTION",
  trade: "TRADE",
  leaderboard: "LEADERBOARD",
  moderation: "MODERATION",
  help: "HELP",
};

const body = document.body;
const header = document.querySelector(".site-header");
const modal = document.getElementById("welcomeModal");
const modalPanel = modal?.querySelector(".welcome-modal");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");
const commandSearch = document.getElementById("commandSearch");
const commandList = document.getElementById("commandList");
const commandCount = document.getElementById("commandCount");

COMMANDS.forEach((item) => {
  const button = document.createElement("button");
  const code = document.createElement("code");
  const description = document.createElement("span");
  const action = document.createElement("b");
  button.className = "command-item";
  button.type = "button";
  button.dataset.category = item.category;
  button.dataset.command = item.command;
  button.setAttribute("aria-label", `Salin command ${item.command}`);
  code.textContent = item.command;
  description.textContent = `${CATEGORY_LABELS[item.category]} // ${item.description}`;
  action.textContent = "COPY";
  button.append(code, description, action);
  commandList?.append(button);
});

const commandItems = [...document.querySelectorAll(".command-item")];
const commandTabs = [...document.querySelectorAll(".command-tabs button")];
const emptyCommand = document.querySelector(".empty-command");
const toast = document.querySelector(".toast");
const toastText = toast?.querySelector("p");
let activeCommandFilter = "all";
let previousFocus;
let toastTimer;

function showToast(message) {
  if (!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4100);
}

function isDiscordInvite(url) {
  return /^https:\/\/discord\.com\/(oauth2\/authorize|api\/oauth2\/authorize)/i.test(url);
}

function handleInvite(event) {
  event.preventDefault();
  if (!isDiscordInvite(CONFIG.inviteUrl)) {
    showToast("LINK_ERROR // Ganti inviteUrl pada CONFIG di file script.js.");
    return;
  }
  window.open(CONFIG.inviteUrl, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".js-invite").forEach((link) => {
  link.href = isDiscordInvite(CONFIG.inviteUrl) ? CONFIG.inviteUrl : "#";
  link.addEventListener("click", handleInvite);
});

document.querySelectorAll(".js-republic").forEach((link) => {
  const configured = /^https?:\/\//i.test(CONFIG.republicUrl) && !CONFIG.republicUrl.startsWith("GANTI_");
  link.href = configured ? CONFIG.republicUrl : "#";
  if (configured) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("LINK_ERROR // Ganti republicUrl untuk mengaktifkan Server Republik Midnight.");
    });
  }
});

document.querySelectorAll(".js-social").forEach((link) => {
  const social = link.dataset.social;
  const url = social === "discord" ? CONFIG.discordUrl : CONFIG.instagramUrl;
  const label = social === "discord" ? "Discord" : "Instagram";
  const configured = /^https?:\/\//i.test(url) && !url.startsWith("GANTI_");
  link.href = configured ? url : "#";
  if (configured) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast(`LINK_ERROR // Ganti ${social}Url untuk mengaktifkan ${label}.`);
    });
  }
});

function openModal() {
  if (!modal) return;
  previousFocus = document.activeElement;
  modal.hidden = false;
  body.classList.add("modal-open");
  requestAnimationFrame(() => {
    modal.classList.add("is-visible");
    modalPanel?.focus();
  });
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-visible");
  body.classList.remove("modal-open");
  window.setTimeout(() => {
    modal.hidden = true;
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  }, 220);
}

window.addEventListener("load", () => window.setTimeout(openModal, CONFIG.popupDelay));
modal?.querySelectorAll(".modal-close, .modal-later").forEach((button) => button.addEventListener("click", closeModal));
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

function toggleMenu(force) {
  if (!mainNav || !menuToggle) return;
  const shouldOpen = typeof force === "boolean" ? force : !mainNav?.classList.contains("open");
  mainNav.classList.toggle("open", shouldOpen);
  menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  menuToggle.setAttribute("aria-label", shouldOpen ? "Tutup menu" : "Buka menu");
}

menuToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMenu();
});
mainNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleMenu(false)));
document.addEventListener("click", (event) => {
  if (mainNav?.classList.contains("open") && !header?.contains(event.target)) toggleMenu(false);
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 1130) toggleMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modal && !modal.hidden) closeModal();
    toggleMenu(false);
  }
  if (event.key === "/" && document.activeElement !== commandSearch && modal?.hidden) {
    event.preventDefault();
    commandSearch?.focus();
  }
  if (event.key === "Tab" && modal && !modal.hidden) {
    const focusable = [...modal.querySelectorAll("a[href], button:not([disabled]), [tabindex='0']")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

function filterCommands() {
  const query = commandSearch?.value.trim().toLowerCase() || "";
  let visibleCount = 0;
  commandItems.forEach((item) => {
    const categoryMatches = activeCommandFilter === "all" || item.dataset.category === activeCommandFilter;
    const queryMatches = !query || item.textContent.toLowerCase().includes(query);
    const visible = categoryMatches && queryMatches;
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  if (emptyCommand) emptyCommand.hidden = visibleCount > 0;
  if (commandCount) commandCount.textContent = `${visibleCount}/${COMMANDS.length} COMMANDS`;
}

commandTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeCommandFilter = tab.dataset.filter || "all";
    commandTabs.forEach((button) => button.classList.toggle("active", button === tab));
    filterCommands();
  });
});
commandSearch?.addEventListener("input", filterCommands);

commandItems.forEach((item) => {
  item.addEventListener("click", async () => {
    const command = item.dataset.command || "";
    try {
      await navigator.clipboard.writeText(command);
      showToast(`COPIED // ${command}`);
    } catch {
      showToast(`COMMAND // ${command}`);
    }
  });
});

document.querySelectorAll(".game-menu button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".game-menu button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    showToast(`GAME_SELECTED // ${button.dataset.game?.toUpperCase()}`);
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const statsTarget = document.querySelector(".status-strip");
let statsPlayed = false;
const statsObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting || statsPlayed) return;
  statsPlayed = true;
  document.querySelectorAll("[data-count]").forEach((counter) => {
    const target = Number(counter.dataset.count);
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / 950, 1);
      counter.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString("id-ID");
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });
  statsObserver.disconnect();
}, { threshold: 0.4 });
if (statsTarget) statsObserver.observe(statsTarget);

window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 26), { passive: true });

const cursorBlock = document.querySelector(".cursor-block");
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    if (!cursorBlock) return;
    cursorBlock.style.left = `${event.clientX}px`;
    cursorBlock.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const year = document.getElementById("currentYear");
if (year) year.textContent = new Date().getFullYear();


  // Blokir klik kanan
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  // Blokir shortcut Inspect / View Source
  document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    if (
      event.key === "F12" ||
      (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
      (event.ctrlKey && ["u", "s"].includes(key))
    ) {
      event.preventDefault();
    }
  });
