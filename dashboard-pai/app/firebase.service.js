(function () {
  angular.module('aboilerplate').factory('FirebaseService', FirebaseService);

  FirebaseService.$inject = ['RestService', '$q', '$firebaseObject', '$firebaseArray'];
  function FirebaseService(RestService, $q, $firebaseObject, $firebaseArray) {
    function getTasks(parentId, dependentId) {
      var objRef = firebase.database().ref(`/tasks`);
      return $firebaseObject(objRef);
    }

    function getScore(parentId, dependentId) {
      var objRef = firebase.database().ref(`/score`);
      return $firebaseObject(objRef);
    }

    function initDb() {
      const parentId = 1;
      const userId = 2;
      const fbTasks = getTasks(parentId, userId);

      // salva as tasks
      RestService.getTasks(userId)
        .then(tasksFromJson => {
          Object.assign(fbTasks, tasksFromJson);
          fbTasks.$save();
        });
    }

    // initDb();

    return { getTasks, getScore };
  }
}());