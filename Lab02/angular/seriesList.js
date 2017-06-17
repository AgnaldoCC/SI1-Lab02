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
    if (!$scope.contains(serie)){
      $scope.minhasSeries.push(serie);
    }else{
      alert("Você já adicionou essa série");
    }
  };

  $scope.contains = function(serie){
    for (var i = 0; i < $scope.minhasSeries.length; i++) {
      if ($scope.minhasSeries[i] === serie){
        return true;
      }
    }return false;
  };

  $scope.deletarMinhasSeries = function(serie){
    var index = $scope.minhasSeries.indexOf(serie);
    decisao = confirm("Deseja excluir a série?");
    if (decisao){
      if (index > -1){
        $scope.minhasSeries.splice(index, 1);
      }
      alert ("A série "+serie.Title+" foi excluída do seu perfil");
    }
  }

  $scope.adicionarWatchlist = function(serie){
    if (!$scope.contains(serie)){
      $scope.watchList.push(serie);
    }else{
      alert("Você já adicionou essa série");
    }
  }

  $scope.deletarWatchList = function(serie){
    var index = $scope.watchList.indexOf(serie);
    decisao = confirm("Deseja excluir a série?");
    if (decisao){
      if (index > -1){
        $scope.watchList.splice(index, 1);
      }
      alert ("A série "+serie.Title+" foi excluída da sua WatchList");
    }
  }

});
