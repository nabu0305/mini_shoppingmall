"use strict";

function loaditems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".metadata");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
    <li>
        <img src="${item.image}" alt="${item.type}">
        <div class="info">${item.gender},${item.size}</div>
    </li>
    `;
}
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  displayItems(items.filter((item) => item[key] === value));
}
function setEventListener(items) {
  const logo = document.querySelector(".icons");
  const buttons = document.querySelector(".actions");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}
//main
loaditems()
  .then((items) => {
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
