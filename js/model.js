class Model {
  constructor() {}

  get data() {
    // document
    //   .getElementById(elementId)
    //   .addEventListener(eventName, eventHandler);
    return JSON.parse(localStorage.getItem("data")) || [];
  }

  set data(value) {
    localStorage.setItem("data", JSON.stringify(value));
  }

  addItem(value, startDate, endDate, category) {
    let data = this.data;
    data.push({
      text: value,
      checked: false,
      startDate: startDate || null,
      endDate: endDate || null,
      category: category || null,
    });

    this.data = data;
  }

  // Update existing todo item by index
  updateItem(index, value, startDate, endDate, category) {
    let data = this.data;

    if (data[index]) {
      data[index].text = value;
      data[index].startDate = startDate || null;
      data[index].endDate = endDate || null;
      data[index].category = category || null; // Update category
      this.data = data;
    }
  }

  // Update checked state of a todo item
  updateCheckedState(index, checked) {
    let data = this.data;
    if (data[index]) {
      data[index].checked = checked;
      this.data = data;
    }
  }

  // Delete a todo item by index
  deleteItem(index) {
    let data = this.data;
    data.splice(index, 1);
    this.data = data;
  }
}

export let model = new Model();
