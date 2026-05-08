// TravelMate — search + contact form
"use strict";

const destinations = [
  { name: "Maldives", type: "beach",
    image: "https://picsum.photos/seed/maldives-beach/640/420",
    description: "Crystal-clear water and white-sand atolls in the Indian Ocean — the postcard beach you imagine when you close your eyes." },
  { name: "Bondi Beach", type: "beach",
    image: "https://picsum.photos/seed/bondi-beach/640/420",
    description: "Sydney's iconic crescent of golden sand, surf culture, and oceanfront cafés." },
  { name: "Tulum Beach", type: "beach",
    image: "https://picsum.photos/seed/tulum-beach/640/420",
    description: "Caribbean coast, Mayan ruins on the cliffs, and turquoise water that doesn't quit." },
  { name: "Kuta Beach", type: "beach",
    image: "https://picsum.photos/seed/kuta-beach/640/420",
    description: "Bali's surf-school capital — long stretches of beach, sunset bars, and warm waves." },
  { name: "Angkor Wat Temple", type: "temple",
    image: "https://picsum.photos/seed/angkor-temple/640/420",
    description: "The largest religious monument in the world — Cambodia's 12th-century masterpiece at sunrise." },
  { name: "Borobudur Temple", type: "temple",
    image: "https://picsum.photos/seed/borobudur-temple/640/420",
    description: "A 9th-century Mahayana Buddhist temple in Java, terraced like a stone mandala rising from the jungle." },
  { name: "Senso-ji Temple", type: "temple",
    image: "https://picsum.photos/seed/sensoji-temple/640/420",
    description: "Tokyo's oldest temple in Asakusa — a vermilion gate, the smell of incense, and a market street that's been busy since 645 CE." },
  { name: "Wat Pho Temple", type: "temple",
    image: "https://picsum.photos/seed/watpho-temple/640/420",
    description: "Bangkok's Temple of the Reclining Buddha — 46 meters of gilded serenity, plus the original home of Thai massage." },
  { name: "Japan", type: "country",
    image: "https://picsum.photos/seed/japan-country/640/420",
    description: "Mountains, neon cities, ryokan baths, and shinkansen trains — a country that runs on quiet precision and seasonal beauty." },
  { name: "Portugal", type: "country",
    image: "https://picsum.photos/seed/portugal-country/640/420",
    description: "Tiled façades, fado music, and a coastline of fishing villages and surf towns from Porto down to the Algarve." },
  { name: "New Zealand", type: "country",
    image: "https://picsum.photos/seed/newzealand-country/640/420",
    description: "Two islands of fjords, glaciers, vineyards, and trails — small enough to drive, big enough to lose yourself in." },
  { name: "Iceland", type: "country",
    image: "https://picsum.photos/seed/iceland-country/640/420",
    description: "Volcanoes, geothermal lagoons, black-sand beaches, and the northern lights — Earth's geology lab, with very good wool sweaters." },
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("resultsGrid");
  const info = document.getElementById("resultsInfo");
  const input = document.getElementById("searchInput");
  const btnSearch = document.getElementById("searchBtn");
  const btnClear = document.getElementById("clearBtn");

  // Home-page search wiring (only present on index.html)
  if (grid && input && btnSearch && btnClear) {
    function render(list, label) {
      grid.innerHTML = "";
      if (!list.length) {
        info.textContent = `No matches for "${label}"`;
        grid.innerHTML = '<div class="empty">Try a different keyword like "beach", "temple", or "country".</div>';
        return;
      }
      info.textContent = label
        ? `${list.length} result${list.length === 1 ? "" : "s"} for "${label}"`
        : `Showing all ${list.length} destinations`;
      for (const d of list) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${d.image}" alt="${d.name}" loading="lazy" />
          <div class="card-body">
            <span class="card-type type-${d.type}">${d.type}</span>
            <h3>${d.name}</h3>
            <p>${d.description}</p>
          </div>`;
        grid.appendChild(card);
      }
    }
    function search() {
      const q = input.value.trim().toLowerCase();
      if (!q) { render(destinations, ""); return; }
      const matches = destinations.filter((d) =>
        d.type.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q)
      );
      render(matches, q);
    }
    function clearSearch() { input.value = ""; render(destinations, ""); }

    btnSearch.addEventListener("click", search);
    btnClear.addEventListener("click", clearSearch);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") search(); });

    render(destinations, "");
  }

  // Contact-form wiring (only present on contact.html)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (!data.get("name") || !data.get("email") || !data.get("message")) {
        status.textContent = "Please fill in your name, email, and message.";
        status.style.color = "#a02020";
        return;
      }
      status.textContent = "Thanks — we'll be in touch shortly.";
      status.style.color = "#1b6ca8";
      form.reset();
    });
  }
});
