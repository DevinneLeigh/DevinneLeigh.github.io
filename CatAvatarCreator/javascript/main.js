
document.addEventListener("DOMContentLoaded", () => {
  const categories = ["type", "color", "extras", "face", "accessories"];

  const categoryData = {
    type: [
      { id: "solid", preview: "solid_pre.svg", layer: "solid.svg" },
      { id: "stripe", preview: "stripe_pre.svg", layer: "stripe.svg" },
      { id: "spot", preview: "spot_pre.svg", layer: "spot.svg" }, 
      { id: "point", preview: "point_pre.svg", layer: "point.svg" }
    ],
    color: {
      solid: [
        { preview: "color1_pre.svg", layer: "color1.svg" },
        { preview: "color2_pre.svg", layer: "color2.svg" },
        { preview: "color3_pre.svg", layer: "color3.svg" },
        { preview: "color4_pre.svg", layer: "color4.svg" },
        { preview: "color5_pre.svg", layer: "color5.svg" },
        { preview: "color6_pre.svg", layer: "color6.svg" },
      ],
      stripe: [
        { preview: "color1_pre.svg", layer: "color1.svg" },
        { preview: "color2_pre.svg", layer: "color2.svg" },
        { preview: "color3_pre.svg", layer: "color3.svg" },
        { preview: "color4_pre.svg", layer: "color4.svg" },
        { preview: "color5_pre.svg", layer: "color5.svg" },
        { preview: "color6_pre.svg", layer: "color6.svg" },
      ],
      spot: [
        { preview: "color1_pre.svg", layer: "color1.svg" },
        { preview: "color2_pre.svg", layer: "color2.svg" },
        { preview: "color3_pre.svg", layer: "color3.svg" },
        { preview: "color4_pre.svg", layer: "color4.svg" },
        { preview: "color5_pre.svg", layer: "color5.svg" },
        { preview: "color6_pre.svg", layer: "color6.svg" },
      ],
      point: [
        { preview: "color1_pre.svg", layer: "color1.svg" },
        { preview: "color2_pre.svg", layer: "color2.svg" },
        { preview: "color3_pre.svg", layer: "color3.svg" },
        { preview: "color4_pre.svg", layer: "color4.svg" },
        { preview: "color5_pre.svg", layer: "color5.svg" },
        { preview: "color6_pre.svg", layer: "color6.svg" },
      ]
    },
    extras: [
      { preview: "extras1_pre.svg", layer: "extras1.svg" },
      { preview: "extras2_pre.svg", layer: "extras2.svg" },
      { preview: "extras3_pre.svg", layer: "extras3.svg" },
      { preview: "extras4_pre.svg", layer: "extras4.svg" },
      { preview: "extras5_pre.svg", layer: "extras5.svg" },
      { preview: "extras6_pre.svg", layer: "extras6.svg" },
    ],
    face: [
      { preview: "face1_pre.svg", layer: "face1.svg" },
      { preview: "face2_pre.svg", layer: "face2.svg" },
      { preview: "face3_pre.svg", layer: "face3.svg" },
      { preview: "face4_pre.svg", layer: "face4.svg" },
      { preview: "face5_pre.svg", layer: "face5.svg" },
      { preview: "face6_pre.svg", layer: "face6.svg" },
    ],
    accessories: [
      { preview: "coming_soon.svg", layer: "accessories1.svg" },
      { preview: "coming_soon.svg", layer: "accessories2.svg" },
      { preview: "coming_soon.svg", layer: "accessories3.svg" },
    ]
  };

  let currentCategory = "type";
  let optionIndex = 0;
  let currentType = null;

  const optionWrapper = document.querySelector(".options_wrapper");
  const leftArrow = document.querySelector(".left_arrow");
  const rightArrow = document.querySelector(".right_arrow");
  const categoryButtons = document.querySelectorAll(".selection_buttons button");
  const avatarWindow = document.querySelector(".avatar_window");

  const selectedParts = {}; // Track selected part per category

  function updateAvatar() {
    avatarWindow.innerHTML = ""; // Clear all parts

    categories.forEach(cat => {
      const selected = selectedParts[cat];
      if (!selected) return;

      const img = document.createElement("img");
      img.classList.add("layer", `layer-${cat}`);

      if (cat === "color" && selectedParts["type"]) {
        const typeName = selectedParts["type"].replace(".svg", "");
        img.src = `./images/cat_creator/color/${typeName}/${selected}`;
      } else {
        img.src = `./images/cat_creator/${cat}/${selected}`;
      }

      avatarWindow.appendChild(img);
    });
  }

  function loadOptions() {
    optionWrapper.innerHTML = "";

    let options = [];

    if (currentCategory === "color") {
      if (!currentType) {
        optionWrapper.innerHTML = "<p class='info-msg'>Please select a type first.</p>";
        return;
      }
      const typeName = currentType.replace(".svg", "");
      options = categoryData.color[typeName] || [];
    } else {
      options = categoryData[currentCategory] || [];
    }

    const total = options.length;

    // Always show 3 options, wrap around if necessary
    for (let i = 0; i < 3; i++) {
      const optionObj = options[(optionIndex + i) % total];

      const option = document.createElement("div");
      option.classList.add("option");

      const img = document.createElement("img");
      let srcPath;

      if (currentCategory === "color") {
        const typeName = currentType.replace(".svg", "");
        srcPath = `./images/cat_creator/color/${typeName}/${optionObj.preview}`;
      } else {
        srcPath = `./images/cat_creator/${currentCategory}/${optionObj.preview}`;
      }

      img.src = srcPath;
      img.alt = optionObj.layer;
      option.appendChild(img);

      option.addEventListener("click", () => {
        selectedParts[currentCategory] = optionObj.layer;

        if (currentCategory === "type") {
          currentType = optionObj.layer;
          selectedParts["color"] = null; // Reset color on type change
        }

        updateAvatar();
      });

      optionWrapper.appendChild(option);
    }
  }

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active from all buttons
    categoryButtons.forEach(btn => btn.classList.remove("active"));

    // Add active to the clicked button
    button.classList.add("active");

    // Update current category and reload options
    currentCategory = button.dataset.category;
    optionIndex = 0;
    loadOptions();
  });
});

  leftArrow.addEventListener("click", () => {
    let options;

    if (currentCategory === "color" && currentType) {
      const typeName = currentType.replace(".svg", "");
      options = categoryData.color[typeName] || [];
    } else {
      options = categoryData[currentCategory] || [];
    }

    const total = options.length;
    if (total > 0) {
      optionIndex = (optionIndex - 3 + total) % total;
      loadOptions();
    }
  });

  rightArrow.addEventListener("click", () => {
    let options;

    if (currentCategory === "color" && currentType) {
      const typeName = currentType.replace(".svg", "");
      options = categoryData.color[typeName] || [];
    } else {
      options = categoryData[currentCategory] || [];
    }

    const total = options.length;
    if (total > 0) {
      optionIndex = (optionIndex + 3) % total;
      loadOptions();
    }
  });

// INIT on load
currentCategory = "type";
optionIndex = 0;

const defaultType = categoryData.type[0];
selectedParts["type"] = defaultType.layer;
currentType = defaultType.layer;

updateAvatar();
loadOptions();

// Make the Type button active
document.querySelector(`.selection_buttons button[data-category="type"]`)
  ?.classList.add("active");

});

