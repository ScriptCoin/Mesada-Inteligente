angular.module('aboilerplate')
.component('grafico', {
  templateUrl: 'app/components/grafico.component.html',
  transclude: true,
  bindings: {},
  controller:function(){
      var $ctrl = this;
    $ctrl.myDataSource = {
        chart: {
            caption: "Harry's SuperMart",
            subCaption: "Top 5 stores in last month by revenue",
        },
        data:[{
            label: "Bakersfield Central",
            value: "880000"
        },
        {
            label: "Garden Groove harbour",
            value: "730000"
        },
        {
            label: "Los Angeles Topanga",
            value: "590000"
        },
        {
            label: "Compton-Rancho Dom",
            value: "520000"
        },
        {
            label: "Daly City Serramonte",
            value: "330000"
        }]
    };
  }
});
