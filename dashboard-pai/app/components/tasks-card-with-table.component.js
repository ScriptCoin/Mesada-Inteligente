(function () {
  angular.module('aboilerplate')
    .component('tasksCardWithTable', {
      templateUrl: 'app/components/tasks-card-with-table.component.html',
      transclude: true,
      bindings: {
        title: '<',
        tasks: '<',
        revoke: '<'
      },
      controller: TasksCardWithTable
    });

  TasksCardWithTable.$inject = ['$element'];
  function TasksCardWithTable($element) {
    const $ctrl = this;

    function init() { }

    function onChanges(changes) {
      if (changes.tasks)
        $ctrl.tasks = fixTasks($ctrl.tasks);
    }

    function fixTasks(tasks) {
      tasks = tasks || [];
      if (tasks.groups) {
        tasks = tasks.groups.map(g => g.tasks).reduce((all, tasks) => all.concat(tasks), []);
      }
      return tasks;
    }

    function contest(task) {
      $ctrl.revoke && $ctrl.revoke(task);
    }

    $ctrl.$onInit = init;
    $ctrl.$onChanges = onChanges;

    // dom
  }

}());