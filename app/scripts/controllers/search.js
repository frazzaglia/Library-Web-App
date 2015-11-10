function SearchCtrl($scope, $http) {
  //$scope.url = 'http://localhost:80/search2.php'; // The url of our search

  //$scope.url = 'http://localhost:9000/scripts/controllers/search.php';

  // The function that will be executed on button click (ng-click="search()")
  $scope.search = function() {

    // Create the http post request
    // the data holds the keywords
    // The request is a JSON request.
    console.log("Chiamo il server" + $scope.keywords);
    //$http.post($scope.url, { "data" : $scope.keywords}).
    $http({
        method: 'POST',
        url: 'http://localhost:80/palocs/search2.php',
        data: $scope.keywords,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        $scope.result = data; // Show result from server in our <pre></pre> element
      })
      .error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
      });
  };
}
