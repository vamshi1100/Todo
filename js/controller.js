class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.dateRangeInputs = { startDate: null, endDate: null };
    this.filters = {
      all: () => this.model.data,
      completed: () => this.model.data.filter((elem) => elem.checked === true),
      notCompleted: () =>
        this.model.data.filter((elem) => elem.checked === false),
      category: (category) =>
        this.model.data.filter((item) => item.category === category),
      search: (searchTerm) =>
        this.model.data.filter((elem) =>
          elem.text.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      dateRange: (startDate, endDate) => {
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return this.model.data.filter((item) => {
          const itemStartDate = item.startDate
            ? new Date(item.startDate)
            : null;
          const itemEndDate = item.endDate ? new Date(item.endDate) : null;

          const isStartDateValid = start ? itemStartDate >= start : true;
          const isEndDateValid = end ? itemEndDate <= end : true;

          return isStartDateValid && isEndDateValid;
        });
      },
    };
    this.filterEvents = {
      filterall: "all",
      filtercompleted: "completed",
      filternotcompleted: "notCompleted",
      search: "search",
      filterBtn: "dateRange",
    };
  }

  setupCategoryListeners() {
    this.model.category.forEach((category) => {
      this.view.setEventListener(category, "click", () => {
        this.model.currentCategory = category;
        console.log("Selected Category:", category);
      });
    });
  }

  setupAddButtonListener() {
    this.view.setEventListener("add", "click", () => {
      const inputValue = this.view.getElement("input").value.trim();
      const index = this.view.getElement("input").dataset.index;

      const startDate = this.view.getElement("startDate").value;
      const endDate = this.view.getElement("endDate").value;

      if (inputValue && this.model.currentCategory) {
        if (index !== undefined) {
          this.model.updateItem(
            index,
            inputValue,
            startDate,
            endDate,
            this.model.currentCategory
          );
        } else {
          this.model.addItem(
            inputValue,
            startDate,
            endDate,
            this.model.currentCategory
          );
        }
        this.view.display(this.model.data);
      } else {
        console.log("No input or category selected.");
      }

      this.view.getElement("input").value = "";
      delete this.view.getElement("input").dataset.index;
    });
  }

  setupSearchListener() {
    this.view.setEventListener("search", "input", () => {
      const searchTerm = this.view.getElement("search").value;
      const result = this.filters.search(searchTerm);
      this.view.display(result);
    });
  }

  handleDateRangeChange(changedField, value) {
    this.dateRangeInputs[changedField] = value;
    if (this.dateRangeInputs.startDate && this.dateRangeInputs.endDate) {
      const result = this.filters.dateRange(
        this.dateRangeInputs.startDate,
        this.dateRangeInputs.endDate
      );
      this.view.display(result);
    }
  }

  setupDateRangeListeners() {
    this.view.setEventListener("filterStartDate", "change", () => {
      this.handleDateRangeChange(
        "startDate",
        this.view.getElement("filterStartDate").value
      );
    });

    this.view.setEventListener("filterEndDate", "change", () => {
      this.handleDateRangeChange(
        "endDate",
        this.view.getElement("filterEndDate").value
      );
    });
  }

  setupFilterButtons() {
    Object.keys(this.filterEvents).forEach((elementId) => {
      if (elementId !== "search" && elementId !== "filterBtn") {
        this.view.setEventListener(elementId, "click", () => {
          const filterType = this.filterEvents[elementId];
          const result = this.filters[filterType]();
          this.view.display(result);
        });
      }
    });
  }

  setupCustomCategoryListeners() {
    ["workg", "homeg", "personalg"].forEach((id) => {
      const category = id.replace("g", "");
      this.view.setEventListener(id, "click", () => {
        this.model.currentCategory = category;
        this.view.display(this.filters.category(this.model.currentCategory));
      });
    });
  }
}

export default Controller;
