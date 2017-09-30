angular.module('fazerumpedido').controller('ContaController', function($scope, $stateParams, $rootScope, $http, $ngBootbox, $window, $location) {

  $rootScope.tituloPagina3 = "label.tituloFecharConta";
  $rootScope.esconderBtnVoltar = false;
  $rootScope.acompanhamentos = [];
  $scope.somaVlrTotal = 0;
  $scope.somaTotal = function(item, quantidade){
    $scope.somaVlrTotal = $scope.somaVlrTotal + (item*quantidade);
  };
  $scope.solicitarFecharConta = {};
  $scope.solicitarFecharConta.opcaoDinheiro = false;
  $scope.solicitarFecharConta.opcaoDebito = false;
  $scope.solicitarFecharConta.opcaoCredito = false;
  $scope.solicitarFecharConta.opcaoRefeicao = false;
  $scope.controleMensagemDuplicada = false;
  $scope.fecharConta = function (){
      $scope.solicitarFecharConta.idQrCode = $rootScope.idQrCode;
     if ($scope.solicitarFecharConta.opcaoDinheiro || $scope.solicitarFecharConta.opcaoDebito 
      || $scope.solicitarFecharConta.opcaoCredito || $scope.solicitarFecharConta.opcaoRefeicao ){
       $http({ 
              method: 'POST',
              url: '/fechar_conta',
              data:  $scope.solicitarFecharConta 
            })
            .then(function (success) {
                var idQrCode = $scope.solicitarFecharConta.idQrCode;

                  $http({
                    method: 'PUT',
                    url: '/pedido_acompanhamento/fechar_itens/' + idQrCode,
                  })
                  .then(function (success) {
                    if(!$scope.controleMensagemDuplicada){
                      $scope.controleMensagemDuplicada = true
                      $ngBootbox.alert({message: "Recebemos sua solicitação, estamos encaminhando o garçom para receber seu pagamento. Muito Obrigado!", title: "Sucesso!"})
                        .then(function() {
                            $scope.mensagem = "";
                            $scope.titleMensagem = "";
                            $scope.login = 0;
                        });
                            $scope.solicitarFecharConta = {};
                            $rootScope.idQrCode = '';
                            $rootScope.acompanhamentos = [];
                            delete $window.sessionStorage.token;
                            $location.path('/home');
                    }else{
                      $scope.controleMensagemDuplicada = false;
                    }
                  }, function(error){
                    console.log("Erro: " + error);
                  });

            }, function(error){
              $scope.mensagem = error;
              $ngBootbox.alert({message: "Sistema Fora do Ar! Tente novamente mais tarde ou Chame um Garçom. Desculpe!", title: "Ops!"})
                .then(function() {
                    $scope.mensagem = "";
                    $scope.titleMensagem = "";
                    $scope.login = 0;
                });
            });
      }else{
        $ngBootbox.alert({message: "Favor escolher forma de pagamento", title: "Ops!"})
          .then(function() {
              $scope.mensagem = "";
              $scope.titleMensagem = "";
          });
      }
  };
});
