const PaginationView = {
  initializePage: function () {
    PaginationController.Initialize();
    TableEvent.actionWithEnter();
  },
  updatePagination: function () {
    PaginationController.Update();
    TableEvent.actionWithEnter();
  },
};
