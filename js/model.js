class Model {
  constructor() {}

  get data() {
    return JSON.parse(localStorage.getItem("data")) || [];
  }

  set data(value) {
    localStorage.setItem("data", JSON.stringify(value));
  }

  // Add method to get the date range
  get dateRange() {
    return (
      JSON.parse(localStorage.getItem("dateRange")) || {
        startDate: null,
        endDate: null,
      }
    );
  }

  set dateRange(value) {
    localStorage.setItem("dateRange", JSON.stringify(value));
  }

  addItem(value) {
    let data = this.data;
    data.push({ text: value, checked: false });
    this.data = data;
  }

  // Add updateItem method to modify an item
  updateItem(index, value) {
    let data = this.data;
    if (data[index]) {
      data[index].text = value;
      this.data = data;
    }
  }

  updateCheckedState(index, checked) {
    let data = this.data;
    if (data[index]) {
      data[index].checked = checked;
      this.data = data;
    }
  }

  deleteItem(index) {
    let data = this.data;
    data.splice(index, 1);
    this.data = data;
  }

  // Method to add a date range
  addDateRange(startDate, endDate) {
    this.dateRange = { startDate, endDate };
  }
}

export let model = new Model();
