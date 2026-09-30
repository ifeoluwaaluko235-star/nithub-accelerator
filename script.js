// ==========================================
// API CONFIGURATION
// ==========================================
const CONFIG = {
  BENEFITS_API: "https://nithub-backend-eg0tsg82o.vercel.app/api/program-benefits",
  TIMELINE_API: "https://nithub-backend.vercel.app/api/timeline"
};

// Local image paths for program benefits
const LOCAL_BENEFIT_IMAGES = [
  "Images/Depth 9, Frame 0.svg",
  "Images/Depth 9, Frame 0 (1).svg",
  "Images/Depth 8, Frame 0.svg",
  "Images/Depth 9, Frame 0 (2).svg",
  "Images/Depth 9, Frame 0 (3).svg",
  "Images/Depth 9, Frame 0 (4).svg"
];

// Backend hosted image URLs for timeline items
const BACKEND_TIMELINE_IMAGES = [
  "https://nithub-backend.vercel.app/images/applicationOpen.svg",
  "https://nithub-backend.vercel.app/images/Application_close.png",
  "https://nithub-backend.vercel.app/images/selection%20interview.svg",
  "https://nithub-backend.vercel.app/images/program_start.png"
];



// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initProgramBenefits();
  initTimeline();
});

// ==========================================
// 1. PROGRAM BENEFITS SECTION
// ==========================================
async function initProgramBenefits() {
  const container = document.getElementById("programBenefits");
  if (!container) return;

  try {
    const response = await fetch(CONFIG.BENEFITS_API);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    const benefitsList = Array.isArray(data) ? data : (data.benefits || data.data || FALLBACKS.benefits);
    
    renderBenefits(container, benefitsList);
  } catch (error) {
    console.warn("Benefits API failed. Loading fallback data:", error);
    renderBenefits(container, FALLBACKS.benefits);
  }
}

function renderBenefits(container, items) {
  container.innerHTML = "";

  items.forEach((item, index) => {
    const box = document.createElement("div");
    box.classList.add("boxes");

    const headingClass = index % 2 === 0 ? "myH4A" : "myH4B";
    const title = item.title || item.name || item.heading || "";
    const description = item.description || item.body || item.details || "";

    // Uses local image folder mapped by index
    const icon = LOCAL_BENEFIT_IMAGES[index] || LOCAL_BENEFIT_IMAGES[0];

    box.innerHTML = `
      <img src="${icon}" alt="${title}">
      <h4 class="${headingClass}">${title}</h4>
      <p class="myP4">${description}</p>
    `;

    container.appendChild(box);
  });
}

// ==========================================
// 2. TIMELINE SECTION
// ==========================================
async function initTimeline() {
  const container = document.getElementById("timelineContainer");
  if (!container) return;

  try {
    const response = await fetch(CONFIG.TIMELINE_API);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    const timelineList = Array.isArray(data) ? data : (data.timeline || data.data || FALLBACKS.timeline);

    renderTimeline(container, timelineList);
  } catch (error) {
    console.warn("Timeline API failed. Loading fallback data:", error);
    renderTimeline(container, FALLBACKS.timeline);
  }
}

function renderTimeline(container, items) {
  container.innerHTML = "";

  items.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("Items");

    const title = item.title || item.name || item.event || "";
    const date = item.date || item.time || item.startDate || "";

    // Uses backend URLs for timeline images mapped by index
    const icon = BACKEND_TIMELINE_IMAGES[index] || BACKEND_TIMELINE_IMAGES[0];

    itemElement.innerHTML = `
      <img src="${icon}" alt="${title}" class="TimelineIcon" width="25px">
      <p class="timelineContent">
        ${title} <br>
        <span>${date}</span>
      </p>
    `;

    container.appendChild(itemElement);
  });
}

