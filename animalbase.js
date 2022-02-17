"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
// setting the filter to be *, according to the HTML this is all the animals, so the table starts with this
let filter;

// creating the  prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");
  const filterBtn = document.querySelectorAll("[data-action=filter]");

  // TODO: Add event-listeners to filter and sort buttons
  filterBtn.forEach((btn) => {
    btn.addEventListener("click", buildList);
  });

  loadJSON();
}

function buildList() {
  let filteredAnimals;
  filter = this.dataset.filter;

  if (filter === "cat") {
    filteredAnimals = prepareData(isCat);
  } else if (filter === "dog") {
    filteredAnimals = prepareData(isDog);
  } else if (filter === "*") {
    filteredAnimals = prepareData(all);
  }

  displayList(filteredAnimals);
}

// Filtering function which takes a filtering function as an argument
function prepareData(filterFunction) {
  let filteredAnimals = allAnimals.filter(filterFunction);
  return filteredAnimals;
}

// filtering options
function isCat(animal) {
  if (animal.type === "cat") {
    return true;
  } else {
    return false;
  }
}

function isDog(animal) {
  if (animal.type === "dog") {
    return true;
  } else {
    return false;
  }
}
// create all function
function all() {
  return true;
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
