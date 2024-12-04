import Controller from "./controller.js";
import { model } from "../js/model.js";
import { view } from "../js/view.js";

(() => {
  function initializeController(controller) {
    controller.setupCategoryListeners();
    controller.setupAddButtonListener();
    controller.setupSearchListener();
    controller.setupDateRangeListeners();
    controller.setupFilterButtons();
    controller.setupCustomCategoryListeners();
    controller.view.display(controller.model.data); // Initial data display
  }
  const controller = new Controller(model, view);
  initializeController(controller);

  // console.log(controller);
})();
