class Model {
  constructor() {
    this.currentCategory = null;
    this.category = ["work", "home", "personal"];
  }

  get data() {
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

  updateItem(index, value, startDate, endDate, category) {
    let data = this.data;
    if (data[index]) {
      data[index].text = value;
      data[index].startDate = startDate || null;
      data[index].endDate = endDate || null;
      data[index].category = category || null;
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
}

export let model = new Model();
