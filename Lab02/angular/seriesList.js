var app = angular.module("seriesList", []);
app.controller("seriesController", function($scope, $http){

  $scope.series = [];
  $scope.minhasSeries = [];
  $scope.watchList = [];

  $scope.pesquisou = "";

  $scope.getSeries = function(nome){
    $scope.series = [];
    $scope.pesquisou = "";
		var promise = $http.get('http://www.omdbapi.com/?s=' + nome + '&type=series&apikey=93330d3c').then(function(response){
      if(response.data.Response == "False"){
          $scope.pesquisou = response.data.Error;
      }else{
          $scope.series = response.data.Search;
      };

		}, function error(response){
			console.log("Erro");
		})
		return promise;
	};

  var contains = function(array, serie){
    for (var i = 0; i < array.length; i++) {
      if (array[i].imdbID == serie.imdbID){
        return true;
      }
    }return false;
  }

  $scope.containsMinhasSeries = function(serie){
    return contains($scope.minhasSeries, serie);
  };

  $scope.adicionaSerie = function(serie){
    if (!$scope.containsMinhasSeries(serie)){
      var promise = $http.get('https://omdbapi.com/?i=' + serie.imdbID + '&plot=full&apikey=93330d3c');
      promise.then(function(response){
        var completa = response.data;
        $scope.minhasSeries.push(completa);
        alert(serie.Title + " adicionada ao seu perfil.")
      }).catch(function(error){
        console.log(error);
      });
    }else{
      alert("Você já adicionou " + serie.Title + " ao seu perfil.");
    };

    if (contains($scope.watchList, serie)){
      var index = $scope.watchList.indexOf(serie);
      $scope.watchList.splice(index, 1);
    }
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
    return contains($scope.watchList, serie);
  };

  $scope.adicionarWatchlist = function(serie){
    if (contains($scope.minhasSeries, serie)){
      alert("Você já possui essa série no seu perfil.");
    }else{
      if (!contains($scope.watchList, serie)){
        $scope.watchList.push(serie);
        alert(serie.Title + " adicionada a sua WatchList")
      }else{
        alert("Você já adicionou " + serie.Title + " a sua WatchList");
      }
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

  $scope.adicionaMinhaNota = function(minhaNota, serie){
    serie.nota = minhaNota;
  }

  $scope.adicionaUltimoEpi = function(ultimoEpi, serie){
    serie.ultimoEpi = ultimoEpi;
  }

  $scope.pesquisa = function(){
    return $scope.pesquisou == "Movie not found!";
  }

});
