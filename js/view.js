import { model } from "./model.js";

// Function to add an item to the model
export function addItem() {
  let input = document.getElementById("input").value;
  return input;
}

// Function to create a checkbox element
function createCheckbox(index, checkedState) {
  let checked = document.createElement("input");
  checked.type = "checkbox";
  checked.id = `completed-${index}`;
  checked.className = "completed";
  checked.checked = checkedState;

  // Update the display when checkbox changes
  checked.addEventListener("change", () => {
    let pElement = document.getElementById(`text-${index}`);
    if (checked.checked) {
      pElement.style.textDecoration = "line-through";
    } else {
      pElement.style.textDecoration = "none";
    }
    model.updateCheckedState(index, checked.checked);
  });

  return checked;
}

// Function to create a delete button
function createDeleteButton(index) {
  let delbtn = document.createElement("button");
  delbtn.innerText = "Delete";
  delbtn.addEventListener("click", (e) => {
    e.stopPropagation();
    model.deleteItem(index);
    display(model.data); // Re-render the list after deleting the item
  });

  return delbtn;
}

// Function to render individual item
function renderItem(element, index) {
  let p = document.createElement("p");
  p.innerText = element.text || "Default Name";
  p.id = `text-${index}`;

  if (element.checked) {
    p.style.textDecoration = "line-through";
  } else {
    p.style.textDecoration = "none";
  }

  const checked = createCheckbox(index, element.checked);
  const delbtn = createDeleteButton(index);

  // Add event listener for editing
  p.addEventListener("click", () => {
    document.getElementById("input").value = element.text;
    document.getElementById("input").dataset.index = index;
  });

  return { p, checked, delbtn };
}

// Function to display all items
export function display(getdata) {
  let addcontainer = document.getElementById("addcontainer");
  let displayop = document.getElementById("displayop");
  displayop.innerHTML = "";

  getdata.forEach((element, index) => {
    const { p, checked, delbtn } = renderItem(element, index); // Render individual item

    displayop.appendChild(checked);
    displayop.appendChild(p);
    displayop.appendChild(delbtn);
  });
  addcontainer.appendChild(displayop);
}

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

document.getElementById("search").addEventListener("input", () => {
  let searchTerm = document.getElementById("search").value.toLowerCase();
  let op = model.data;

  let filterop = op.filter((elem) => {
    return elem.text.toLowerCase().includes(searchTerm);
  });

  display(filterop);
});
