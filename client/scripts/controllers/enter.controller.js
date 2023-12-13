/**
 * Copyright (c) 2016
 * Company: Aya Jo
 * Created by Prince Hernandez, Yazeed Samamah.
 */

Meteor.startup(function () {

    angular
        .module('Ayamobile')
        .controller('EnterCtrl', EnterCtrl);


    function EnterCtrl( $scope, $reactive) {
        $reactive(this).attach($scope);
        $scope.$on('$ionicView.afterEnter', function () {
          
           
            });


            this.testCode = testCode;
        function testCode(){
            console.log('testCode');
            if (Meteor.isCordova) {
                document.addEventListener("deviceready", onDeviceReady, false);
              }
            }
        
        
            function onDeviceReady() {
                console.log("Device is ready");
                checkCameraPermissionState();
              }
              function handleError(error) {
                console.log("An error occurred: " + error);
              }
              function checkCameraPermissionState() {
                if (Meteor.isCordova) {
                  cordova.plugins.diagnostic.getCameraAuthorizationStatus(function (
                    status
                  ) {
                  ///  setPermissionStatus(status);
                  $scope.permissionStatus = status;
                  console.log('status' + status);
                  if(status != "GRANTED"){
                    requestCameraPermissions();
                  }
                    if (status === "GRANTED") {
                      console.log("Permission granted loading IDWise");
                      loadIDWise();
                    }
                  },
                  handleError);
                }
              }
            
              function requestCameraPermissions() {
                if (Meteor.isCordova) {
                  cordova.plugins.diagnostic.requestCameraAuthorization({
                    successCallback: function (status) {
                      switch (status) {
                        case "NOT_REQUESTED":
                          console.log("Permission not requested");
                          break;
                        case "DENIED_ALWAYS":
                          console.log("Permission denied");
                          break;
                        case "GRANTED":
                        case "LIMITED": // iOS 14+
                        //   console.log("Permission granted", status);
                         loadIDWise();
                        //   setPermissionStatus("GRANTED");
                          break;
                      }
                      console.log(
                        "Successfully requested camera authorization: authorization was " +
                          status
                      );
                    },
                    errorCallback: handleError,
                    externalStorage: true,
                  });
                }
              }
            
              function loadIDWise() {
                if ($scope.permissionStatus !== "GRANTED") {
                    requestCameraPermissions();
                }
                try {
                //  setIsLoading(true);
                  console.log('try to start');
                  IDWise.initialize({
                    clientKey: "QmFzaWMgTW1ZM05XTTJZMkl0Tm1VMVpDMDBZV1ZqTFdKa04yUXRZemcwTkdOaVpHRmhOVGN4T2sweVlsQlVNVmh4TVV4bmJFTkdXVVV6TmpseVUxRkdTSE53YlU5cGREQTFaWHBCVm1STFJHOD0=",
                    locale: "ar",
                  }).then(idwise => {
                console.log('idwise' + JSON.stringify(idwise));
                    // var template = '<div class="row row-centered">' +
                    // '    <div id="idwise-temp"></div>' +
                    // '</div>';
                    idwise.startJourney({
                      mount: "#idwise-mount",
                      journeyDefinitionId: "2f75c6cb-6e5d-4aec-bd7d-c844cbdaa571",
                      referenceNo: "test",
                      eventHandlers: {
                        onJourneyStarted: function (details) {
                          alert("Journey started, journey id =" + details.journeyId);
                        },
                        onJourneyFinished: function (details) {
                          alert("Journey finished, journey id =" + details.journeyId);
                        },
                        onJourneyCancelled: function (details) {
                          alert("Journey cancelled, journey id =" + details.journeyId);
                        },
                      },
                    });
             
                  }).catch(error => {
                    alert(error);
                  //  setIsLoading(false);
                  });
                } catch (error) {
                  alert(error);
                 // setIsLoading(false);
                }
            
            
            
            }
    }
       
});