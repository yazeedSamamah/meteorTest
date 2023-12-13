/**
 * Copyright (c) 2016
 * Company: Aya Jo
 * Created by Prince Hernandez, Yazeed Samamah.
 */
import qr from 'angular-qr';
import touch from 'ngtouch';
import base64 from 'angular-base64-upload';
//import angularCard from 'angular-card';
//import { NgModule } from '@angular/core';
//import { NgPaymentCardModule } from 'ng-payment-card';
//import angularCssInjector from 'angular-css-injector';






angular
    .module('Ayamobile', [
        'angular-meteor',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ionic',

      //  'gavruk.card',

       

     
  
    
    ]);
angular
    .module('Ayamobile').run(function($rootScope, Language) {
     

    $rootScope.Language = Language;

})

if (Meteor.isCordova) {


    angular.element(document).on('deviceready', onReady);
 
   
}
else {
    angular.element(document).ready(onReady);
}
app = {
   /* onNfc: function (nfcEvent) {
        var tagInfo = nfcEvent.tag;
        //TODO yazeed has to read all the information coming from the nfcEvent and then insert the selected information into tagInfo.
        Session.set("tagInfo", tagInfo);
    }*/
};
function onReady() {
//Meteor.subscribe('HomeAdvertisementss');
    angular.bootstrap(document, ['Ayamobile']); 
    if (Meteor.isCordova) {
      
        // navigator.splashscreen.show();
        // setTimeout(function() {
        //   navigator.splashscreen.hide();
        // }, 2000);
       // navigator.splashscreen.hide();
        var deviceData = {
            "deviceType":Meteor.Device._type,
            "deviceModel": device.model,
            "devicePlatform": device.platform,
            "deviceUuid": device.uuid
        };  
            
         Session.setPersistent('deviceData', deviceData);
        var successCallback = function (result) {
            var isDevicesRooted = result == 1;
            console.error('isDeviceRooted' + isDevicesRooted);
            if(isDevicesRooted){
                deviceData.crashType = 'RootedDevice'
                Meteor.call('setCrashedDevices', deviceData, function (error, response) {
                    $ionicLoading.hide();
                    ionic.Platform.exitApp();
                });
              
            }
          
        };
        var errorCallback = function (error) {
            console.error('isDeviceRooted' + error);
        };
        rootdetection.isDeviceRooted(successCallback, errorCallback);
    // getAppVersion();
      

       /* nfc.addNdefListener(
            app.onNfc,
            function () {
              //  console.log("listening to NFC happily.")
            },
            function (reason) {
              //  console.log("NOT listening to NFC");
            }
        );*/
    }else{
    var deviceData = {
            "deviceType":Meteor.Device._type,
            "deviceModel": Device.os.name,
            "devicePlatform": Device.browser.name,
            "deviceUuid": ""
        };          
        Session.setPersistent('deviceData', deviceData);

    }

}
 


