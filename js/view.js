import { model } from "./model.js";
// Function to render an individual item, including the category
function renderItem(item, index) {
  const p = document.createElement("p");
  p.textContent = item.text;

  const checked = document.createElement("input");
  checked.type = "checkbox";
  checked.checked = item.checked;
  checked.addEventListener("change", () => {
    model.updateCheckedState(index, checked.checked);
  });

  const delbtn = document.createElement("button");
  delbtn.textContent = "Delete";
  delbtn.addEventListener("click", () => {
    model.deleteItem(index);
    display(model.data);
  });

  // Display the start and end date
  const startDate = document.createElement("span");
  startDate.textContent = `Start: ${item.startDate || "N/A"}`;
  const endDate = document.createElement("span");
  endDate.textContent = `End: ${item.endDate || "N/A"}`;

  // Display the category of the todo item
  const category = document.createElement("span");
  category.textContent = `Category: ${item.category || "None"}`;

  // Return the elements that will be appended to the display
  return { p, checked, delbtn, startDate, endDate, category };
}

// Function to display all items
export function display(getdata) {
  let addcontainer = document.getElementById("addcontainer");
  addcontainer.innerHTML = "";

  getdata.forEach((element, index) => {
    let displayop = document.createElement("div");
    displayop.classList.add("todo-item");
    const { p, checked, delbtn, startDate, endDate, category } = renderItem(
      element,
      index
    );

    // Create divs for chekbox, start date, end date, and category etc
    let checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("items");
    checkboxDiv.appendChild(checked); // Checkbox
    displayop.appendChild(checkboxDiv);

    let textDiv = document.createElement("div");
    textDiv.classList.add("items");
    textDiv.appendChild(p); // Todo text
    displayop.appendChild(textDiv);

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("items");
    buttonDiv.appendChild(delbtn); // Delete button
    displayop.appendChild(buttonDiv);

    let startDateDiv = document.createElement("div");
    startDateDiv.classList.add("items");
    startDateDiv.appendChild(startDate); // Start date
    displayop.appendChild(startDateDiv);

    let endDateDiv = document.createElement("div");
    endDateDiv.classList.add("items");
    endDateDiv.appendChild(endDate); // End date
    displayop.appendChild(endDateDiv);

    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("items");
    categoryDiv.appendChild(category); // Category
    displayop.appendChild(categoryDiv);

    addcontainer.appendChild(displayop);
  });
}
