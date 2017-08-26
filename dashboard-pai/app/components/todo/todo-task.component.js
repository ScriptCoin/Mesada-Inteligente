angular.module('aboilerplate')
  .component('todoTask', {
    templateUrl: 'app/components/todo/todo-task.component.html',
    transclude: true,
    bindings: {
      title: '<',
      completed: '<',
      coins: '<'
    },
    controller: TodoItemComponent
  });

TodoItemComponent.$inject = ['$element'];
function TodoItemComponent($element) {
  const $ctrl = this;

  $ctrl.setCompleted = setCompleted;

  function init() { }

  function onChanges(changes) {
    if (changes.completed) setCompleted($ctrl.completed);
  }

  function setCompleted(completed) {
    $ctrl.completed = completed === true;
    setDOMHostCompleted($ctrl.completed);
  }

  $ctrl.$onInit = init;
  $ctrl.$onChanges = onChanges;

  // dom
  function setDOMHostCompleted(completed) {
    const completedCls = 'completed';
    if (completed)
      $element.addClass(completedCls);
    else
      $element.removeClass(completedCls);
  }
}
