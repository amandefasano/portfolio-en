// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.onscroll = function () {
    const top = window.scrollY;
    if (top >= 100) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
  const navLinks = document.querySelectorAll(".nav-item");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      new bootstrap.Collapse(menuToggle).toggle();
    });
  });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
  const container = document.querySelector("#skills .container");
  let row = document.createElement("div");
  row.classList.add("row");

  // Load the JSON file
  fetch("data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the JSON data and create HTML elements
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        card.innerHTML = `
                  <a class="skills-link" href="${item.link}">
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.alt}"/>
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                  </a>
                `;

        // Append the card to the container
        appendCard(row, card, index, data, container);
      });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolio .container");
  let row = document.createElement("div");
  row.classList.add("row");
  row.setAttribute("id", "projects");

  // Load the JSON file
  fetch("data/portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the JSON data and create HTML elements
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-4", "mt-4");
        let html = item.text;
        if (html.includes("\n")) html = html.replace(/\n/g, "<br>");
        card.innerHTML = `
                    <div id=${item.id} class="card portfolioContent">
                    <img class="card-img-top" src="images/${item.image}" style="width:100%" alt="${item.alt}">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-text">${html}</p>
                        <div class="div-project-link text-center">
                            <a href="${item.link}" class="link btn btn-success" target="_blank">Découvrez le projet</a>
                        </div>
                    </div>
                </div>
                `;

        // Append the card to the container
        appendCard(row, card, index, data, container);
      });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createExperienceFromJSON() {
  const container = document.querySelector("#experience .container");
  let row = document.createElement("div");
  row.classList.add("row", "row-center");

  // Load the JSON file
  fetch("data/experience.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the JSON data and create HTML elements
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-lg-6", "mt-4");
        let html = item.text;
        if (html.includes("\n")) html = html.replace(/\n/g, "<br>");
        card.innerHTML = `
                    <div id="${item.id}" class="card experienceContent">
                    <img class="card-img-top" src="images/${item.image}" style="width:100%" alt="${item.alt}">
                    <div class="card-body">
                        <h3 class="card-title">${item.title}</h3>
                        <h4 class="card-subtitle">${item.subtitle}</h4>
                        <p class="card-text">${html}</p>
                        <div class="text-center card-link-wrapper">
                            <a href="${item.link}" class="link btn btn-success" target="_blank">Découvrez l'entreprise</a>
                        </div>
                    </div>
                </div>
                `;

        // Append the card to the container
        appendCard(row, card, index, data, container);
      });
    });
}

// Function to append the card to the container. If the index is a multiple of 3 or it's the last element, create a new row.
function appendCard(row, card, index, data, container) {
  row.appendChild(card);

  if ((index + 1) % 3 === 0 || index === data.length - 1) {
    container.appendChild(row);
  }
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createExperienceFromJSON();
createPortfolioFromJSON();
