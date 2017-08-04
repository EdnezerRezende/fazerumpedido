angular.module('fazerumpedido').controller('FazerPedidoController', function($scope, $stateParams, $rootScope){
  $rootScope.tituloPagina = "Pedido";
  $rootScope.detalharCardapio.quantidade = 1;
  // $rootScope.pedido.valor = $rootScope.detalharCardapio.valor;

  $scope.btnDiminuir = function(){
    if($rootScope.detalharCardapio.quantidade > 1){
      var guarda = $rootScope.detalharCardapio.quantidade;
      guarda = guarda - 1;
      // $rootScope.pedido.valor =  $rootScope.pedido.valor - $rootScope.detalharCardapio.valor;
      $rootScope.detalharCardapio.quantidade = guarda;
    }
  };

  $scope.btnAumentar = function(){
    if($rootScope.detalharCardapio.quantidade >= 1){
      var guarda = $rootScope.detalharCardapio.quantidade;
      guarda = guarda + 1;
      // $rootScope.pedido.valor =  $rootScope.pedido.valor + $rootScope.detalharCardapio.valor;
      $rootScope.detalharCardapio.quantidade = guarda;
    }
  };

  $scope.submeter =  function(){
    $rootScope.pedido = $rootScope.detalharCardapio;
    // $rootScope.pedido.valor=$rootScope.detalharCardapio.valor;
    // $rootScope.pedido.quantidade=$rootScope.detalharCardapio.quantidade;
    $rootScope.pedido.status = "Solicitado";
  };

});
