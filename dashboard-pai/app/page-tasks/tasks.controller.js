(function () {
  angular.module('aboilerplate')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['RestService'];
  function TasksController(RestService) {
    var $ctrl = this;

    $ctrl.templates = null;
    $ctrl.getTemplateTasksSummary = getTemplateTasksSummary;

    function init() {
      fetchData();
    }

    function fetchData() {
      RestService.getTemplates().then(onFetchTemplates);
    }

    function onFetchTemplates(templates) {
      $ctrl.templates = templates;
    }

    function selectTemplate(template) {
      $ctrl.checklist = angular.copy(template);
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