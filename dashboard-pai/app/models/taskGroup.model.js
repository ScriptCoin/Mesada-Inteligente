(function () {
  angular.module('aboilerplate').factory('TaskGroup', TaskGroup);

  TaskGroup.$inject = ['Task'];
  function TaskGroup(Task) {
    return function constructor(taskGroup) {
      taskGroup = taskGroup || {};

      return {
        name: taskGroup.name,
        tasks: (taskGroup.tasks || []).map(Task)
      };
    }
  }
}());