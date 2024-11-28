import { model } from "./model.js";

class View {
  constructor() {
    this.elements = {}; // Cache for elements
  }

  getElement(elementId) {
    if (!this.elements[elementId]) {
      this.elements[elementId] = document.getElementById(elementId);
    }
    return this.elements[elementId];
  }

  setEventListener(elementId, eventName, eventHandler) {
    const element = this.getElement(elementId);
    if (element) {
      element.addEventListener(eventName, eventHandler);
    }
  }

  // Render an individual item, including the category
  renderItem(item, index) {
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
      this.display(model.data);
    });

    const startDate = document.createElement("span");
    startDate.textContent = `Start: ${item.startDate || "N/A"}`;
    const endDate = document.createElement("span");
    endDate.textContent = `End: ${item.endDate || "N/A"}`;

    const category = document.createElement("span");
    category.textContent = `Category: ${item.category || "None"}`;

    return { p, checked, delbtn, startDate, endDate, category };
  }

  // Display all items
  display(getdata) {
    const addcontainer = this.getElement("addcontainer");
    addcontainer.innerHTML = "";

    getdata.forEach((item, index) => {
      const displayop = document.createElement("div");
      displayop.classList.add("todo-item");

      const { p, checked, delbtn, startDate, endDate, category } =
        this.renderItem(item, index);

      const checkboxDiv = document.createElement("div");
      checkboxDiv.classList.add("items");
      checkboxDiv.appendChild(checked);

      const textDiv = document.createElement("div");
      textDiv.classList.add("items");
      textDiv.appendChild(p);

      const buttonDiv = document.createElement("div");
      buttonDiv.classList.add("items");
      buttonDiv.appendChild(delbtn);

      const startDateDiv = document.createElement("div");
      startDateDiv.classList.add("items");
      startDateDiv.appendChild(startDate);

      const endDateDiv = document.createElement("div");
      endDateDiv.classList.add("items");
      endDateDiv.appendChild(endDate);

      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("items");
      categoryDiv.appendChild(category);

      displayop.append(
        checkboxDiv,
        textDiv,
        buttonDiv,
        startDateDiv,
        endDateDiv,
        categoryDiv
      );
      addcontainer.appendChild(displayop);
    });
  }
}

export const view = new View();
