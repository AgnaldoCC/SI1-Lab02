var app = angular.module("seriesList", []);
app.controller("seriesController", function($scope, $http){

  $scope.pesquisa = "Pesquisar Séries";

  $scope.series = [];

  $scope.getSeries = function(nome){
		var promise = $http.get('http://www.omdbapi.com/?s=' + nome + '&type=series&apikey=93330d3c').then(function(response){
			$scope.series = response.data.Search;
		}, function error(response){
			console.log("Erro");
		})
		return promise;
	};

  $scope.minhasSeries = [];

  $scope.adicionaSerie = function(serie){
    $scope.minhasSeries.push(serie);
  };

  $scope.contains = function(serie){
    for (var i = 0; i < minhasSeries.length; i++) {
      if (minhasSeries[i].Title == serie.Title){
        return true;
      }
    }return false;
  };

});
