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

    $ctrl.contest = contest;

    function init() { }

    function onChanges(changes) { }

    function fixTasks(tasks) {
      tasks = tasks || [];
      if (tasks.groups) {
        tasks = tasks.groups.map(g => g.tasks).reduce((all, tasks) => all.concat(tasks), []);
      }
      return tasks;
    }

    function contest(task) {
      $ctrl.revoke && $ctrl.revoke(task);
      task.contested = true;
      task.completed = false;
      $ctrl.tasks.$save();
    }

    $ctrl.$onInit = init;
    $ctrl.$onChanges = onChanges;

    // dom
  }

}());