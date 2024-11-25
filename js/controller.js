import { model } from "../js/model.js";
import { addItem, display } from "../js/view.js";

// Handle adding a new item or updating an existing one
document.getElementById("add").addEventListener("click", () => {
  let inputValue = addItem();
  // Get the index of the clicked item (if editing)
  let index = document.getElementById("input").dataset.index;

  console.log(index);

  if (inputValue) {
    if (index !== undefined) {
      model.updateItem(index, inputValue);
    } else {
      model.addItem(inputValue);
    }

    display(model.data);
    console.log("Updated Data:", model.data);
  } else {
    console.log("No input provided.");
  }

  document.getElementById("input").value = "";
  delete document.getElementById("input").dataset.index;
});

display(model.data);

const startDateInput = document.getElementById("startDate");
startDateInput.addEventListener("change", () => {
  const selectedDate = startDateInput.value;
  console.log("Selected Date:", selectedDate);
});

const endDateInput = document.getElementById("endDate");
endDateInput.addEventListener("change", () => {
  const selectedDate = endDateInput.value;
  console.log("end Date:", selectedDate);
});
