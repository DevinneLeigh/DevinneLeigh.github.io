



document.addEventListener("DOMContentLoaded", () => {
  const categories = ["type", "color", "face", "extras", "accessories"];

  const categoryData = {
    type: ["solid.svg", "stripe.svg", "spot.svg", "point.svg"],
    color: {
      solid: ["color1.svg", "color2.svg", "color3.svg"],
      stripe: ["color1.svg", "color2.svg", "color3.svg"],
      spot: ["color1.svg", "color2.svg", "color3.svg"],
      point: ["color1.svg", "color2.svg", "color3.svg"]
    },
    face: ["face1.svg", "face2.svg", "face3.svg", "face4.svg"],
    extras: ["extra1.svg", "extra2.svg"],
    accessories: ["hat1.svg", "glasses1.svg", "bow1.svg"]
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

    const visibleOptions = options.slice(optionIndex, optionIndex + 3);

    visibleOptions.forEach(filename => {
      const option = document.createElement("div");
      option.classList.add("option");

      const img = document.createElement("img");
      let srcPath;

      if (currentCategory === "color") {
        const typeName = currentType.replace(".svg", "");
        srcPath = `./images/cat_creator/color/${typeName}/${filename}`;
      } else {
        srcPath = `./images/cat_creator/${currentCategory}/${filename}`;
      }

      img.src = srcPath;
      img.alt = filename;
      option.appendChild(img);

      option.addEventListener("click", () => {
        selectedParts[currentCategory] = filename;

        if (currentCategory === "type") {
          currentType = filename;
          selectedParts["color"] = null; // Reset dependent color
        }

        updateAvatar();
      });

      optionWrapper.appendChild(option);
    });
  }

  // Category button click
  categoryButtons.forEach((button, idx) => {
    button.addEventListener("click", () => {
      currentCategory = categories[idx];
      optionIndex = 0;
      loadOptions();
    });
  });

  // Arrow scroll
  leftArrow.addEventListener("click", () => {
    if (optionIndex > 0) {
      optionIndex -= 1;
      loadOptions();
    }
  });

  rightArrow.addEventListener("click", () => {
    let max;
    if (currentCategory === "color") {
      if (!currentType) return;
      const typeName = currentType.replace(".svg", "");
      max = (categoryData.color[typeName] || []).length - 3;
    } else {
      max = (categoryData[currentCategory] || []).length - 3;
    }

    if (optionIndex < max) {
      optionIndex += 1;
      loadOptions();
    }
  });

  // Init
  loadOptions();
});

