"use strict";

const addCarForm = document.querySelector("#addCar");
const searchCarForm = document.querySelector("#searchCar");

const cars = [];

// Car class.

class Car {
  constructor(license, maker, model, year, owner, price, color) {
    this.license = license;
    this.maker = maker;
    this.model = model;
    this.year = parseInt(year);
    this.owner = owner;
    this.price = parseFloat(price);
    this.color = color;
  }

  //   Calculating the car age
  getCarAge() {
    const currentYear = new Date().getFullYear();
    // console.log(currentYear);
    return currentYear - this.year;
  }

  //   Calculating discount price
  getDiscountPrice() {
    return this.getCarAge() > 10 ? this.price * 0.85 : this.price;
  }

  //   Checking if it is eligible for discount
  isEligibleForDiscount() {
    return this.getCarAge() > 10;
  }
}

// User input for car details.
const addCar = (e) => {
  e.preventDefault();

  try {
    const license = document.querySelector("#license").value.trim();
    const maker = document.querySelector("#maker").value.trim();
    const model = document.querySelector("#model").value.trim();
    const year = parseInt(document.querySelector("#year").value.trim());
    const owner = document.querySelector("#owner").value.trim();
    const price = parseFloat(document.querySelector("#price").value.trim());
    const color = document.querySelector("#color").value.trim();
    const currentYear = new Date().getFullYear();

    // Error handling

    // This if statement below handles the error for empty inputs!
    if (
      !license ||
      !maker ||
      !model ||
      isNaN(year) ||
      !owner ||
      isNaN(price) ||
      !color
    ) {
      throw new Error("All fields are required and must be valid!");
    }

    // This if statement below handles the error for negative price input!
    if (price <= 0) {
      throw new Error("Price must be a positive number.");
    }

    // This if statement below handles the error wrong year input!
    if (year < 1886 || year > currentYear) {
      throw new Error(`Year must be between 1886 and ${currentYear}`);
    }

    const newCar = new Car(license, maker, model, year, owner, price, color);

    // Reset the input form
    addCarForm.reset();

    //   Storing information in newCar array.
    cars.push(newCar);

    // Calling displayTable() function to show data to the cars table
    displayTable();
  } catch (error) {
    alert(error.message);
  }
};

// Display car information
const displayTable = () => {
  const table = document.querySelector("#carsTable");

  table.innerHTML = table.rows[0].innerHTML;

  cars.forEach((car) => {
    const row = table.insertRow(-1);

    const { license, maker, model, owner, year, color, price } = car;

    const carDetails = [license, maker, model, owner, year, color];

    carDetails.forEach((detail) => {
      row.insertCell(-1).textContent = detail ?? "N/A";
    });

    row.insertCell(-1).textContent = `€${price.toFixed(2)}`;

    const discountedPrice = car.isEligibleForDiscount()
      ? `€${car.getDiscountPrice().toFixed(2)}`
      : "No Discount";
    row.insertCell(-1).textContent = discountedPrice;
  });
};

// Search for a car by license plate
const searchCar = (e) => {
  e.preventDefault();

  const searchInput = document.getElementById("search").value.trim();
  //   console.log(searchInput);
  const found = cars.find(
    (car) => car.license.toLowerCase() === searchInput.toLowerCase()
  );

  const searchResult = document.getElementById("searchResult");

  if (found) {
    const originalPrice = found.price.toFixed(2);
    const discountedPrice = found.isEligibleForDiscount()
      ? `€${found.getDiscountPrice().toFixed(2)}`
      : "No Discount";

    searchResult.innerHTML = `
        <p>Maker: ${found.maker}</p>
        <p>Model: ${found.model}</p>
        <p>Year: ${found.year}</p>
        <p>Owner: ${found.owner}</p>
        <p>Original Price: €${originalPrice}</p>
        <p>Discounted Price: ${discountedPrice}</p>
        <p>Color: ${found.color}</p>  
    `;
  } else {
    searchResult.innerHTML = "<p> No car found!</p>";
  }
};

// Calling addEventListener for button.
addCarForm.addEventListener("submit", addCar);
searchCarForm.addEventListener("submit", searchCar);
