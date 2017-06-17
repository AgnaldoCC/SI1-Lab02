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

  $scope.containsMinhasSeries = function(serie){
    for (var i = 0; i < $scope.minhasSeries.length; i++) {
      if ($scope.minhasSeries[i].imdbID == serie.imdbID){
        return true;
      }
    }return false;
  };

  $scope.adicionaSerie = function(serie){
    console.log(serie);
    if (!$scope.containsMinhasSeries(serie)){
      var promise = $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&plot=full&apikey=93330d3c');
      promise.then(function(response){
        var completa = response.data;
        $scope.minhasSeries.push(completa);
      }).catch(function(error){
        console.log(error);
      });
    }else{
      alert("Você já adicionou essa série.");
    };
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

  $scope.containsWatchList = function(serie){
    for (var i = 0; i < $scope.watchList.length; i++) {
      if ($scope.watchList[i] === serie){
        return true;
      }
    }return false;
  };

  $scope.adicionarWatchlist = function(serie){
    if (!$scope.containsWatchList(serie)){
      $scope.watchList.push(serie);
    }else{
      alert("Você já adicionou essa série à sua WatchList");
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
