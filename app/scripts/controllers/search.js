function SearchCtrl($scope, $http, $modal) {
  //$scope.url = 'http://localhost:80/search2.php'; // The url of our search
  console.log("cerco");
  $scope.search = function() {
    // Create the http post request
    // The request is a JSON request.
    console.log("Chiamo il server: " + $scope.keywords);
    $http({
        method: 'POST',
        url: 'http://localhost:80/palocs/search4.php',
        data: $scope.keywords,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        $scope.result = data;
      })
      .error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
      });
  };

  $scope.delete = function(username) {
    if (confirm("Are you sure to delete?")) {
      console.log("Rimuovo: " + username);
    }
  };
}
