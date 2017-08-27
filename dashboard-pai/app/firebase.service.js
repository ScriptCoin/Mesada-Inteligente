(function () {
  angular.module('aboilerplate').factory('FirebaseService', FirebaseService);

  FirebaseService.$inject = ['$firebaseObject', '$firebaseArray'];
  function FirebaseService($firebaseObject, $firebaseArray) {
    function getTasks(parentId, dependentId) {
      var arrayRef = firebase.database().ref(`parents/${parentId}/dependents/${dependentId}/tasks`);
      return $firebaseObject(arrayRef);
    }

    return { getTasks };
  }
}())