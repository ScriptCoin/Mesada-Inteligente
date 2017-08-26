(function () {
  angular.module('aboilerplate').factory('RestService', RestService);

  RestService.$inject = ['$q', 'Son'];
  function RestService($q, Son) {
    function getSons() {
      return $q.resolve([Son({ name: 'João', cpf: '21414447051', gender: 'M' })]);
    }

    function getTemplates() {
      return $q.resolve(TEMPLATES);
    }

    return { getSons, getTemplates };
  }

  const TEMPLATES = [
    // até 11 anos
    {
      title: 'Até 11 anos',
      description: 'Começando a ajudar',
      tasks: {
        groups: [{
          name: 'Manhã',
          tasks: [{
            title: 'Arrumar a cama',
            completed: true,
            coins: 1
          }, {
            title: 'Preparar o próprio lanche da escola',
            completed: true,
            coins: 1
          }]
        }, {
          name: 'Tarde',
          tasks: [{
            title: 'Preparar o próprio lanche da tarde',
            completed: true,
            coins: 1
          }, {
            title: 'Limpar móveis',
            completed: true,
            coins: 1
          }, {
            title: 'Limpar espelhos',
            completed: true,
            coins: 1
          }, {
            title: 'Cuidar dos pets',
            completed: true,
            coins: 1
          }]
        }, {
          name: 'Noite',
          tasks: [{
            title: 'Ajudar no preparo do jantar',
            completed: true,
            coins: 1
          }, {
            title: 'Guardar louça',
            completed: true,
            coins: 1
          }, {
            title: 'Fazer lista de mercado',
            completed: true,
            coins: 1
          }]
        }]
      }
    },
      // até 11 anos
    {
      title: 'De 12 a 14 anos',
      description: 'Ajuda nas tarefas domésticas',
      tasks: {
        groups: [{
          name: 'Manhã',
          tasks: [{
            title: 'Preparar os irmãos mais novos',
            completed: true,
            coins: 1
          }, {
            title: 'Preparar o café da manhã',
            completed: true,
            coins: 1
          }]
        }, {
          name: 'Tarde',
          tasks: [{
            title: 'Limpar banheiros',
            completed: true,
            coins: 1
          }, {
            title: 'Colocar roupa para lavar',
            completed: true,
            coins: 1
          }, {
            title: 'Passar pano no chão',
            completed: true,
            coins: 1
          }, {
            title: 'Separa contas a pagar',
            completed: true,
            coins: 1
          }, {
            title: 'Cuidar das plantas',
            completed: true,
            coins: 1
          }]
        }, {
          name: 'Noite',
          tasks: [{
            title: 'Fazer exercícios',
            completed: true,
            coins: 1
          }]
        }]
      }
    }];
}())