import { model } from "../js/model.js";
import { display } from "../js/view.js";

// Variable to store the current selected category
let currentCategory = null;

// Event listeners for category buttons
document.getElementById("work").addEventListener("click", () => {
  currentCategory = "work";
  console.log("Selected category: Work");
});

document.getElementById("home").addEventListener("click", () => {
  currentCategory = "home";
  console.log("Selected category: Home");
});

document.getElementById("personal").addEventListener("click", () => {
  currentCategory = "personal";
  console.log("Selected category: Personal");
});

// Handle adding a new item or updating an existing one
document.getElementById("add").addEventListener("click", () => {
  let inputValue = document.getElementById("input").value.trim(); // Get input value
  let index = document.getElementById("input").dataset.index;

  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  let startDate = startDateInput.value;
  let endDate = endDateInput.value;

  console.log("Adding or updating item with value:", inputValue);
  console.log("Index for editing:", index);
  console.log("Selected category:", currentCategory);

  // Validate that there is input and a selected category
  if (inputValue && currentCategory) {
    if (index !== undefined) {
      // If editing an existing item
      model.updateItem(index, inputValue, startDate, endDate, currentCategory);
    } else {
      // If adding a new item
      model.addItem(inputValue, startDate, endDate, currentCategory);
    }

    // Refresh the view after item is added/updated
    display(model.data);
    console.log("Updated Data:", model.data);
  } else {
    console.log("No input or category selected.");
  }

  // Reset the input field and index
  document.getElementById("input").value = "";
  delete document.getElementById("input").dataset.index;
});

// Initial data display
display(model.data);

//*************************************************************************************************** */
document.getElementById("filterall").addEventListener("click", () => {
  display(model.data);
});

document.getElementById("filtercompleted").addEventListener("click", () => {
  let op = model.data;
  let filterop = op.filter((elem) => {
    return elem.checked == true;
  });
  display(filterop);
});

document.getElementById("filternotcompleted").addEventListener("click", () => {
  let op = model.data;
  let filterop = op.filter((elem) => {
    return elem.checked == false;
  });
  display(filterop);
});

//search
document.getElementById("search").addEventListener("input", () => {
  let searchTerm = document.getElementById("search").value.toLowerCase();
  let op = model.data;

  let filterop = op.filter((elem) => {
    return elem.text.toLowerCase().includes(searchTerm);
  });

  display(filterop);
});

// Function to filter and display items based on selected category
function filterByCategory(category) {
  currentCategory = category;
  console.log("Selected category:", currentCategory);

  // Filter the data based on the selected category
  const filteredData = model.data.filter(
    (item) => item.category === currentCategory
  );

  // Display the filtered data
  display(filteredData);
}

// Event listeners for category buttons
document.getElementById("workg").addEventListener("click", () => {
  filterByCategory("work"); // Filter items by 'work' category
});

document.getElementById("homeg").addEventListener("click", () => {
  filterByCategory("home"); // Filter items by 'home' category
});

document.getElementById("personalg").addEventListener("click", () => {
  filterByCategory("personal"); // Filter items by 'personal' category
});

// Function to filter items based on the date range
function filterItemsByDateRange(startDate, endDate) {
  // Convert the start and end date strings into Date objects
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  // Filter the items based on the start and end date range
  const filteredData = model.data.filter((item) => {
    const itemStartDate = item.startDate ? new Date(item.startDate) : null;
    const itemEndDate = item.endDate ? new Date(item.endDate) : null;

    const isStartDateValid = start ? itemStartDate >= start : true;

    const isEndDateValid = end ? itemEndDate <= end : true;
    return isStartDateValid && isEndDateValid;
  });

  display(filteredData);
}

document.getElementById("filterBtn").addEventListener("click", () => {
  const startDate = document.getElementById("filterStartDate").value;
  const endDate = document.getElementById("filterEndDate").value;
  filterItemsByDateRange(startDate, endDate);
});

display(model.data);
