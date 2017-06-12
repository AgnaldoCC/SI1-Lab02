var app = angular.module("seriesList", []);
app.controller("seriesController", function($scope, $http){

  $scope.pesquisa = "Pesquisar Séries";

  $scope.series = [];
  $scope.minhasSeries = [];
  $scope.watchList = []

  $scope.getSeries = function(nome){
		var promise = $http.get('http://www.omdbapi.com/?s=' + nome + '&type=series&apikey=93330d3c').then(function(response){
			$scope.series = response.data.Search;
		}, function error(response){
			console.log("Erro");
		})
		return promise;
	};

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

  $scope.deletarSerie = function(serie){
    var index = $scope.minhasSeries.indexOf(serie);
    if (index > -1){
      $scope.minhasSeries.splice(index, 1);
    }
  }

  $scope.adicionarWatchlist = function(serie){
    $scope.watchList.push(serie);
  }

});
