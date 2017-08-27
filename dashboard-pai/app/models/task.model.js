(function () {
  angular.module('aboilerplate').factory('Task', Task);

  function Task() {
    return function constructor(task) {
      task = task || {};

      return {
        title: task.title,
        completed: task.completed === true,
        coins: task.coins || 0
      };
    }
  }
}());