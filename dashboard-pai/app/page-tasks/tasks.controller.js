(function () {
  angular.module('aboilerplate')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$window', '$q', 'RestService', 'FirebaseService'];
  function TasksController($window, $q, RestService, FirebaseService) {
    var $ctrl = this;

    $ctrl.templates = null;
    $ctrl.todayTasks = null;
    $ctrl.showChecklist = null;
    $ctrl.getTemplateTasksSummary = getTemplateTasksSummary;
    $ctrl.selectTemplate = selectTemplate;

    function init() {
      fetchData();

      $ctrl.showChecklist = shouldShowChecklist();
    }

    function fetchData() {
      $ctrl.isLoading = true;
      $ctrl.todayTasks = FirebaseService.getTasks(1, 2);

      $q.all([$ctrl.todayTasks.$loaded(), loadTemplates()])
        .then(() => $ctrl.isLoading = false);
    }

    function loadTemplates() {
      return RestService.getTemplates().then(setTemplates);
    }

    function setTemplates(templates) {
      $ctrl.templates = templates;
    }

    function selectTemplate(template) {
      $ctrl.showChecklist = true;
      setShouldShowChecklist(true);
    }

    function setTasks(tasks) {
      $ctrl.todayTasks = tasks;
    }

    init();

    // helpers
    function shouldShowChecklist() {
      return $window.localStorage.getItem('shouldShowChecklist');
    }

    function setShouldShowChecklist(show) {
      return $window.localStorage.setItem('shouldShowChecklist', show);
    }

    function getTemplateTasksSummary(template) {
      var grouppedTasks = template.tasks.groups
        .map(g => g.tasks)
        .reduce((all, item) => all.concat(item), []);

      return grouppedTasks.map(t => t.title).splice(0, 5).join(', ');
    }
  }
}());