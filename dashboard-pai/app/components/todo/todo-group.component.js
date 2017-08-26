angular.module('aboilerplate')
  .component('todoGroup', {
    templateUrl: 'app/components/todo/todo-group.component.html',
    transclude: true,
    bindings: {
      name: '<',
      tasks: '<'
    },
    controller: TodoGroupComponent
  });

TodoGroupComponent.$inject = [];
function TodoGroupComponent() {
  var $ctrl = this;

  function init() { }

  function onChanges(changes) { }

  $ctrl.$onInit = init;
  $ctrl.$onChanges = onChanges;
}
