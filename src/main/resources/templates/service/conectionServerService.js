app.service('conectionServerService', function($http){


    this.listar = function listar(){
      return $http.get("http://localhost:8080/empleado/list");
    }
     this.crear = function crear(emp){
      return($http.post("http://localhost:8080/empleado/crear",emp));


    }
     this.editar = function editar(id,emp){
      return($http.put("http://localhost:8080/empleado/editar/"+id,emp));


    }
    this.eliminar = function eliminar(id){
      return($http.delete("http://localhost:8080/empleado/eliminar/"+id));


    }
     
});

