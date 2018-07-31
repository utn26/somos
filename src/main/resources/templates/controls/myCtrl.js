	var app = angular.module('myApp', ['angularUtils.directives.dirPagination']);
	
	app.controller('myCtrl', function($scope,conectionServerService,filterFilter){
		$scope.empleado = {};
		$empleados=[];

		conectionServerService.listar()
		.then(function(respuesta){
			console.log(respuesta);
            $scope.empleados = respuesta.data;
        })
        .catch(function(err){
            console.log(err);
        });

        $scope.crear = function(){
	        
	        conectionServerService.crear($scope.empleado)
			.then(function(respuesta){

				console.log(respuesta);
	            $scope.empleados.push(respuesta.data);
	            $scope.reset();
	            
	        })
	        .catch(function(err){
	            console.log(err);
	        });
        }
        $scope.editar = function(){
	        
        	empleadosEdit = filterFilter($scope.empleados,{id:$scope.empleado.id});

	        conectionServerService.editar($scope.empleado.id,$scope.empleado)
			.then(function(respuesta){
				console.log("ants %o",respuesta.data);
				angular.copy(respuesta.data,empleadosEdit[0]);
				//copia el editado en donde estaba el no editado

				
				console.log("data %o",respuesta.data);//editado
				console.log(empleadosEdit);//no editado
				$scope.reset();

	          
	            
	        })
	        .catch(function(err){
	            console.log(err);
	        });
        }
        $scope.setEmpleado = function(id,nombre, edad, sueldo){
		
		$scope.empleado.id = id;
		$scope.empleado.nombre = nombre;
		$scope.empleado.edad = edad;
		$scope.empleado.sueldo = sueldo;

		}		
		$scope.reset = function(form) {
          $scope.empleado = {};
          if (form) {
            form.$setPristine();
            form.$setUntouched();
          }
        };
        $scope.reset = function() {
          $scope.empleado = {};

            $scope.formulariocrear.$setPristine();
            $scope.formulariocrear.$setUntouched();
          
          
        };

        $scope.eliminar = function(id){
        	//$scope.empleados lista a filtrar 
        	//entre{} va el json con el que filtras
        	empleadosDelete = filterFilter($scope.empleados,{id:id});
        	empleadoEliminado = empleadosDelete[0];

        	index = $scope.empleados.indexOf(empleadoEliminado);
            



        	console.log(empleadosDelete);
	        
	        conectionServerService.eliminar(id)
			
			.then(function(respuesta){
				console.log(index);
				$scope.empleados.splice(index,1);
				//console.log(respuesta);
				//console.log($scope.empleados);
	            
	            //location.reload();
	        })
	        .catch(function(err){
	            console.log(err);
	        });
        }


    });
	
		/*$scope.empleado = {};
		$scope.empleados = [];
		
		var conexion = $http.get("http://localhost:8080/empleado/list");
		conexion.success(function(respuesta){
			$scope.empleados = respuesta;
			console.log("-----");
			console.log(respuesta);


		});
		conexion.error(function(err){
			console.log("-----");
			console.log(err);
		})		



		$scope.crear = function(){
		
		console.log($scope.empleado);

		var conexion = $http.post("http://localhost:8080/empleado/crear",$scope.empleado);
		conexion.success(function(respuesta){
			
			
			$scope.empleados.push(respuesta);

			$scope.empleado={};
			location.reload();

			
		});
		conexion.error(function(err){
			console.log("-----");
			console.log(err);
		})		
		
		
		}


		$scope.setId = function(id){
		
		$scope.empleado.id = id;

		}		

		$scope.editar = function(){
		
		//console.log($scope.empleado);

		var conexion = $http.put("http://localhost:8080/empleado/editar/"+$scope.empleado.id,$scope.empleado);
		conexion.success(function(respuesta){
			
			
			console.log(respuesta);
			location.reload();
			

		});
		conexion.error(function(err){
			console.log("-----");
			console.log(err);
		})		
		
		}

		$scope.eliminar = function(id){
			
			console.log($scope.empleado);

			var conexion = $http.delete("http://localhost:8080/empleado/eliminar/"+id,$scope.empleado);
			conexion.success(function(respuesta){
				
				console.log(respuesta);
				window.location.reload();
				

			});
			conexion.error(function(err){
				console.log("-----");
				console.log(err);
			})		
			
		}

		$scope.encontrado = {};


		$scope.buscar = function(){
		
		console.log($scope.empleado);

		var conexion = $http.get("http://localhost:8080/empleado/buscar/"+$scope.busquedaId,$scope.empleado);
		conexion.success(function(respuesta){
			
			console.log(respuesta);
			$scope.encontrado = respuesta;
			

		});
		conexion.error(function(err){
			console.log("-----");
			console.log(err);
			alert(err);
		})		
		
		}
		$scope.reset = function(form) {
          $scope.empleado = {};
          if (form) {
            form.$setPristine();
            form.$setUntouched();
          }
        };

        $scope.reset();

      
	});*/