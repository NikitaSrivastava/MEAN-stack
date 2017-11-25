   
var a = angular.module("myApp",[]);
a.controller('myControl',['$scope','$http',function($scope,$http){
var refresh = function(){
	$http.get('/cardetail').then( function (response) {
		console.log("http request made");
		$scope.cardetails = response.data;	
	});
};
refresh();
	$scope.addinfo = function(){
		$http.post('/cardetail',$scope.ca).then(function(response){
        $scope.ca="";
        refresh();
		});
	};
	$scope.remove = function(id){
		$http.delete('/cardetail/' + id).then(function(response){
         refresh();
		});
	};

	$scope.edit = function(id){
		$http.get('/cardetail/' + id).then(function(response){
        $scope.ca = response.data;
		});
	};
	$scope.update = function(id){
		console.log(id);
		$http.put('/cardetail/' + id,$scope.ca).then(function(){
         refresh();
		});
	};
	$scope.clear = function(){
		$scope.ca = "";
	};

}]); 

