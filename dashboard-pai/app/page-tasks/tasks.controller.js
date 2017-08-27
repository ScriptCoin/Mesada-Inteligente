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
      $scope.tasks = FirebaseService.getTasks(1, 2);
      RestService.getTasks(2).then(tasks => {
        if (!tasks)
          loadTemplates();
        else
          setTasks(tasks);
      });
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