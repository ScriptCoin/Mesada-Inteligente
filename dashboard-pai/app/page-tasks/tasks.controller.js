(function () {
  angular.module('aboilerplate')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['RestService', 'FirebaseService'];
  function TasksController(RestService, FirebaseService) {
    var $ctrl = this;

    $ctrl.templates = null;
    $ctrl.todayTasks = null;
    $ctrl.getTemplateTasksSummary = getTemplateTasksSummary;
    $ctrl.selectTemplate = selectTemplate;

    function init() {
      fetchData();
    }

    function fetchData() {
      $ctrl.isLoading = true;
      $ctrl.todayTasks = FirebaseService.getTasks(1, 2);
      $ctrl.todayTasks.$loaded()
        .then(() => $ctrl.isLoading = false);
    }

    function loadTemplates() {
      return RestService.getTemplates().then(setTemplates);
    }

    function setTemplates(templates) {
      $ctrl.templates = templates;
    }

    function selectTemplate(template) {
      setTasks(angular.copy(template.tasks));
    }

    function setTasks(tasks) {
      $ctrl.todayTasks = tasks;
    }

    init();

    // helpers
    function getTemplateTasksSummary(template) {
      var grouppedTasks = template.tasks.groups
        .map(g => g.tasks)
        .reduce((all, item) => all.concat(item), []);

      return grouppedTasks.map(t => t.title).splice(0, 5).join(', ');
    }
  }
}());